import { CheckoutIdPayload, GtmSections } from '../types'

export const useGtm = () => {
  const checkoutId = (section: GtmSections, orderFormId: string) => {
    const payload: CheckoutIdPayload = {
      nd1: 'Checkout',
      nd2: section,
      nd3: orderFormId,
      nd4: '-',
      event: 'CheckoutId',
    }

    if (window?.dataLayer && Array.isArray(window.dataLayer)) window.dataLayer.push(payload)
  }

  return { checkoutId }
}
