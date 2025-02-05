import React, { useEffect, useMemo } from 'react'
import { useOrderForm } from '../../../contexts/orderform'
import { useStepper } from '../../../contexts/stepper'
import { CheckoutSteps, StepsStates } from '../../../types/stepper.types'
import { ProfileDone } from './'
import { ProfileOpen } from './open'
import checkout from '../../../../../shared/public/checkout.module.css'
import { StepHeader } from '../../../components/step-header'

export const ProfileContainer = () => {
  const { orderForm } = useOrderForm()
  if (!orderForm) {
    return <>Skeleton</>
  }

  const { steps, setSteps, openStep } = useStepper()
  const { clientProfileData } = orderForm
  const isCompleted = useMemo(() => {
    if (steps[CheckoutSteps.PROFILE] !== null) {
      return steps[CheckoutSteps.PROFILE] === StepsStates.DONE
    }

    const { documentType, stateInscription, corporatePhone, profileCompleteOnLoading, profileErrorOnLoading, customerClass, tradeName, ...requiredData } =
      clientProfileData

    return Object.entries(requiredData).every((item) => {
      const [key, value] = item
      if (key.toLowerCase().includes('corporate') && !requiredData.isCorporate) {
        return true
      }

      return !!value
    })
  }, [clientProfileData, steps])

  useEffect(() => {
    setSteps((prev) => ({
      ...prev,
      [CheckoutSteps.PROFILE]: isCompleted ? StepsStates.DONE : StepsStates.OPEN,
    }))
  }, [isCompleted])

  return (
    <div id={CheckoutSteps.PROFILE.substring(1)}>
      {steps[CheckoutSteps.PROFILE] !== StepsStates.OPEN && <div className={`${checkout['subtitle-1']}`}>Información personal</div>}
      <StepHeader editStep={() => openStep(CheckoutSteps.PROFILE)} state={isCompleted ? StepsStates.DONE : StepsStates.OPEN}>
        {!steps[CheckoutSteps.PROFILE] && <p className={checkout['text-secondary']}>Completa tus datos para confirmar tu identidad</p>}
        {isCompleted && <ProfileDone clientProfileData={clientProfileData} />}
        {!isCompleted && <ProfileOpen clientProfileData={clientProfileData} />}
      </StepHeader>
    </div>
  )
}
