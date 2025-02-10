import { createContext, Dispatch, SetStateAction } from 'react'
import { CheckoutSteps, StepsStates } from '../../types/stepper.types'

export interface StepperContextType {
  steps: Record<CheckoutSteps, StepsStates>
  setSteps: Dispatch<SetStateAction<Record<CheckoutSteps, StepsStates>>>
  openStep: (step: CheckoutSteps) => void
  doneStep: (step: CheckoutSteps) => void
}

export const StepperContext = createContext<StepperContextType | undefined>(undefined)
