import React from 'react'
import { StepButton } from '.'
import { StepsStates } from '../../types/stepper.types'
import checkout from '../../../../shared/public/checkout.module.css'
//@ts-ignore
import Modular from 'coppelar.components/index'

interface ClosedStepProps {
  text: string
  state: StepsStates
  step: number
  editStep: () => void
}

const { SvgIcon } = Modular

export const ClosedStep: React.FC<ClosedStepProps> = ({ editStep, text, state, step }) => {
  const STEPS_BUTTON = {
    [StepsStates.CLOSED]: <StepButton>{step}</StepButton>,
    [StepsStates.OPEN]: <StepButton>{step}</StepButton>,
    [StepsStates.DONE]: (
      <StepButton onClick={editStep}>
        <SvgIcon name="pencilBlue" />
      </StepButton>
    ),
  }

  return (
    <>
      <p className={checkout['text-secondary']}>{text}</p>
      <div>{STEPS_BUTTON[state]}</div>
    </>
  )
}
