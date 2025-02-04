import React from 'react'
import { StepsStates } from '../../types/stepper.types'
//@ts-ignore
import Modular from 'coppelar.components/index'
import button from '../../../../shared/public/button.module.css'
import stepHeader from './stepheader.module.css'

interface ClosedStepProps {
  state: StepsStates
  editStep: () => void
  children: React.ReactNode
}

const { SvgIcon } = Modular

export const StepHeader: React.FC<ClosedStepProps> = ({ editStep, state, children }) => {
  return (
    <>
      <div className={stepHeader['container']}>
        {children}

        <button
          className={`${button['boton']} ${button['terciario']} ${button['ml-auto']} ${button['step-button']}`}
          onClick={state === StepsStates.DONE ? editStep : undefined}
        >
          <SvgIcon name="pencilBlue" />
        </button>
      </div>
    </>
  )
}
