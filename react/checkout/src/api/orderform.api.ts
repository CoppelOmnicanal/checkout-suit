import { HttpMethods } from '../../../shared/services/http.service'
import { OrderForm } from '../../../shared/types/orderform.types'

export class OrderFormApi {
  private http: HttpMethods

  constructor(http: HttpMethods) {
    this.http = http
  }

  async getUpdatedOrderForm() {
    const orderForm = await this.http.get<OrderForm>('?refreshOutdatedData=true')
    return orderForm
  }

  async saveCustomData(data: string, orderFormId: string, fieldName: string) {
    const url = `${orderFormId}/customData/superiorcheckout/${fieldName}`
    const orderForm = await this.http.put<OrderForm, string>(url, JSON.stringify({ value: data }))
    return orderForm
  }
}
