//@ts-ignore
import { SvgIcon } from 'coppelar.components/index'
import React, { useState, useEffect } from 'react'
import styles from './bottomsheet.module.css'

interface BottomSheetProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ children, isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 200)
  }

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false)
    }
  }, [isOpen])

  return (
    <div className={styles['backdrop']}>
      <div className={`${styles['bottom-sheet']} ${isOpen ? styles.open : ''} ${isClosing ? styles.closing : ''}`}>
        <div className={styles['bottom-sheet-header']}>
          <SvgIcon name="close" stylesProps={{ width: '1.5rem', cursor: 'pointer', position: 'absolute', right: '1.5rem', zIndex: '1002' }} onClick={handleClose} />
        </div>
        <div className={styles['bottom-sheet-content']}>{children}</div>
      </div>
    </div>
  )
}
