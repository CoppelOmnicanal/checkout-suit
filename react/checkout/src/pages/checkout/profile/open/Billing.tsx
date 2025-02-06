//@ts-ignore
import { Container, Input, Inputs, Status } from 'coppelar.components/index'
import React from 'react'
import checkout from '../../../../../../shared/public/checkout.module.css'
import { useFormProvider } from '../../../../contexts/form/FormProvider'
import { ProfileForm } from '..'
import { useErrorInput } from '../../../../hooks/useInputError'

export const Billing = () => {
  const { status, onChange, onStatus, form, values } = useFormProvider<ProfileForm>()
  const { errorType } = useErrorInput<ProfileForm>(values)

  return (
    <>
      <div className={`${checkout['form-row']}`}>
        <Container inputType={errorType('corporateName', Inputs.Texto)} label="Razon social*" status={status['corporateName']}>
          <Input
            handleOnChange={onChange}
            handleStatus={onStatus}
            attributes={{
              type: 'text',
              name: 'corporateName',
              placeholder: 'Razón social',
              defaultValue: form.corporateName,
              with: '100%',
              validations: ['notIsEmpty', 'notHaveNumbers'],
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
              placeholder: 'Número de CUIT',
              defaultValue: form.corporateDocument,
              with: '100%',
              validations: ['notIsEmpty', 'onlyNumbers'],
            }}
          />
        </Container>
      </div>
    </>
  )
}
