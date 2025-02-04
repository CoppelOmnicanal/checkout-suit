export enum CheckoutSteps {
  PROFILE = '#profile',
  SHIPPING = '#shipping',
  PAYMENT = '#payment',
}

export enum StepsStates {
  CLOSED = 'closed',
  OPEN = 'open',
  DONE = 'done',
}

export const INITIAL_STEPS = {
  [CheckoutSteps.PROFILE]: null,
  [CheckoutSteps.SHIPPING]: null,
  [CheckoutSteps.PAYMENT]: null,
}
