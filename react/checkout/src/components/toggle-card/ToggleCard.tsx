import React from 'react'
import bootstrap from '../../../../shared/public/bootstrap.module.css'
import checkout from '../../../../shared/public/checkout.module.css'
import togglecard from './togglecard.module.css'

export const ToggleCard = ({ button, text }: { button: JSX.Element; text: string }) => {
  return (
    <div className={`${togglecard['toggle-card']} ${checkout['mb-2']}`}>
      <div className={`${bootstrap['d-flex']} ${bootstrap['align-items-center']} ${bootstrap['justify-content-between']} ${bootstrap['w-100']}`}>
        <label className={`${bootstrap['form-check-label']}`}>{text}</label>
        {button}
      </div>
    </div>
  )
}
