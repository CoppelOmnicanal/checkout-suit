import React, { useContext, useEffect } from 'react'
import { SingleProvider } from '../../../../shared'
import { OrderFormContext, OrderFormContextType } from './OrderFormContext'
import { useQuery } from '@tanstack/react-query'
import { OrderFormApi } from '../../api/orderform.api'

const OrderFormProvider: SingleProvider = ({ children }) => {
  const orderFormService = new OrderFormApi()
  const { data: orderForm, error, isLoading } = useQuery(['orderForm'], () => orderFormService.getUpdatedOrderForm())

  useEffect(() => {
    console.log('🚀 ~ isLoading:', isLoading)
  }, [isLoading])
  useEffect(() => {
    console.log('🚀 ~ error:', error)
  }, [error])
  useEffect(() => {
    console.log('🚀 ~ data:', orderForm)
  }, [orderForm])

  const data: OrderFormContextType = {
    orderForm,
    orderFormLoading: isLoading,
  }

  return <OrderFormContext.Provider value={data}>{children}</OrderFormContext.Provider>
}

const useOrderForm = () => {
  const context = useContext(OrderFormContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export { OrderFormProvider, useOrderForm }
