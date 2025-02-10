import React, { useContext, useState } from 'react'
import { SingleProvider, Steps } from '../../../../shared'
import { CheckoutSteps, INITIAL_STEPS, StepsStates } from '../../types/stepper.types'
import { StepperContext, StepperContextType } from './StepperContext'

const StepsProvider: SingleProvider = ({ children }) => {
  const [steps, setSteps] = useState<Record<CheckoutSteps, StepsStates>>(INITIAL_STEPS)

  const openStep = (step: CheckoutSteps) => {
    const updatedSteps = Object.entries(steps).reduce(
      (acc, currentSteps) => {
        const key = currentSteps[0]

        if (step === key) {
          return { ...acc, [step]: StepsStates.OPEN }
        }

        const index = key as CheckoutSteps
        return { ...acc, [index]: StepsStates.CLOSED }
      },
      {} as Record<CheckoutSteps, StepsStates>,
    )
    console.log('🚀 ~ openStep ~ updatedSteps:', updatedSteps)

    setSteps(updatedSteps)
  }

  const doneStep = (step: CheckoutSteps) => {
    const stepsOrdering = Object.values(CheckoutSteps)
    const current = stepsOrdering.findIndex((value) => value === step)
    const stepsValues = Object.keys(steps)

    for (let index = current; index < stepsValues.length; index++) {
      if (stepsValues[index] === CheckoutSteps.PAYMENT) {
        setSteps((prev) => ({
          ...prev,
          [step]: StepsStates.DONE,
          [stepsValues[index]]: StepsStates.OPEN,
        }))

        break
      }

      if (Object.values(stepsValues)[index] !== StepsStates.DONE) {
        setSteps((prev) => ({
          ...prev,
          [step]: StepsStates.DONE,
          [stepsValues[index]]: StepsStates.OPEN,
        }))
      }
    }
  }

  const data: StepperContextType = {
    steps,
    setSteps,
    openStep,
    doneStep,
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
