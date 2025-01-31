import React, { useContext } from 'react'
import { SingleProvider } from '../../../../shared'
import { ShippingContext, ShippingContextType } from './ShippingContext'

const ShippingProvider: SingleProvider = ({ children }) => {
  const data: ShippingContextType = {}

  return <ShippingContext.Provider value={data}>{children}</ShippingContext.Provider>
}

const useOrderForm = () => {
  const context = useContext(ShippingContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export { ShippingProvider, useOrderForm }
