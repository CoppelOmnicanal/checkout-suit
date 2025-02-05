import React, { useState } from 'react'
import { ToggleButton } from '../../../../components/toggle/ToggleButton'
import profile from './profileopen.module.css'
import bootstrap from '../../../../../../shared/public/bootstrap.css'

export const Billing = () => {
  const [active, setActive] = useState(false)

  return (
    <div className={`${profile['corporate-check']}`}>
      <div className={`${bootstrap['d-flex']} ${bootstrap['align-items-center']} ${bootstrap['justify-content-between']} ${bootstrap['w-100']}`}>
        <label className={`${bootstrap['form-check-label']}`}>Quiero factura A</label>
        <ToggleButton onChange={setActive} checked={active} />
      </div>
    </div>
  )
}
