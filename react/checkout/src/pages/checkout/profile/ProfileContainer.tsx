import React, { useEffect, useMemo } from 'react'
import { useOrderForm } from '../../../contexts/orderform'
import { useStepper } from '../../../contexts/stepper'
import { CheckoutSteps, StepsStates } from '../../../types/stepper.types'
//@ts-ignore
import { ProfileDone, ProfileOpen } from './'
import checkout from '../../../../../shared/public/checkout.module.css'
import { ClosedStep } from '../../../components/closed-step'
import closedStep from '../../../components/closed-step/closedstep.module.css'

export const ProfileContainer = () => {
  const { orderForm } = useOrderForm()
  if (!orderForm) {
    return <>Skeleton</>
  }

  const editStep = () => {}

  const { setSteps } = useStepper()
  const { clientProfileData } = orderForm
  const isCompleted = useMemo(() => {
    const { documentType, stateInscription, corporatePhone, profileCompleteOnLoading, profileErrorOnLoading, customerClass, tradeName, ...requiredData } =
      clientProfileData

    return Object.entries(requiredData).every((item) => {
      const [key, value] = item
      if (key.toLowerCase().includes('corporate') && !requiredData.isCorporate) {
        return true
      }

      return !!value
    })
  }, [clientProfileData])

  useEffect(() => {
    setSteps((prev) => ({
      ...prev,
      [CheckoutSteps.PROFILE]: isCompleted ? StepsStates.DONE : StepsStates.OPEN,
    }))
  }, [isCompleted])

  return (
    <div id={CheckoutSteps.PROFILE.substring(1)}>
      <div className={`${checkout['subtitle-1']}`}>Información personal</div>
      <div className={closedStep['container']}>
        <ClosedStep editStep={editStep} text="Completa tus datos para confirmar tu identidad" state={isCompleted ? StepsStates.DONE : StepsStates.OPEN} step={1} />
        {/* 
        {isCompleted && <ProfileDone />}
        {!isCompleted && <ProfileOpen />}
        */}
      </div>
    </div>
  )
}
