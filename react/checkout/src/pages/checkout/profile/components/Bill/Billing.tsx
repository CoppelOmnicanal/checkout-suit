//@ts-ignore
import { AlertTypes, Alert, Status } from 'coppelar.components/index'
import React, { useEffect, useState } from 'react'
import { ToggleCard } from '../../../../../components/toggle-card/ToggleCard'
import { ToggleButton } from '../../../../../components/toggle/ToggleButton'
import { ProfileForm } from '../..'
import { useFormProvider } from '../../../../../contexts/form/FormProvider'
import profileopen from '../profileopen.module.css'
import { BillingForm } from './BillingForm'
import checkout from '../../../../../../../shared/public/checkout.module.css'

export const Billing = () => {
  const { form, status, setValues, setStatus } = useFormProvider<ProfileForm>()
  const [active, setActive] = useState(form.isCorporate)
  const toggle = <ToggleButton onChange={setActive} checked={active} />
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    const alertState = status['corporateName'] === Status.INVALID || status['corporateDocument'] === Status.INVALID
    setAlert(alertState)
  }, [status])

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
  }, [active])

  return (
    <>
      <div className={`${profileopen['calc-margin']} ${checkout['mb-1']}`}>
        <ToggleCard text="Quiero factura A" button={toggle} />
        {alert && (
          <div className={checkout['mb-2']}>
            <Alert type={AlertTypes.ERROR} onClick={() => setAlert(false)}>
              Para Factura A, completá "Razón Social" y "CUIT" o desactivá la opción
            </Alert>
          </div>
        )}
        {active && <BillingForm />}
      </div>
    </>
  )
}
