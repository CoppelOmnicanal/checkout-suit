//@ts-ignore
import { useRuntime } from 'vtex.render-runtime'
//@ts-ignore
import { Modal, BottomSheet } from 'coppelar.components/index'
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { LoginSlice } from './slices/LoginSlice'
import { ChangePasswordSlice } from './slices/ChangePasswordSlice'

export const Login = ({ handleShow }: { handleShow: () => void }) => {
  const swiperRef = useRef<any>(null)
  const { deviceInfo } = useRuntime()
  const [modalActive, setModalActive] = useState(true)
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false)
  const onHideBottomSheet = () => {
    setBottomSheetVisible(false)
    handleShow()
  }

  return (
    <>
      {modalActive && (
        <Modal handleShow={handleShow}>
          {(hideModal: () => Promise<void>) => {
            const goToOTP = () => {
              if (deviceInfo.isMobile) {
                hideModal()
                setTimeout(() => {
                  setModalActive(false)
                  setBottomSheetVisible(true)
                }, 200)
              } else {
                swiperRef.current?.slideNext()
              }
            }

            return (
              <Swiper
                id="carousel_login_modal"
                style={{ width: '100%', height: '100%' }}
                slidesPerView={1}
                allowTouchMove={false}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
              >
                <SwiperSlide>
                  <LoginSlice />
                </SwiperSlide>

                <SwiperSlide>
                  <ChangePasswordSlice goToOTP={goToOTP} />
                </SwiperSlide>

                <SwiperSlide>
                  <div>OTP</div>
                </SwiperSlide>
              </Swiper>
            )
          }}
        </Modal>
      )}

      {bottomSheetVisible && (
        <BottomSheet isOpen={bottomSheetVisible} onClose={() => onHideBottomSheet()}>
          Hola
        </BottomSheet>
      )}
    </>
  )
}
