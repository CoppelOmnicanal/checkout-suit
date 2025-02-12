//@ts-ignore
import { SvgIcon } from 'coppelar.components/index'
import React, { useState } from 'react'
import modal from './modal.module.css'

interface ModalProps {
  handleShow: () => void
  title?: string
  subtitle?: string
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ handleShow, children }) => {
  const [closing, setClosing] = useState(false)

  const closeModal = () => {
    setClosing(true)
    setTimeout(() => {
      handleShow()
      setClosing(false)
    }, 300)
  }

  return (
    <>
      <div className={modal['cp-modal-background']}>
        <div className={`${modal['cp-modal']} ${closing ? modal['closing'] : ''}`}>
          <SvgIcon name="close" stylesProps={{ zIndex: '999', width: '1.5rem', cursor: 'pointer', right: '1.5rem', position: 'absolute' }} onClick={closeModal} />
          {children}
        </div>
      </div>
    </>
  )
}
