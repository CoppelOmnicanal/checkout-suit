//@ts-ignore
import { SvgIcon } from 'coppelar.components/index'
import React, { ReactNode, useEffect, useState } from 'react'
import styles from './modal.module.css'

interface ModalProps {
  handleShow: () => void
  children: ReactNode | ((onClose: () => void) => ReactNode)
}

export const Modal: React.FC<ModalProps> = ({ handleShow, children }) => {
  const [closing, setClosing] = useState(false)
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  const onHide = async () => {
    setClosing(true)
    await sleep(200)
  }
  const animation = async () => {
    await onHide()
    setClosing(false)
  }

  const close = async () => {
    await animation()
    handleShow()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className={styles['cp-modal-background']}>
      <div className={`${styles['cp-modal']} ${closing ? styles['closing'] : ''}`}>
        <SvgIcon name="close" stylesProps={{ width: '1.5rem', cursor: 'pointer', position: 'absolute', right: '1.5rem', zIndex: "1002" }} onClick={close} />
        {typeof children === 'function' ? (children as (onClose: () => void) => ReactNode)(onHide) : children}
      </div>
    </div>
  )
}
