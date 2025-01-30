import React, { useContext } from 'react'
import { SingleProvider } from '../../../../shared'
import { OrderFormContext } from './OrderFormContext'

const OrderFormProvider: SingleProvider = ({ children }) => {
    const data = {}

    return (
        <OrderFormContext.Provider value={data}>{children}</OrderFormContext.Provider>
    )
}

const useOrderForm = () => useContext(OrderFormContext)

export { OrderFormProvider, useOrderForm }
