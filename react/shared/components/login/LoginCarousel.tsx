import React, { useRef } from 'react'
import { LoginForm } from './login.types'
import { FormProvider } from '../../../checkout/src/contexts/form/FormProvider'
import { Login } from './Login'
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import '../../../node_modules/swiper/swiper.css'

export const LoginCarousel = () => {
  const swiperRef = useRef<SwiperClass | null>(null)
  const next = () => swiperRef.current?.slideNext()
  const back = () => swiperRef.current?.slidePrev()

  const LoginFormData: LoginForm = {
    email: '',
    password: '',
  }

  return (
    <Swiper
      style={{ width: '100%', height: '100%' }}
      slidesPerView={1}
      onSwiper={(swiper: SwiperClass) => (swiperRef.current = swiper)} // Define el tipo del parámetro
      allowTouchMove={false}
    >
      <SwiperSlide>
        <FormProvider form={LoginFormData}>
          <Login goToMissingPass={next} />
        </FormProvider>
      </SwiperSlide>

      <SwiperSlide>
        <div>Hola mundo</div>
      </SwiperSlide>
    </Swiper>
  )
}
