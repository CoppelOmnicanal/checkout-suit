//@ts-ignore
import { Container, Input, Inputs, Password, Status, Button, Checkbox, ButtonSizes, ButtonStyles } from 'coppelar.components/index'
import React, { useMemo } from 'react'
import { useFormProvider } from '../../../../checkout/src/contexts/form/FormProvider'
import { LoginForm } from '../login.types'
import { useErrorInput } from '../../../../checkout/src/hooks/useInputError'
import bootstrap from '../../../../shared/public/bootstrap.module.css'

export const Login = ({ goToMissingPass }: { goToMissingPass: () => void }) => {
  const { status, onChange, onStatus, form, values } = useFormProvider<LoginForm>()
  const statusWrapper = useMemo(() => {
    return Object.entries(status).reduce(
      (acc, [key, value]) => {
        const field = key as keyof LoginForm
        acc[field] = value === Status.VALID ? Status.NORMAL : value
        return acc
      },
      {} as Record<keyof LoginForm, Status>,
    )
  }, [status])

  const { errorType } = useErrorInput<LoginForm>(values)
  const rememberMe = (name: string, value: boolean) => {
    console.log('🚀 ~ rememberMe ~ value:', value)
    console.log('🚀 ~ rememberMe ~ name:', name)
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('send')
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={`${bootstrap['d-flex']} ${bootstrap['flex-column']} ${bootstrap['w-100']}`} style={{ gap: '1.75rem', marginTop: '1.5rem' }}>
          <div className={`${bootstrap['d-flex']} ${bootstrap['flex-column']} ${bootstrap['w-100']}`} style={{ gap: '.875rem' }}>
            <div className={`${bootstrap['d-flex']} ${bootstrap['flex-column']} ${bootstrap['w-100']}`} style={{ gap: '1.5rem' }}>
              <Container inputType={errorType('email', Inputs.Mail)} label="Correo electrónico*" status={statusWrapper['email']} useErrors={false}>
                <Input
                  handleOnChange={onChange}
                  handleStatus={onStatus}
                  attributes={{
                    type: 'text',
                    name: 'email',
                    placeholder: 'Escribe tu correo',
                    defaultValue: form.email,
                    with: '100%',
                    validations: ['notIsEmpty', 'isMail'],
                  }}
                />
              </Container>

              <Container inputType={errorType('password', Inputs.Texto)} label="Contraseña" status={statusWrapper['password']} useErrors={false}>
                <Password handleOnChange={onChange} handleStatus={onStatus} />
              </Container>
            </div>

            <div className={`${bootstrap['d-flex']} ${bootstrap['align-items-center']} ${bootstrap['justify-space-between']} ${bootstrap['w-100']}`}>
              <Checkbox text="Recordarme" name="rememberMe" onChange={rememberMe} />
              <Button
                text={'Olvidé mi contraseña'}
                style={ButtonStyles.Terciario}
                size={ButtonSizes.Fijo}
                onPress={goToMissingPass}
                styleProps={{ fontWeight: '700', padding: 'unset' }}
              />
            </div>
          </div>

          <Button text={'Iniciar Sesion'} submit={true} size={ButtonSizes.Fijo} />
        </div>
      </form>
    </>
  )
}
