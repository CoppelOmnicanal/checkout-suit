import { createContext } from 'react'
import { OrderForm } from '../../../../shared/types/orderform.types'

export interface OrderFormContextType {
  orderForm: OrderForm | undefined
  orderFormLoading: boolean
}

export const OrderFormContext = createContext<OrderFormContextType>({ orderFormLoading: false, orderForm: undefined })
