import React, { useContext, useState } from 'react'
import { SingleProvider } from '../../../../shared'
import { CheckoutSteps, INITIAL_STEPS, StepsStates } from '../../types/stepper.types'
import { StepperContext, StepperContextType } from './StepperContext'

const StepsProvider: SingleProvider = ({ children }) => {
  const [steps, setSteps] = useState<Record<CheckoutSteps, StepsStates | null>>(INITIAL_STEPS)

  const openStep = (step: CheckoutSteps) => {
    setSteps((prev) => {
      return Object.keys(prev).reduce(
        (acc, current) => {
          const choStep = current as keyof typeof CheckoutSteps
          const key = CheckoutSteps[choStep]
          acc[key] = current === step ? StepsStates.OPEN : StepsStates.CLOSED
          return acc
        },
        {} as Record<CheckoutSteps, StepsStates>,
      )
    })
  }
 
  const data: StepperContextType = {
    steps,
    setSteps,
    openStep
  }

  return <StepperContext.Provider value={data}>{children}</StepperContext.Provider>
}

const useStepper = () => {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('useStepper must be used within a StepsProvider')
  }
  return context
}

export { StepsProvider, useStepper }
