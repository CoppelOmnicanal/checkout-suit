import { useMutation, useQueryClient } from '@tanstack/react-query'
import { OrderForm } from '../../../shared/types/orderform.types'
import { OrderFormApi } from '../api/orderform.api'
import { useEffect } from 'react'

export const useSaveCustomData = (orderFormService: OrderFormApi) => {
  const queryClient = useQueryClient()
  const mutation = useMutation<OrderForm, Error, { data: string; orderFormId: string; fieldName: string }>(
    async ({ data, orderFormId, fieldName }) => {
      return await orderFormService.saveCustomData(data, orderFormId, fieldName)
    },
    {
      onSuccess: (updatedOrderForm) => {
        queryClient.setQueryData<OrderForm>(['orderForm'], updatedOrderForm)
      },
    },
  )


  useEffect(() => {
    if (mutation.isError) {
      console.log('🚀 ~ useEffect ~ mutation.error.message:', mutation.error.message)
    }
  }, [mutation])

  return mutation.mutate
}
