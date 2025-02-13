//@ts-ignore
import { Container, Input, Inputs, Button, ButtonSizes, Status } from 'coppelar.components/index'
import React, { useMemo } from 'react'
import { useFormProvider } from '../../../../checkout/src/contexts/form/FormProvider'
import { RecoverPassword } from '../login.types'
import bootstrap from '../../../../shared/public/bootstrap.module.css'
import { useErrorInput } from '../../../../checkout/src/hooks/useInputError'

export const ChangePassword = ({ goToOTP }: { goToOTP: () => void }) => {
  const { status, onChange, onStatus, values } = useFormProvider<RecoverPassword>()
  const disabled = useMemo(() => !/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(values.email), [values])
  const { errorType } = useErrorInput<RecoverPassword>(values)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('send')
    goToOTP()
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={`${bootstrap['d-flex']} ${bootstrap['flex-column']} ${bootstrap['w-100']}`}>
          <Container inputType={errorType('email', Inputs.Mail)} label="Correo electrónico*" status={status['email']}>
            <Input
              handleOnChange={onChange}
              handleStatus={onStatus}
              attributes={{
                type: 'text',
                name: 'email',
                placeholder: 'Escribe tu correo',
                defaultValue: '',
                with: '100%',
                validations: ['notIsEmpty', 'isMail'],
              }}
            />
          </Container>

          <Button text={'Cambiar contraseña'} submit={true} disabled={disabled} size={ButtonSizes.Fijo} />
        </div>
      </form>
    </>
  )
}
