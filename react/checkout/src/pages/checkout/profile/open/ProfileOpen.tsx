//@ts-ignore
import { Container, Input, Phone, Inputs } from 'coppelar.components/index'
import { ClientProfileData } from '../../../../types/orderform.types'
import { useForm } from '../../../../hooks/useForm'
import React, { useEffect } from 'react'
import checkout from '../../../../../../shared/public/checkout.module.css'
import profileopen from './profileopen.module.css'

interface ProfileOpenProps {
  clientProfileData: ClientProfileData
}

interface ProfileForm
  extends Omit<
    ClientProfileData,
    'documentType' | 'stateInscription' | 'corporatePhone' | 'profileCompleteOnLoading' | 'profileErrorOnLoading' | 'customerClass' | 'tradeName'
  > {}

export const ProfileOpen: React.FC<ProfileOpenProps> = ({ clientProfileData }) => {
  const form: ProfileForm = {
    email: clientProfileData?.email ?? '',
    firstName: clientProfileData?.firstName ?? '',
    lastName: clientProfileData?.lastName ?? '',
    document: clientProfileData?.document ?? '',
    phone: clientProfileData?.phone ?? '',
    corporateName: clientProfileData?.corporateName ?? '',
    corporateDocument: clientProfileData?.corporateDocument ?? '',
    isCorporate: clientProfileData?.isCorporate ?? false,
  }

  const { values, status, onChange, onStatus, errorType } = useForm<ProfileForm>({ form })

  useEffect(() => {
    console.log('🚀 ~ values:', values)
  }, [values])

  return (
    <>
      <div className={`${checkout['subtitle-1']} ${profileopen['subtitle-1']}`}>Completá el formulario</div>

      <Container inputType={errorType('email', 'Mail')} label="Correo electrónico*" status={status['email']}>
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

      <Container inputType={errorType('firstName', 'Texto')} label="Nombre*" status={status['firstName']}>
        <Input
          handleOnChange={onChange}
          handleStatus={onStatus}
          attributes={{
            type: 'text',
            name: 'firstName',
            placeholder: 'Ej Juan Armando',
            defaultValue: form.firstName,
            with: '100%',
            validations: ['notIsEmpty', 'notHaveNumbers'],
          }}
        />
      </Container>

      <Container inputType={errorType('firstName', 'Texto')} label="Apellido*" status={status['lastName']}>
        <Input
          handleOnChange={onChange}
          handleStatus={onStatus}
          attributes={{
            type: 'text',
            name: 'lastName',
            placeholder: 'Ej Pérez',
            defaultValue: form.lastName,
            with: '100%',
            validations: ['notIsEmpty', 'notHaveNumbers'],
          }}
        />
      </Container>

      <Container inputType={errorType('document', 'DNI')} label="DNI*" status={status['document']}>
        <Input
          handleOnChange={onChange}
          handleStatus={onStatus}
          attributes={{
            type: 'number',
            name: 'document',
            onlyNumber: true,
            placeholder: 'Nro de documento',
            defaultValue: form.document,
            with: '100%',
            validations: ['notIsEmpty', 'onlyNumbers'],
          }}
        />
      </Container>

      <Container inputType={Inputs.Telefono} label="Celular*" status={status['phone']}>
        <Phone defaultValue={clientProfileData['phone']} handleStatus={onStatus} handleOnChange={onChange} />
      </Container>
    </>
  )
}
