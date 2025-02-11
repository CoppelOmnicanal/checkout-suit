//@ts-ignore
import { usePhone } from 'coppelar.components/index'
import React from 'react'
import checkout from '../../../../../shared/public/checkout.module.css'
import bootstrap from '../../../../../shared/public/bootstrap.css'
import { ProfileForm } from '.'

interface ProfileDoneProps {
  clientProfileData: ProfileForm
}

export const ProfileDone: React.FC<ProfileDoneProps> = ({ clientProfileData }) => {
  const { formatter } = usePhone()
  const { email, firstName, lastName, phone, document, corporateDocument, corporateName, isCorporate } = clientProfileData

  return (
    <>
      <div className={bootstrap['w-100']}>
        <p className={checkout['text-secondary']}>
          <b style={{ color: '#000' }}>
            {firstName} {lastName}
          </b>
          <br />
          {email} <br />
          Celular: {formatter(phone)} <br />
          Dni: {document}
        </p>

        {isCorporate && (
          <>
            <hr />

            <p className={checkout['text-secondary']}>
              <b style={{ color: '#000' }}>Factura A</b>
              <br />
              Razón social: <b>{corporateName}</b> <br />
              CUIT: <b>{corporateDocument}</b>
            </p>
          </>
        )}
      </div>
    </>
  )
}
