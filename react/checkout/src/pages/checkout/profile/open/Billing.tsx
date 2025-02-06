//@ts-ignore
import { Container, Input, Inputs, Status } from 'coppelar.components/index'
import React, { useEffect, useMemo, useState } from 'react'
import { ToggleButton } from '../../../../components/toggle/ToggleButton'
import profile from './profileopen.module.css'
import bootstrap from '../../../../../../shared/public/bootstrap.css'
import checkout from '../../../../../../shared/public/checkout.module.css'
import { useFormProvider } from '../../../../contexts/form/FormProvider'
import { ProfileForm } from '..'
import { useErrorInput } from '../../../../hooks/useInputError'

export const Billing = () => {
  const { status, onChange, onStatus, setStatus, setValues, form, values } = useFormProvider<ProfileForm>()
  const [active, setActive] = useState(false)
  const { errorType } = useErrorInput<ProfileForm>(values)
  const isRequired = useMemo(() => (active ? ['notIsEmpty'] : []), [active])

  useEffect(() => {
    if (!active) {
      console.log('🚀 ~ setStatus ~ Status:', Status)
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
      <div className={`${profile['corporate-check']}`}>
        <div className={`${bootstrap['d-flex']} ${bootstrap['align-items-center']} ${bootstrap['justify-content-between']} ${bootstrap['w-100']}`}>
          <label className={`${bootstrap['form-check-label']}`}>Quiero factura A</label>
          <ToggleButton onChange={setActive} checked={active} />
        </div>
      </div>

      {active && (
        <div className={`${checkout['form-row']} ${bootstrap['mt-3']}`}>
          <Container inputType={errorType('corporateName', Inputs.Texto)} label="Razon social*" status={status['corporateName']}>
            <Input
              handleOnChange={onChange}
              handleStatus={onStatus}
              attributes={{
                type: 'text',
                name: 'corporateName',
                placeholder: 'Ej. Juan',
                defaultValue: form.corporateName,
                with: '100%',
                validations: [...isRequired, 'notHaveNumbers'],
              }}
            />
          </Container>

          <Container inputType={errorType('corporateDocument', Inputs.Texto)} label="CUIT*" status={status['corporateDocument']}>
            <Input
              handleOnChange={onChange}
              handleStatus={onStatus}
              attributes={{
                type: 'number',
                name: 'corporateDocument',
                onlyNumber: true,
                placeholder: 'Ej. Pérez',
                defaultValue: form.corporateDocument,
                with: '100%',
                validations: [...isRequired, 'onlyNumbers'],
              }}
            />
          </Container>
        </div>
      )}
    </>
  )
}
