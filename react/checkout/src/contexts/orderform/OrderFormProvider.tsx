import React, { useContext, useEffect, useRef } from 'react'
import { SingleProvider } from '../../../../shared'
import { OrderFormContext, OrderFormContextType } from './OrderFormContext'
import { useQuery } from '@tanstack/react-query'
import { OrderFormApi } from '../../api/orderform.api'
import { HttpMethods } from '../../../../shared/services/http.service'
//@ts-ignore
import { CHO_VERSION } from '../../../../shared/types/shared.types'

const OrderFormProvider: SingleProvider = ({ children }) => {
  const http = new HttpMethods('/api/checkout/pub/orderForm/')
  const orderFormService = new OrderFormApi(http)
  const { data: orderForm, error, isLoading } = useQuery(['orderForm'], () => orderFormService.getUpdatedOrderForm())
  const isFirstUpdate = useRef(true)

  useEffect(() => {
    if (orderForm && isFirstUpdate.current) {
      isFirstUpdate.current = false
      console.log('🚀 Primera actualización del orderForm:', orderForm)
      const device = {
        platform: navigator.platform,
        agents:
          navigator.userAgentData && navigator.userAgentData.brands && navigator.userAgentData.brands.length > 0
            ? navigator.userAgentData.brands
            : [{ brand: 'Unknown', version: navigator.userAgent }],
      }

      if (!!orderForm?.orderFormId) {
        orderFormService.saveCustomData(JSON.stringify(device, null, 2), orderForm.orderFormId, 'device')
        orderFormService.saveCustomData(CHO_VERSION, orderForm.orderFormId, 'version')
      }
    }
  }, [orderForm])

  useEffect(() => {
    console.log('🚀 ~ isLoading:', isLoading)
  }, [isLoading])

  useEffect(() => {
    console.log('🚀 ~ error:', error)
  }, [error])

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
