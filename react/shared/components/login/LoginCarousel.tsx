import React, { useRef } from 'react'
import { LoginForm, RecoverPassword } from './login.types'
import { FormProvider } from '../../../checkout/src/contexts/form/FormProvider'
import { Login } from './slices/Login'
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import { ModalHeader } from '../modal/ModalHeader'
import { ChangePassword } from './slices/ChangePassword'
import styles from './login.module.css'
import '../../../node_modules/swiper/swiper.css'

export const LoginCarousel = () => {
  const swiperRef = useRef<SwiperClass | null>(null)
  const next = () => swiperRef.current?.slideNext()
  const back = () => swiperRef.current?.slidePrev()

  const LoginFormData: LoginForm = {
    email: '',
    password: '',
  }

  const RecoverPasswordData: RecoverPassword = {
    email: '',
  }

  return (
    <>
      <Swiper
        id="carousel_login_modal"
        style={{ width: '100%', height: '100%' }}
        slidesPerView={1}
        onSwiper={(swiper: SwiperClass) => (swiperRef.current = swiper)}
        allowTouchMove={false}
      >
        <SwiperSlide>
          <ModalHeader title={<h1>¡Hola!</h1>} subtitle="Iniciá sesión para disfrutar de los beneficios de Coppel en línea" />
          <FormProvider form={LoginFormData}>
            <Login goToMissingPass={next} />
          </FormProvider>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles['recover-password-container']}>
            <ModalHeader title={<h3>Cambiá tu contraseña</h3>} subtitle="Para crear una nueva contraseña, escribí el correo que registraste en tu cuenta" />
            <FormProvider form={RecoverPasswordData}>
              <ChangePassword onPress={back} />
            </FormProvider>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}
