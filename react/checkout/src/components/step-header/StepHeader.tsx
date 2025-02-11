//@ts-ignore
import { SvgIcon } from 'coppelar.components/index'
import React from 'react'
import { StepsStates } from '../../types/stepper.types'
import button from '../../../../shared/public/button.module.css'
import bootstrap from '../../../../shared/public/bootstrap.module.css'
import stepHeader from './stepheader.module.css'

interface ClosedStepProps {
  state: StepsStates
  editStep: () => void
  children: React.ReactNode
}

export const StepHeader: React.FC<ClosedStepProps> = ({ editStep, state, children }) => {
  const base = stepHeader['container']
  const styles = state === StepsStates.OPEN ? base : `${base} ${bootstrap['d-flex']} ${bootstrap['align-items-start']}`

  return (
    <>
      <div className={styles}>
        {children}
        {state !== StepsStates.OPEN && (
          <button
            className={`${button['boton']} ${button['terciario']} ${button['ml-auto']} ${button['step-button']}`}
            onClick={state === StepsStates.DONE ? editStep : undefined}
          >
            <SvgIcon name="pencilBlue" />
          </button>
        )}
      </div>
    </>
  )
}
