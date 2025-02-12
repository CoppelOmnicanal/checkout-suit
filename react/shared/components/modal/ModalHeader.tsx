//@ts-ignore
import { SvgIcon } from 'coppelar.components/index'
import React from 'react'
import modal from './modal.module.css'

interface ModalHeaderProps {
  title?: JSX.Element
  subtitle?: string
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, subtitle }) => {
  return (
    <>
      <div className={modal['cp-modal-header']}>
        <div className={modal.close}>{title && title}</div>
      </div>
      {subtitle && <p>{subtitle}</p>}
    </>
  )
}
