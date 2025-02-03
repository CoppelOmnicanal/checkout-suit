import React, { useEffect, useState } from 'react'
import { OrderFormProvider } from './contexts/orderform'
import { useRuntime } from 'vtex.render-runtime'
import { CartPage, CheckoutPage } from './pages'
import { Hashes } from '../../shared/types/shared.types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EventsContainer } from './components/EventsContainer'
import { AuthProvider } from '../../shared/contexts/auth/AuthProvider'
const queryClient = new QueryClient()

export const Checkout = () => {
  const { history } = useRuntime()
  const [hash, setHash] = useState(Hashes.CART)
  const unlisten = history.listen((location: Location) => setHash((location.hash as Hashes) ?? Hashes.CART))

  const render: Record<Hashes, JSX.Element> = {
    [Hashes.CART]: <CartPage />,
    [Hashes.PROFILE]: <CheckoutPage />,
    [Hashes.SHIPPING]: <CheckoutPage />,
  }

  useEffect(() => {
    return () => {
      unlisten()
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <OrderFormProvider>
        <AuthProvider>
          <EventsContainer>{render[hash]}</EventsContainer>
        </AuthProvider>
      </OrderFormProvider>
    </QueryClientProvider>
  )
}
