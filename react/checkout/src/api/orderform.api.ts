import { HttpMethods } from '../../../shared/services/http.service'
import { OrderForm } from '../../../shared/types/orderform.types'

export class OrderFormApi {
  async getUpdatedOrderForm() {
    const http = new HttpMethods()
    const orderForm = await http.get<OrderForm>('/api/checkout/pub/orderForm?refreshOutdatedData=true')

    return orderForm
  }
}
