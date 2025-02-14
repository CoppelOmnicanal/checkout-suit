import { createContext } from 'react'
import { OrderForm } from '../../types/orderform.types'
import { OrderFormApi } from '../../api/orderform.api'
import { ProfileForm } from '../../pages/checkout/profile'
import { ShippingPayload } from '../../types/shipping.types'

export interface OrderFormContextType {
  orderForm: OrderForm | undefined
  orderFormLoading: boolean
  orderFormService: OrderFormApi
  modifiersLoading: boolean
  updateShipping: (shipping: ShippingPayload) => Promise<OrderForm>
  updateProfile: (form: ProfileForm) => Promise<OrderForm>
  refreshSaleChannel: (empleadocoppel: boolean, charge: (percentage: number) => void) => void
}

export const OrderFormContext = createContext<OrderFormContextType | undefined>(undefined)
