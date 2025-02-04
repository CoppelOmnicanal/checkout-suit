import { createContext, Dispatch, SetStateAction } from 'react'
import { CheckoutSteps, StepsStates } from '../../types/stepper.types'

export interface StepperContextType {
  steps: Record<CheckoutSteps, StepsStates | null>
  setSteps: Dispatch<SetStateAction<Record<CheckoutSteps, StepsStates | null>>>
  openStep: (step: CheckoutSteps) => void
}

export const StepperContext = createContext<StepperContextType | undefined>(undefined)
