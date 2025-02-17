//@ts-ignore
import { Container, Input, Inputs, Phone, Button, ButtonStyles } from 'coppelar.components/index'
import React, { useEffect } from 'react'
import checkout from '../../../../../../shared/public/checkout.module.css'
import { useFormProvider } from '../../../../contexts/form/FormProvider'
import { ProfileForm } from '..'
import { useErrorInput } from '../../../../hooks/useInputError'

export const Profile = ({ setModal }: { setModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { status, onChange, onStatus, form, values } = useFormProvider<ProfileForm>()
  const { errorType } = useErrorInput<ProfileForm>(values)
  const changeProfile = (
    <Button style={ButtonStyles.Terciario} text={'Cambiar perfil'} onPress={() => setModal(true)} styleProps={{ padding: 'unset', fontWeight: 700 }} />
  )

  useEffect(() => {
    console.log('🚀 ~ Profile ~ form:', form)
  }, [form])

  return (
    <>
      <Container inputType={errorType('email', Inputs.Mail)} label="Correo electrónico*" status={status['email']} disabled={!!form.email} button={changeProfile}>
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
    </>
  )
}
