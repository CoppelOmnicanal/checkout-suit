import React from 'react'
import checkout from '../../../../shared/public/checkout.module.css'
import bootstrap from '../../../../shared/public/bootstrap.css'
import { ProfileContainer } from './profile/ProfileContainer'
import { ShippingProvider } from '../../contexts/shipping'
import { ShippingContainer } from './shipping/ShippingContainer'

export const CheckoutPage = () => {
  return (
    <>
      {/*Modal*/}
      <div className={checkout['sc-section']} style={{ marginTop: '64px' }}>
        <div className={checkout['sc-responsive-container']}>
          <div className={checkout['section-container']}>
            <div className={`${bootstrap['col-12']} ${bootstrap['col-md-7']} ${bootstrap['col-lg-8']}`} style={{ flex: 'auto' }}>
              <ProfileContainer />

              <ShippingProvider>
                <ShippingContainer />
              </ShippingProvider>

              {/*Payment*/}
            </div>
            {/*Summary*/}
          </div>
        </div>
      </div>
    </>
  )
}
