import { createContext } from 'react'
import { OrderForm } from '../../types/orderform.types'
import { OrderFormApi } from '../../api/orderform.api'

export interface OrderFormContextType {
  orderForm: OrderForm | undefined
  orderFormLoading: boolean
  orderFormService: OrderFormApi
}

export const OrderFormContext = createContext<OrderFormContextType | undefined>(undefined)
