//@ts-ignore
import { Container, Input } from 'coppelar.components/index'
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

  const { values, status, onChange, onStatus } = useForm<ProfileForm>({ form })

  useEffect(() => {
    console.log('🚀 ~ values:', values)
  }, [values])

  return (
    <>
      <div className={`${checkout['subtitle-1']} ${profileopen['subtitle-1']}`}>Completá el formulario</div>

      <Container inputType={'Texto'} label="Nombre*" status={status['firstName']}>
        <Input
          handleOnChange={onChange}
          handleStatus={onStatus}
          attributes={{
            type: 'text',
            name: 'firstName',
            placeholder: 'Ej Juan Armando',
            defaultValue: form.firstName,
            with: '100%',
            validations: ['notIsEmpty'],
          }}
        />
      </Container>
    </>
  )
}
