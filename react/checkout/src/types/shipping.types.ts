export interface Shipping {
  clearAddressIfPostalCodeNotFound: boolean
  selectedAddresses: SelectedAddress[]
  logisticsInfo: LogisticsInfo[]
}

export interface LogisticsInfo {
  itemIndex: number
  selectedDeliveryChannel: string
  selectedSla: string
}

export interface SelectedAddress {
  addressType: string
  receiverName: string
  addressId: string
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: string
  reference: string
  geoCoordinates: number[]
}

export interface ShippingPayload {
  addressId: string | null
  address: string | null
  logisticsInfo: LogisticsInfo[]
  clearAddressIfPostalCodeNotFound: boolean
  selectedAddresses: SelectedAddress[]
}
