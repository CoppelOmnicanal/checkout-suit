import React from 'react'
import { useOrderForm } from '../../../contexts/orderform'

export const Cart = () => {
  const { modifiersLoading } = useOrderForm()
  return (
    <>
      {modifiersLoading && <span>Modificadores cargando: bloquear boton de eliminar/alterar productos</span>}
      <div>Cart</div>
    </>
  )
}
