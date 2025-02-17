import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { SingleProvider } from '../../../../shared'
import { OrderFormContext, OrderFormContextType } from './OrderFormContext'
import { useQuery } from '@tanstack/react-query'
import { OrderFormApi } from '../../api/orderform.api'
import { HttpMethods } from '../../../../shared/services/http.service'
import { CHO_VERSION } from '../../../../shared/types/shared.types'
import { useSaveCustomData } from '../../mutations/useSaveCustomData'
import { ItemsPayload, OrderForm, REFID_MAX_LENGTH, SalesChannel } from '../../types/orderform.types'
import { useCuotesModifiers } from '../../hooks/useCuotesModifier'
import { useUpdateProfile } from '../../mutations/useUpdateProfile'
import { ProfileForm } from '../../pages/checkout/profile'
import { useAddItems } from '../../mutations/useAddItems'
import { useUpdateShipping } from '../../mutations/useUpdateShipping'
import { ShippingPayload } from '../../types/shipping.types'

const OrderFormProvider: SingleProvider = ({ children }) => {
  const http = new HttpMethods('/api/checkout/pub/orderForm/')
  const orderFormService = new OrderFormApi(http)

  const updateProfileData = useUpdateProfile(orderFormService)
  const saveCustomData = useSaveCustomData(orderFormService)
  const addItemsMutation = useAddItems(orderFormService)
  const updateShippingMutation = useUpdateShipping(orderFormService)

  const { sanitize, calcMinorCuote, calcPromotions } = useCuotesModifiers()
  const { data: orderForm, isLoading } = useQuery(['orderForm'], () => orderFormService.getUpdatedOrderForm())
  const { isLoading: modifiersLoading } = useQuery(['modifiers', orderForm?.orderFormId], () => modifiers(orderForm), {
    enabled: !!orderForm,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnReconnect: false,
    retry: false,
  })
  const isFirstUpdate = useRef(true)
  const updateProfile = (form: ProfileForm) => updateProfileData({ form })
  const addItems = (items: ItemsPayload[]) => addItemsMutation({ items })
  const updateShipping = (shipping: ShippingPayload) => updateShippingMutation({ shipping })

  const refreshSaleChannel = useCallback(
    async (empleadocoppel: boolean, charge?: (percentage: number) => void) => {
      if (!orderForm) throw new Error('no order form')

      const { items, orderFormId } = orderForm
      const itemsPayload: ItemsPayload[] = items.map((item, index) => ({
        id: item.id,
        index,
        quantity: item.quantity,
        seller: empleadocoppel ? SalesChannel.COPPEL : SalesChannel.CLIENT,
      }))

      await orderFormService.emptyCart(orderFormId)
      if (charge) charge(55)

      await addItems(itemsPayload)
      if (charge) charge(65)
    },
    [orderForm],
  )

  const modifiers = async (orderForm?: OrderForm) => {
    if (!orderForm || orderForm.items.length < 1) return

    const { items } = orderForm
    const sanitizedItems = items.filter((item) => item.refId.length !== REFID_MAX_LENGTH)
    const { availableConditions, availableCuotes, availablePromotions } = await sanitize(sanitizedItems)
    const cuote = calcMinorCuote(availableConditions, availableCuotes)
    const promotions = calcPromotions(availablePromotions)
    const payload = sanitizedItems.map((item, index) => ({
      id: item.id,
      quantity: item.quantity,
      seller: item.seller,
      index,
    }))

    payload.push({ id: cuote, quantity: 1, seller: payload[0].seller, index: payload.length })
    promotions.forEach((promotion) => payload.push({ id: promotion, quantity: 1, seller: payload[0].seller, index: payload.length }))

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

  const data: OrderFormContextType = {
    orderForm,
    orderFormLoading: isLoading,
    orderFormService,
    modifiersLoading,
    updateProfile,
    refreshSaleChannel,
    updateShipping,
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
