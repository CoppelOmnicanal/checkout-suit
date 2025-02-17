import React from 'react'
import { LoginFormType } from '../login.types'
import { LoginForm } from '../components/LoginForm'
import { FormProvider } from '../../../../checkout/src/contexts/form/FormProvider'
import { useSwiper } from 'swiper/react'
import bootstrap from '../../../public/bootstrap.module.css'
import styles from '../login.module.css'

export const LoginSlice = ({ onSuccess }: { onSuccess: () => void }) => {
  const LoginFormData: LoginFormType = {
    email: '',
    password: '',
  }

  const swiper = useSwiper()

  return (
    <>
      <div className={`${bootstrap['d-flex']} ${bootstrap['flex-column']} ${bootstrap['w-100']}`} style={{ gap: '1.5rem' }}>
        <div className={styles['slice-header']}>
          <h1>¡Hola!</h1>
          <p>Inicia sesión para disfrutar de los beneficios de Coppel en línea</p>
        </div>

        <FormProvider form={LoginFormData}>
          <LoginForm goToMissingPass={() => swiper.slideNext()} onSuccess={onSuccess} />
        </FormProvider>
      </div>
    </>
  )
}
