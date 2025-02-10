import { HttpMethods } from '../../../shared/services/http.service'
import { AddToCartItem, ClientProfileData, ItemsPayload, OrderForm } from '../types/orderform.types'

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

  async updateProfile(form: ClientProfileData, orderFormId: string) {
    const url = `${orderFormId}/attachments/clientProfileData`
    const orderForm = await this.http.post<OrderForm, ClientProfileData>(url, form)
    return orderForm
  }

  async emptyCart(orderFormId: string) {
    const url = `${orderFormId}/items/removeAll`
    const orderForm = await this.http.post<OrderForm, {}>(url, {})
    return orderForm
  }

  async addItems(items: ItemsPayload[], orderFormId: string) {
    const url = `${orderFormId}/items`
    const orderForm = await this.http.post<OrderForm, { orderItems: ItemsPayload[] }>(url, { orderItems: items })
    return orderForm
  }
}
