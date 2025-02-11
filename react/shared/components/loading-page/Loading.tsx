import React from 'react'
import bootstrap from '../../public/bootstrap.css'
import loading from './loading.module.css'

export const Loading = () => {
  return (
    <div className={`${bootstrap['justify-content-center']} ${bootstrap['align-items-center']} ${loading['spinner']}`}>
      <div className={`${bootstrap['spinner-border']} ${bootstrap['text-primary']}`} role="status"></div>
    </div>
  )
}
