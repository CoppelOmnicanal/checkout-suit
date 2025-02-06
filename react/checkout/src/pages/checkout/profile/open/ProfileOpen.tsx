//@ts-ignore
import { Container, Input, Phone, Inputs, Status } from 'coppelar.components/index'
import { ClientProfileData } from '../../../../types/orderform.types'
import { useForm } from '../../../../hooks/useForm'
import React from 'react'
import checkout from '../../../../../../shared/public/checkout.module.css'
import profileopen from './profileopen.module.css'
import { Billing } from './Billing'

interface ProfileOpenProps {
  clientProfileData: ClientProfileData
}

export interface ProfileForm
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

  const { values, status, onChange, onStatus, errorType, setStatus, setValues } = useForm<ProfileForm>({ form })
  const billing = { status, onChange, onStatus, form, setStatus, setValues }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { VALID } = Status
    const { isCorporate, corporateDocument, corporateName, ...fields } = status
    const billing = values.isCorporate ? corporateDocument === VALID && corporateName === VALID : VALID
    const isValid = Object.values(fields).every((status) => status === Status.VALID) && billing === VALID

    console.log('🚀 ~ onSubmit ~ valid:', isValid)
    console.log('🚀 ~ onSubmit ~ values:', values)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={`${checkout['subtitle-1']} ${profileopen['subtitle-1']}`}>Completá el formulario</div>

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

        <Billing {...billing} />

        <button type="submit">ENVIAR</button>
      </form>
    </>
  )
}
