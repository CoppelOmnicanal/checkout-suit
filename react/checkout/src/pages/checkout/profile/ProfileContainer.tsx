import React, { useEffect, useMemo, useState } from 'react'
import { useOrderForm } from '../../../contexts/orderform'
import { useStepper } from '../../../contexts/stepper'
import { CheckoutSteps, StepsStates } from '../../../types/stepper.types'
import { ProfileDone } from './'
import { ProfileOpen } from './open'
import checkout from '../../../../../shared/public/checkout.module.css'
import { StepHeader } from '../../../components/step-header'
import { ClientProfileData } from '../../../types/orderform.types'
import { FormProvider } from '../../../contexts/form/FormProvider'

export interface ProfileForm
  extends Omit<
    ClientProfileData,
    'documentType' | 'stateInscription' | 'corporatePhone' | 'profileCompleteOnLoading' | 'profileErrorOnLoading' | 'customerClass' | 'tradeName'
  > {}

export const ProfileContainer = () => {
  const { orderForm } = useOrderForm()
  
  if (!orderForm) {
    return <>Skeleton</>
  }

  const { steps, openStep } = useStepper()
  const { clientProfileData } = orderForm
  const initialData: ProfileForm = useMemo(
    () => ({
      email: clientProfileData?.email ?? '',
      firstName: clientProfileData?.firstName ?? '',
      lastName: clientProfileData?.lastName ?? '',
      document: clientProfileData?.document ?? '',
      phone: clientProfileData?.phone ?? '',
      corporateName: clientProfileData?.corporateName ?? '',
      corporateDocument: clientProfileData?.corporateDocument ?? '',
      isCorporate: clientProfileData?.isCorporate ?? false,
    }),
    [],
  )

  const [form, setForm] = useState(initialData)
  const { corporateName, corporateDocument, isCorporate, ...data } = form
  const [display, setDisplay] = useState<StepsStates>(Object.values(data).every((value) => !!value) ? StepsStates.DONE : StepsStates.OPEN)
  const render = useMemo(() => {
    const elements: Record<StepsStates, JSX.Element> = {
      [StepsStates.CLOSED]: <p className={checkout['text-secondary']}>Completa tus datos para confirmar tu identidad</p>,
      [StepsStates.DONE]: <ProfileDone clientProfileData={form} />,
      [StepsStates.OPEN]: <ProfileOpen setForm={setForm} />,
    }

    return elements[display]
  }, [display])

  useEffect(() => {
    const initialRender = Object.values(steps).every((step) => step === StepsStates.CLOSED)
    if (!initialRender) setDisplay(steps[CheckoutSteps.PROFILE])
  }, [steps])

  return (
    <div id={CheckoutSteps.PROFILE.substring(1)}>
      {steps[CheckoutSteps.PROFILE] !== StepsStates.OPEN && <div className={`${checkout['subtitle-1']}`}>Información personal</div>}
      <StepHeader editStep={() => openStep(CheckoutSteps.PROFILE)} state={display}>
        <FormProvider form={form}>{render}</FormProvider>
      </StepHeader>
    </div>
  )
}
