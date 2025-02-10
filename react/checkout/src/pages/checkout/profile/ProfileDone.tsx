import React from 'react'
import checkout from '../../../../../shared/public/checkout.module.css'
//@ts-ignore
import { usePhone } from 'coppelar.components/index'
import { ProfileForm } from '.'

interface ProfileDoneProps {
  clientProfileData: ProfileForm
}

export const ProfileDone: React.FC<ProfileDoneProps> = ({ clientProfileData }) => {
  const { formatter } = usePhone()
  const { email, firstName, lastName, phone, document } = clientProfileData

  return (
    <p className={checkout['text-secondary']}>
      <b style={{ color: '#000' }}>
        {firstName} {lastName}
      </b>
      <br />
      {email} <br />
      Celular: {formatter(phone)} <br />
      Dni: {document}
    </p>
  )
}
