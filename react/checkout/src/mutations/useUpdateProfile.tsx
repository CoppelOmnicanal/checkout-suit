import { useMutation, useQueryClient } from '@tanstack/react-query'
import { OrderForm } from '../types/orderform.types'
import { OrderFormApi } from '../api/orderform.api'
import { useEffect } from 'react'
import { ProfileForm } from '../pages/checkout/profile'

export const useUpdateProfile = (orderFormService: OrderFormApi) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<OrderForm, Error, { form: ProfileForm }>(
    async ({ form }) => {
      const currentOrderForm = queryClient.getQueryData<OrderForm>(['orderForm'])
      if (!currentOrderForm) throw new Error('No se encontró el orderForm en caché.')
      const { clientProfileData, orderFormId } = currentOrderForm

      console.log('🚀 ~ form:', form)
      console.log("🚀 ~ clientProfileData:", clientProfileData)
      return await orderFormService.updateProfile({ ...clientProfileData, ...form, documentType: 'dni' }, orderFormId)
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

  return mutation.mutate
}
