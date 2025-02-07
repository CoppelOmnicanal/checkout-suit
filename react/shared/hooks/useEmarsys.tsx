import { OrderForm } from '../../checkout/src/types/orderform.types'
import { CartPayload } from '../types/emarsys.types'

export const useEmarsys = () => {
  const setEmail = (orderform: OrderForm) => {
    const { clientProfileData } = orderform
    const { email } = clientProfileData

    if (email !== '' && email !== null) {
      window.Scarab.setEmail(email)
    }
  }

  const cart = (orderForm: OrderForm) => {
    const { items } = orderForm
    let cart = {} as CartPayload[]

    if (items && items.length > 0) {
      cart = items.map((item) => ({
        item: item.refId,
        price: (item.price / 100) * item.quantity,
        quantity: item.quantity,
      }))
    }

    window.Scarab.cart(cart)
  }

  const go = () => window.Scarab.go()

  return { setEmail, cart, go }
}
