import { createContext } from 'react'
import { OrderForm } from '../../types/orderform.types'

export interface OrderFormContextType {
  orderForm: OrderForm | undefined
  orderFormLoading: boolean
}

export const OrderFormContext = createContext<OrderFormContextType>({ orderFormLoading: false, orderForm: undefined })
