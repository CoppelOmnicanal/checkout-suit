import React, { useContext, useEffect, useRef } from 'react'
import { SingleProvider } from '../../../../shared'
import { OrderFormContext, OrderFormContextType } from './OrderFormContext'
import { useQuery } from '@tanstack/react-query'
import { OrderFormApi } from '../../api/orderform.api'
import { HttpMethods } from '../../../../shared/services/http.service'
import { CHO_VERSION } from '../../../../shared/types/shared.types'
import { useSaveCustomData } from '../../mutations/useSaveCustomData'
import { OrderForm, REFID_MAX_LENGTH } from '../../types/orderform.types'
import { COMERCIAL_CONDITIONS_SKU, CuotesGateway, Gateways } from '../../types/itemcontext.types'
import { useCuotesModifiers } from '../../hooks/useCuotesModifier'

const OrderFormProvider: SingleProvider = ({ children }) => {
  const http = new HttpMethods('/api/checkout/pub/orderForm/')
  const orderFormService = new OrderFormApi(http)
  const saveCustomData = useSaveCustomData(orderFormService)
  const { sanitize } = useCuotesModifiers()
  //@ts-ignore
  const { data: orderForm, error, isLoading } = useQuery(['orderForm'], () => orderFormService.getUpdatedOrderForm())
  const {
    data: cuotesModifiers,
    error: modifiersError,
    isLoading: modifiersLoading,
  } = useQuery(['modifiers', orderForm?.orderFormId], () => modifiers(orderForm), {
    enabled: !!orderForm, // Solo se ejecuta si hay un `orderForm`
    staleTime: Infinity, // Los datos no se vuelven obsoletos nunca, evitando recargas innecesarias
    cacheTime: Infinity, // Los datos permanecen en caché indefinidamente
    refetchOnWindowFocus: false, // No vuelve a ejecutarse al volver a la ventana
    refetchOnReconnect: false, // No vuelve a ejecutarse cuando el usuario se reconecta
    retry: false, // Evita reintentos automáticos en caso de error
  })
  const isFirstUpdate = useRef(true)

  /**
   * Calcula UN modificador de cuotas y TODAS la promociones bancarias disponibles para un carrito de compras
   * @param items
   * @returns
   */

  const modifiers = async (orderForm?: OrderForm) => {
    if (!orderForm) {
      return
    }

    const { items } = orderForm
    if (items.length < 1) {
      return
    }

    const sanitizedItems = items.filter((item) => item.refId.length !== REFID_MAX_LENGTH)
    const { availableConditions, availableCuotes, promotions } = await sanitize(sanitizedItems)

    const applicableCuotes = availableCuotes.map((cuote) => {
      const element = availableConditions.find((gateway) => gateway.id === cuote)
      if (!element) {
        throw new Error('Invalid Cuote Gateway')
      }

      return Number(cuote.replace(element.gateway, ''))
    })

    const minorCuote = Math.min(...applicableCuotes)
    const isSameGatewayForAll = availableConditions.every((comercialConditon) => comercialConditon.gateway === availableConditions[0].gateway)
    const modifierCuotesGateway = isSameGatewayForAll ? minorCuote + availableConditions[0].gateway : minorCuote + Gateways.S

    const cuotesModifier = COMERCIAL_CONDITIONS_SKU[modifierCuotesGateway as CuotesGateway]
    const applicablePromotions = promotions['0'].filter((promotion) => Object.values(promotions).every((value) => value.includes(promotion)))

    const payload = sanitizedItems.map((item, index) => ({
      id: item.id,
      quantity: item.quantity,
      seller: item.seller,
      index,
    }))

    payload.push({ id: cuotesModifier, quantity: 1, seller: payload[0].seller, index: payload.length })
    applicablePromotions.forEach((promotion) => payload.push({ id: promotion, quantity: 1, seller: payload[0].seller, index: payload.length }))

    const areEquals = payload.every((item) => items.some((cartItem) => `${item.id}` === cartItem.id))

    if (areEquals) {
      return
    }

    await orderFormService.emptyCart(orderForm.orderFormId)
    return await orderFormService.addItems(payload, orderForm.orderFormId)
  }

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
        const updates = [
          saveCustomData({ data: JSON.stringify(device, null, 2), orderFormId: orderForm.orderFormId, fieldName: 'device' }),
          saveCustomData({ data: CHO_VERSION, orderFormId: orderForm.orderFormId, fieldName: 'version' }),
        ]

        Promise.all(updates).catch(console.error)
      }
    }
  }, [orderForm])

  useEffect(() => console.log('🚀 ~ orderForm:', orderForm), [orderForm])

  const data: OrderFormContextType = {
    orderForm,
    orderFormLoading: isLoading,
    orderFormService,
    modifiersLoading,
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
