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
  [CheckoutSteps.PROFILE]: StepsStates.CLOSED,
  [CheckoutSteps.SHIPPING]: StepsStates.CLOSED,
  [CheckoutSteps.PAYMENT]: StepsStates.CLOSED,
}
