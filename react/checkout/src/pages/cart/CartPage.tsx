import React from 'react'
import { useOrderForm } from '../../contexts/orderform'
import checkout from '../../../../shared/public/checkout.module.css'
import cartpage from './cart.module.css'
import { Cart, CartEmpty } from './components'

export const CartPage = () => {
  const { orderFormLoading, orderForm } = useOrderForm()

  if (orderFormLoading) {
    return <div>Cargando CartPage...</div>
  }

  return (
    <div className={checkout['sc-section']}>
      <div className={checkout['sc-responsive-container']}>
        <div id={cartpage['section-title-container']}>
          <h2 className={checkout.h3} style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: 0 }}>
            Mi carrito
          </h2>
        </div>
        {orderForm && orderForm.items.length > 0 ? <Cart /> : <CartEmpty />}
      </div>
    </div>
  )
}
