import React, { useMemo, useState } from 'react'
import { useOrderForm } from '../../../contexts/orderform'
import { useStepper } from '../../../contexts/stepper'
import { CheckoutSteps, StepsStates } from '../../../types/stepper.types'
import checkout from '../../../../../shared/public/checkout.module.css'
import { StepHeader } from '../../../components/step-header'
import { ShippingDone } from './ShippingDone'
import { ShippingOpen } from './open/ShippingOpen'
import { SelectedDeliveryChannel } from '../../../types/orderform.types'

export const ShippingContainer = () => {
  const { orderForm } = useOrderForm()

  if (!orderForm) {
    return <>Skeleton</>
  }

  const { shippingData } = orderForm
  const initialDisplay = () => {
    let state = StepsStates.CLOSED

    try {
      const { logisticsInfo } = shippingData
      const { selectedDeliveryChannel } = logisticsInfo[0]
      const shipping = selectedDeliveryChannel === SelectedDeliveryChannel.Delivery ? shippingData.address : orderForm.invoiceData

      if (!shipping) throw new Error('no data')
    } catch (error) {
      console.log('🚀 ~ initialDisplay ~ error:', error)
    }

    return state
  }

  const { steps, openStep } = useStepper()
  const [display, setDisplay] = useState<StepsStates>(StepsStates.CLOSED)
  const render = useMemo(() => {
    const elements: Record<StepsStates, JSX.Element> = {
      [StepsStates.CLOSED]: <p className={checkout['text-secondary']}>Ingresá todos los datos de entrega</p>,
      [StepsStates.DONE]: <ShippingDone />,
      [StepsStates.OPEN]: <ShippingOpen />,
    }

    return elements[display]
  }, [display])

  return (
    <div id={CheckoutSteps.SHIPPING.substring(1)}>
      {steps[CheckoutSteps.SHIPPING] !== StepsStates.OPEN && <div className={`${checkout['subtitle-1']}`}>Datos de entrega</div>}
      <StepHeader editStep={() => openStep(CheckoutSteps.SHIPPING)} state={display}>
        {render}
      </StepHeader>
    </div>
  )
}
