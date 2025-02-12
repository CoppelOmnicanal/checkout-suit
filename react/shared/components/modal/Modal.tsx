//@ts-ignore
import { SvgIcon } from 'coppelar.components/index'
import React from 'react'
import modal from './modal.module.css'

interface ModalProps {
  handleShow: () => void
  title?: string
  subtitle?: string
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ handleShow, children }) => {
  return (
    <>
      <div className={modal['cp-modal-background']}>
        <div className={modal['cp-modal']}>
          <SvgIcon name="close" stylesProps={{ zIndex: '999', width: '1.5rem', cursor: 'pointer', right: '1.5rem', position: 'absolute' }} onClick={handleShow} />
          {children}
        </div>
      </div>
    </>
  )
}
