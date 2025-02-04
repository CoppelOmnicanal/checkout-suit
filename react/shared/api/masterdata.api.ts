import { CartTag, Steps } from '../types/masterdata.types'
import { OrderForm } from '../../checkout/src/types/orderform.types'

export class MasterDataApi {
  private host = '/_v/services/vtex/masterdataSteps/'

  gtmEntry(orderForm: OrderForm, userId: string) {
    const payload = { orderformid: orderForm.orderFormId }
    const url = this.host + `${userId}`
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })

    navigator.sendBeacon(url, blob)
  }

  gtmExit(step: Steps, userId: string, sessionId: string, orderForm: OrderForm) {
    const { items, orderFormId } = orderForm
    const now = new Date()
    const oneMonthLater = new Date(now.setDate(now.getDate() + 30)).toISOString()

    const validSteps = Object.values(Steps)
    let cleanStep = step.toLowerCase() as Steps

    if (!validSteps.includes(cleanStep)) cleanStep = Steps.CART
    if (cleanStep === 'confirmation') cleanStep = Steps.PAYMENT

    const checkouttag = {
      cart: {
        DisplayValue: 'Carrinho',
        Scores: {
          Carrinho: [{ Point: 1.0, Date: now, Until: oneMonthLater }],
        },
      },
      profile: {
        DisplayValue: 'DadosPessoais',
        Scores: {
          Carrinho: [{ Point: 1.0, Date: now, Until: oneMonthLater }],
          DadosPessoais: [{ Point: 30.0, Date: now, Until: oneMonthLater }],
        },
      },
      shipping: {
        DisplayValue: 'Endereco',
        Scores: {
          Carrinho: [{ Point: 1.0, Date: now, Until: oneMonthLater }],
          DadosPessoais: [{ Point: 30.0, Date: now, Until: oneMonthLater }],
          Endereco: [{ Point: 900.0, Date: now, Until: oneMonthLater }],
        },
      },
      payment: {
        DisplayValue: 'FormaPagamento',
        Scores: {
          Carrinho: [{ Point: 1.0, Date: now, Until: oneMonthLater }],
          DadosPessoais: [{ Point: 30.0, Date: now, Until: oneMonthLater }],
          Endereco: [{ Point: 900.0, Date: now, Until: oneMonthLater }],
          FormaPagamento: [{ Point: 27000.0, Date: now, Until: oneMonthLater }],
        },
      },
      finish: {
        DisplayValue: 'Finalizado',
        Scores: {
          Carrinho: [{ Point: 1.0, Date: now, Until: oneMonthLater }],
          DadosPessoais: [{ Point: 30.0, Date: now, Until: oneMonthLater }],
          Endereco: [{ Point: 900.0, Date: now, Until: oneMonthLater }],
          FormaPagamento: [{ Point: 27000.0, Date: now, Until: oneMonthLater }],
          Finalizado: [{ Point: 810000.0, Date: now, Until: oneMonthLater }],
        },
      },
    }

    const { lastcart, cartValue, carttag } = items.reduce(
      (acc, item) => {
        const { id, quantity, price } = item

        acc.lastcart += `sku=${id}&qty=${quantity}&seller=1&sc=1&`
        acc.carttag[id] = [{ Point: quantity * (price / 100), Date: now, Until: oneMonthLater }]
        acc.cartValue += quantity * (price / 100)

        return acc
      },
      { lastcart: 'add?', cartValue: 0, carttag: {} as Record<string, CartTag[]> },
    )

    const payload = {
      orderformid: orderFormId,
      rclastsession: sessionId,
      rclastcart: lastcart,
      rclastcartvalue: cartValue,
      carttag: {
        DisplayValue: cartValue.toString(),
        Scores: carttag,
      },
      checkouttag: checkouttag[cleanStep],
    }

    const url = this.host + `${userId}`
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })

    navigator.sendBeacon(url, blob)
  }
}
