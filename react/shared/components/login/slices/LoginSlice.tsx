import React from 'react'
import { LoginFormType } from '../login.types'
import { LoginForm } from '../components/LoginForm'
import { FormProvider } from '../../../../checkout/src/contexts/form/FormProvider'
import { useSwiper } from 'swiper/react'
import modal from '../../modal/modal.module.css'
import bootstrap from '../../../public/bootstrap.module.css'

export const LoginSlice = () => {
  const LoginFormData: LoginFormType = {
    email: '',
    password: '',
  }

  const swiper = useSwiper()

  return (
    <>
      <div className={`${bootstrap['d-flex']} ${bootstrap['flex-column']} ${bootstrap['w-100']}`} style={{ gap: '1.5rem' }}>
        <div className={modal['cp-modal-header']}>
          <div className={modal.close}>
            <h1>¡Hola!</h1>
            <p>Iniciá sesión para disfrutar de los beneficios de Coppel en línea</p>
          </div>
        </div>

        <FormProvider form={LoginFormData}>
          <LoginForm goToMissingPass={() => swiper.slideNext()} />
        </FormProvider>
      </div>
    </>
  )
}
