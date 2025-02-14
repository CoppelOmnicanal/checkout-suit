//@ts-ignore
import { Container, Input, Inputs, Password, Status, Button, Checkbox, ButtonSizes, ButtonStyles } from 'coppelar.components/index'
import React, { useMemo, useState } from 'react'
import { useFormProvider } from '../../../../checkout/src/contexts/form/FormProvider'
import { LoginFormType } from '../login.types'
import { useErrorInput } from '../../../../checkout/src/hooks/useInputError'
import bootstrap from '../../../../shared/public/bootstrap.module.css'
import { useAuth } from '../../../contexts/auth/AuthProvider'
import { useOrderForm } from '../../../../checkout/src/contexts/orderform'
import { ProfileForm } from '../../../../checkout/src/pages/checkout/profile'

export const LoginForm = ({ goToMissingPass }: { goToMissingPass: () => void }) => {
  const { status, onChange, onStatus, form, validate, values } = useFormProvider<LoginFormType>()
  const { updateProfile } = useOrderForm()
  const { login } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)
  const statusWrapper = useMemo(() => {
    return Object.entries(status).reduce(
      (acc, [key, value]) => {
        const field = key as keyof LoginFormType
        acc[field] = value === Status.VALID ? Status.NORMAL : value
        return acc
      },
      {} as Record<keyof LoginFormType, Status>,
    )
  }, [status])

  const { errorType } = useErrorInput<LoginFormType>(values)
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    goToMissingPass()
    /*
    event.preventDefault()

    const onCharge = (percentage: number) => setLoading(`${percentage}%`)
    const isValid = validate()
    if (!isValid) {
      return
    }

    setLoading('0%')
    const result = await login(values, onCharge)
    if (result === 'BlockedUser') {
      return
    }

    if (result === 'WrongCredentials') {
      return
    }

    const payload: ProfileForm = {
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
      document: result.document,
      phone: result?.phone ?? '',
      corporateName: result.corporateName,
      corporateDocument: result.corporateDocument,
      isCorporate: result.isCorporate,
    }

    await updateProfile(payload)
    setLoading('50%')
    */
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={`${bootstrap['d-flex']} ${bootstrap['flex-column']} ${bootstrap['w-100']}`} style={{ gap: '1.75rem' }}>
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

            <div className={`${bootstrap['d-flex']} ${bootstrap['align-items-center']} ${bootstrap['justify-content-center']} ${bootstrap['w-100']}`}>
              <Button
                text={'Olvidé mi contraseña'}
                style={ButtonStyles.Terciario}
                size={ButtonSizes.Fijo}
                onPress={goToMissingPass}
                disabled={loading !== null}
                styleProps={{ fontWeight: '700', padding: 'unset' }}
              />
            </div>
          </div>

          <Button text={loading ? 'Iniciando sesion' : 'Iniciar Sesion'} submit={true} size={ButtonSizes.Fijo} loadingPercentage={loading} />
        </div>
      </form>
    </>
  )
}
