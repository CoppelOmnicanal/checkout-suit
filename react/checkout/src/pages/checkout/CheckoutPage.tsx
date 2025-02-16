import React from 'react'
import checkout from '../../../../shared/public/checkout.module.css'
import bootstrap from '../../../../shared/public/bootstrap.module.css'
import { ProfileContainer } from './profile/ProfileContainer'
import { ShippingProvider } from '../../contexts/shipping'
import { ShippingContainer } from './shipping/ShippingContainer'
import { useOrderForm } from '../../contexts/orderform'
import { Loading } from '../../../../shared/components/loading-page/Loading'

export const CheckoutPage = () => {
  const { orderFormLoading } = useOrderForm()
  if (orderFormLoading) {
    return <Loading />
  }

  return (
    <>
      {/*Modal*/}
      <div className={checkout['sc-section']} style={{ marginTop: '34px' }}>
        <div className={checkout['sc-responsive-container']}>
          <div className={checkout['section-container']}>
            <h2 style={{ marginBottom: '32px' }}>Confirmar compra</h2>

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
