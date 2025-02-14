import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ItemsPayload, OrderForm } from '../types/orderform.types'
import { OrderFormApi } from '../api/orderform.api'
import { useEffect } from 'react'

export const useAddItems = (orderFormService: OrderFormApi) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<OrderForm, Error, { items: ItemsPayload[] }>(
    async ({ items }) => {
      const currentOrderForm = queryClient.getQueryData<OrderForm>(['orderForm'])
      if (!currentOrderForm) throw new Error('No se encontró el orderForm en caché.')

      const { orderFormId } = currentOrderForm
      return await orderFormService.addItems(items, orderFormId)
    },
    {
      onSuccess: (updatedOrderForm) => {
        queryClient.setQueryData<OrderForm>(['orderForm'], updatedOrderForm)
      },
    },
  )

  useEffect(() => {
    if (mutation.isError) {
      console.error('Error al actualizar el perfil:', mutation.error.message)
    }
  }, [mutation])

  return mutation.mutateAsync 
}
