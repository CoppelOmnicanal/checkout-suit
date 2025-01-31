import { createContext } from 'react'

export interface ShippingContextType {}

export const ShippingContext = createContext<ShippingContextType | undefined>(undefined)
