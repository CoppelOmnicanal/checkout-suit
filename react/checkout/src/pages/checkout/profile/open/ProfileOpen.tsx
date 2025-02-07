//@ts-ignore
import { Container, Input, Phone, Inputs, Status, Button, ButtonTypes, ButtonSizes, AlertTypes, Alert } from 'coppelar.components/index'
import React, { useEffect, useState } from 'react'
import checkout from '../../../../../../shared/public/checkout.module.css'
import bootstrap from '../../../../../../shared/public/bootstrap.css'
import profileopen from './profileopen.module.css'
import { Billing } from './Billing'
import { useFormProvider } from '../../../../contexts/form/FormProvider'
import { ProfileForm } from '../ProfileContainer'
import { useErrorInput } from '../../../../hooks/useInputError'
import { ToggleButton } from '../../../../components/toggle/ToggleButton'
import { ToggleCard } from '../../../../components/toggle-card/ToggleCard'
import { useGtm } from '../../../../../../shared/hooks/useGtm'
import { Events, GtmSections, Hashes } from '../../../../../../shared'
import { useOrderForm } from '../../../../contexts/orderform'
import { useEmarsys } from '../../../../../../shared/hooks/useEmarsys'

export const ProfileOpen = () => {
  const { values, status, setStatus, setValues, onChange, onStatus, form } = useFormProvider<ProfileForm>()
  const { orderForm } = useOrderForm()
  const { errorType } = useErrorInput<ProfileForm>(values)
  const [active, setActive] = useState(false)
  const [alert, setAlert] = useState(false)
  const toggle = <ToggleButton onChange={setActive} checked={active} />
  const { checkoutId, cartLoaded } = useGtm()
  const { setEmail, cart, go } = useEmarsys()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { VALID, INVALID } = Status
    const { isCorporate, corporateDocument, corporateName, ...fields } = status
    const billing = values.isCorporate ? corporateDocument === VALID && corporateName === VALID : VALID

    if (!billing && values.isCorporate) {
      setStatus((prev) => ({
        ...prev,
        ['corporateName']: INVALID,
        ['corporateDocument']: INVALID,
      }))

      setAlert(true)
      return
    }

    const isValid = Object.values(fields).every((status) => status === Status.VALID) && billing === VALID

    console.log('🚀 ~ onSubmit ~ valid:', isValid)
    console.log('🚀 ~ onSubmit ~ values:', values)
  }

  useEffect(() => {
    console.log('EVENTOS')

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

  useEffect(() => {
    if (!active) {
      setStatus((prev) => ({
        ...prev,
        ['corporateName']: Status.NORMAL,
        ['corporateDocument']: Status.NORMAL,
      }))
    }

    setValues((prev) => ({
      ...prev,
      ['isCorporate']: active,
    }))

    if (!active && alert) setAlert(false)
  }, [active])

  return (
    <>
      <form onSubmit={onSubmit} className={profileopen.form}>
        <div className={`${checkout['subtitle-1']} ${profileopen['subtitle-1']}`}>Completá el formulario</div>

        <div>
          <Container inputType={errorType('email', Inputs.Mail)} label="Correo electrónico*" status={status['email']}>
            <Input
              handleOnChange={onChange}
              handleStatus={onStatus}
              attributes={{
                type: 'text',
                disabled: !!form.email,
                name: 'email',
                placeholder: 'Escribe tu correo aquí',
                defaultValue: form.email,
                with: '100%',
                validations: ['notIsEmpty', 'isMail'],
              }}
            />
          </Container>

          <div className={checkout['form-row']}>
            <Container inputType={errorType('firstName', Inputs.Texto)} label="Nombre*" status={status['firstName']}>
              <Input
                handleOnChange={onChange}
                handleStatus={onStatus}
                attributes={{
                  type: 'text',
                  name: 'firstName',
                  placeholder: 'Ej. Juan',
                  defaultValue: form.firstName,
                  with: '100%',
                  validations: ['notIsEmpty', 'notHaveNumbers'],
                }}
              />
            </Container>

            <Container inputType={errorType('firstName', Inputs.Texto)} label="Apellido*" status={status['lastName']}>
              <Input
                handleOnChange={onChange}
                handleStatus={onStatus}
                attributes={{
                  type: 'text',
                  name: 'lastName',
                  placeholder: 'Ej. Pérez',
                  defaultValue: form.lastName,
                  with: '100%',
                  validations: ['notIsEmpty', 'notHaveNumbers'],
                }}
              />
            </Container>
          </div>

          <div className={checkout['form-row']}>
            <Container inputType={errorType('document', Inputs.DNI)} label="DNI*" status={status['document']}>
              <Input
                handleOnChange={onChange}
                handleStatus={onStatus}
                attributes={{
                  type: 'number',
                  name: 'document',
                  onlyNumber: true,
                  placeholder: 'Nro. de documento',
                  defaultValue: form.document,
                  with: '100%',
                  validations: ['notIsEmpty', 'onlyNumbers'],
                }}
              />
            </Container>

            <Container inputType={Inputs.Telefono} label="Celular*" status={status['phone']}>
              <Phone defaultValue={form.phone} handleStatus={onStatus} handleOnChange={onChange} />
            </Container>
          </div>

          <div className={profileopen['calc-margin']}>
            <ToggleCard text="Quiero factura A" button={toggle} />
            {alert && (
              <div className={checkout['mb-2']}>
                <Alert type={AlertTypes.ERROR} onClick={() => setAlert(false)}>
                  Completa los campos de "Razón Social" y "CUIT" o desactiva la opción para continuar.
                </Alert>
              </div>
            )}
            {active && <Billing />}
          </div>

          <div className={`${bootstrap['d-flex']} ${bootstrap['w-100']} ${bootstrap['justify-content-end']} ${profileopen['mt-2']}`}>
            <Button type={ButtonTypes.Button} submit={true} text={'Continuar'} styleProps={{ fontWeight: 'bold' }} size={ButtonSizes.Mediano} />
          </div>
        </div>
      </form>
    </>
  )
}
