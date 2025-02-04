import React from 'react'
import button from '../../../../shared/public/button.module.css'

interface StepButtonProps {
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}

export const StepButton: React.FC<StepButtonProps> = ({ children, onClick, disabled = false }) => {
  const handlePress = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    if (onClick) onClick(event)
  }

  let className = `${button['boton']} ${button['terciario']} ${button['ml-auto']} ${button['step-button']} `
  if (disabled) className += `${button.disabled}`

  return (
    <button className={className} onClick={handlePress} disabled={disabled}>
      {children}
    </button>
  )
}
