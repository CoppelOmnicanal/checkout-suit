export enum Steps {
  CART = 'cart',
  PROFILE = 'profile',
  SHIPPING = 'shipping',
  PAYMENT = 'payment',
  CONFIRMATION = 'confirmation',
  FINISH = 'finish',
}

export type CartTag = {
    Point: number,
    Date: Date,
    Until: string
}