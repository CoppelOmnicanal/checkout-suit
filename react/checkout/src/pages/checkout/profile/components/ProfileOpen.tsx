//@ts-ignore
import { Status, Button, ButtonTypes, ButtonSizes } from 'coppelar.components/index'
import React, { useEffect, useState } from 'react'
import checkout from '../../../../../../shared/public/checkout.module.css'
import bootstrap from '../../../../../../shared/public/bootstrap.module.css'
import profileopen from './profileopen.module.css'
import { useFormProvider } from '../../../../contexts/form/FormProvider'
import { ProfileForm } from '../ProfileContainer'
import { useGtm } from '../../../../../../shared/hooks/useGtm'
import { Events, GtmSections, Hashes } from '../../../../../../shared'
import { useOrderForm } from '../../../../contexts/orderform'
import { useEmarsys } from '../../../../../../shared/hooks/useEmarsys'
import { useStepper } from '../../../../contexts/stepper'
import { CheckoutSteps } from '../../../../types/stepper.types'
import { Profile } from './Profile'
import { Billing } from './Bill/Billing'
import { Login } from '../../../../../../shared/components/login/'

export const ProfileOpen = ({ setForm }: { setForm: React.Dispatch<React.SetStateAction<ProfileForm>> }) => {
  const { values, status, setStatus, invalidate } = useFormProvider<ProfileForm>()
  const { orderForm, updateProfile } = useOrderForm()
  const { checkoutId, cartLoaded } = useGtm()
  const { setEmail, cart, go } = useEmarsys()
  const { doneStep } = useStepper()
  const [modal, setModal] = useState(false)
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { VALID, INVALID } = Status
    const { isCorporate, corporateDocument, corporateName, ...fields } = status
    const billing = values.isCorporate ? (corporateDocument === VALID && corporateName === VALID ? VALID : INVALID) : VALID

    if (billing === INVALID && values.isCorporate) {
      setStatus((prev) => ({
        ...prev,
        ['corporateName']: INVALID,
        ['corporateDocument']: INVALID,
      }))

      return
    }

    const isValid = Object.values(fields).every((status) => status === Status.VALID) && billing === VALID
    if (!isValid) {
      invalidate()
      return
    }

    values['corporateName'] = !values['isCorporate'] || values['corporateName'] === '' ? null : values['corporateName']
    values['corporateDocument'] = !values['isCorporate'] || values['corporateDocument'] === '' ? null : values['corporateDocument']

    updateProfile(values)
    setForm(values)
    doneStep(CheckoutSteps.PROFILE)
  }

  useEffect(() => {
    if (!orderForm) {
      return
    }

    setEmail(orderForm)
    cart(orderForm)
    go()
    checkoutId(GtmSections.PersonalDataEmail, orderForm.orderFormId)
    cartLoaded(Events.CheckoutId, Hashes.PROFILE, orderForm)
    checkoutId(GtmSections.PersonalDataBilling, orderForm.orderFormId)

    //history
  }, [])

  return (
    <>
      {modal && <Login handleShow={() => setModal(false)} />}

      <form onSubmit={onSubmit} className={profileopen.form}>
        <div className={`${checkout['subtitle-1']} ${profileopen['subtitle-1']}`}>Completá el formulario</div>

        <div>
          <Profile setModal={setModal} />
          <Billing />
          <div className={`${bootstrap['d-flex']} ${bootstrap['w-100']} ${bootstrap['justify-content-end']} ${profileopen['mt-2']} ${checkout['mt-1']}`}>
            <Button type={ButtonTypes.Button} submit={true} text={'Continuar'} styleProps={{ fontWeight: 'bold' }} size={ButtonSizes.Mediano} />
          </div>
        </div>
      </form>
    </>
  )
}
