//@ts-ignore
import { Button, ButtonStyles, ButtonSizes } from 'coppelar.components/index'
import React from 'react'
import { RecoverPassword } from '../login.types'
import { FormProvider } from '../../../../checkout/src/contexts/form/FormProvider'
import styles from '../login.module.css'
import { useSwiper } from 'swiper/react'
import { ChangePassword } from '../components/ChangePassword'

export const ChangePasswordSlice = ({ goToOTP }: { goToOTP: () => void }) => {
  const swiper = useSwiper()
  const RecoverPasswordData: RecoverPassword = {
    email: '',
  }

  return (
    <>
      <div className={styles['recover-password-container']}>
        <div className={styles['slice-header']}>
          <h3>Cambiá tu contraseña</h3>
          <p>Para crear una nueva contraseña, escribí el correo que registraste en tu cuenta</p>
        </div>

        <FormProvider form={RecoverPasswordData}>
          <ChangePassword goToOTP={goToOTP} />
          <Button text={'Volver'} style={ButtonStyles.Terciario} size={ButtonSizes.Fijo} onPress={() => swiper.slidePrev()} styleProps={{ fontWeight: 'bold' }} />
        </FormProvider>
      </div>
    </>
  )
}
