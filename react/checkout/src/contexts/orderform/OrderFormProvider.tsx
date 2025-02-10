import React, { useContext, useEffect, useRef } from 'react'
import { SingleProvider } from '../../../../shared'
import { OrderFormContext, OrderFormContextType } from './OrderFormContext'
import { useQuery } from '@tanstack/react-query'
import { OrderFormApi } from '../../api/orderform.api'
import { HttpMethods } from '../../../../shared/services/http.service'
import { CHO_VERSION } from '../../../../shared/types/shared.types'
import { useSaveCustomData } from '../../mutations/useSaveCustomData'

const OrderFormProvider: SingleProvider = ({ children }) => {
  const http = new HttpMethods('/api/checkout/pub/orderForm/')
  const orderFormService = new OrderFormApi(http)
  const saveCustomData = useSaveCustomData(orderFormService)
  //@ts-ignore
  const { data: orderForm, error, isLoading } = useQuery(['orderForm'], () => orderFormService.getUpdatedOrderForm())
  const isFirstUpdate = useRef(true)

  useEffect(() => {
    if (orderForm && isFirstUpdate.current) {
      isFirstUpdate.current = false
      const device = {
        platform: navigator.platform,
        agents:
          navigator.userAgentData && navigator.userAgentData.brands && navigator.userAgentData.brands.length > 0
            ? navigator.userAgentData.brands
            : [{ brand: 'Unknown', version: navigator.userAgent }],
      }

      if (!!orderForm?.orderFormId) {
        saveCustomData({ data: JSON.stringify(device, null, 2), orderFormId: orderForm.orderFormId, fieldName: 'device' })
        saveCustomData({ data: CHO_VERSION, orderFormId: orderForm.orderFormId, fieldName: 'version' })
      }
    }
  }, [orderForm])

  const data: OrderFormContextType = {
    orderForm,
    orderFormLoading: isLoading,
    orderFormService
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
