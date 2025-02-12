//@ts-ignore
import { Container, Input, Inputs, Button, ButtonSizes, ButtonStyles, Status } from 'coppelar.components/index'
import React, { useMemo } from 'react'
import { useFormProvider } from '../../../../checkout/src/contexts/form/FormProvider'
import { RecoverPassword } from '../login.types'
import bootstrap from '../../../../shared/public/bootstrap.module.css'
import { useErrorInput } from '../../../../checkout/src/hooks/useInputError'

export const ChangePassword = ({ onPress }: { onPress: () => void }) => {
  const { status, onChange, onStatus, values } = useFormProvider<RecoverPassword>()
  const disabled = useMemo(() => status.email === Status.NORMAL || status.email === Status.INVALID, [status])
  const { errorType } = useErrorInput<RecoverPassword>(values)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('send')
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={`${bootstrap['d-flex']} ${bootstrap['flex-column']} ${bootstrap['w-100']}`} style={{ gap: '1rem' }}>
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
          <Button text={'Volver'} style={ButtonStyles.Terciario} size={ButtonSizes.Fijo} onPress={onPress} styleProps={{ fontWeight: 'bold' }} />
        </div>
      </form>
    </>
  )
}
