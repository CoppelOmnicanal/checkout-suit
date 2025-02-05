import styles from '../../public/checkout.module.css'
import header from './header.module.css'
import React from 'react'
//@ts-ignore
import Modular from 'coppelar.components/index'

const { SvgIcon } = Modular
export const Header = () => {
  return (
    <div className={`${styles['sc-section']} ${header.header}`}>
      <div className={`${styles['sc-responsive-container']} ${header['header-container']}`}>
        <a className={header['header-logo']} href="/" aria-label="Ir a coppel.com.ar">
          <div className={header['header-logo-img']}>
            <SvgIcon name="coppelIconYellow" />
          </div>
        </a>
        <div className={header['header-padlock']}>
          <div className={header['padlock-icon']}>
            <SvgIcon name="padlockWhite" />
          </div>
          <div className={`${header['caption-small']} ${header['padlock-text']}`}>SITIO SEGURO</div>
        </div>
      </div>
    </div>
  )
}
