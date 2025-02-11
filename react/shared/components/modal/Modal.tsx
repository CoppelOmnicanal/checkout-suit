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

export const Modal: React.FC<ModalProps> = ({ handleShow, subtitle, title = null, children }) => {
  return (
    <>
      <div className={modal['cp-modal-background']}>
        <div className={modal['cp-modal']}>
          <div className={modal['cp-modal-header']}>
            <div className={modal.close}>
              {title && <h1>{title}</h1>}
              <SvgIcon name="close" stylesProps={{ width: '1.5rem', cursor: 'pointer' }} onClick={handleShow} />
            </div>
          </div>
          {subtitle && <p>{subtitle}</p>}
          {children}
        </div>
      </div>
    </>
  )
}
