import { createContext } from 'react'
import { OrderForm } from '../../types/orderform.types'
import { OrderFormApi } from '../../api/orderform.api'
import { ProfileForm } from '../../pages/checkout/profile'

export interface OrderFormContextType {
  orderForm: OrderForm | undefined
  orderFormLoading: boolean
  orderFormService: OrderFormApi
  modifiersLoading: boolean
  updateProfile: (form: ProfileForm) => Promise<OrderForm>
}

export const OrderFormContext = createContext<OrderFormContextType | undefined>(undefined)
