export enum Hashes {
  CART = '#cart',
  PROFILE = '#profile',
  SHIPPING = '#shipping',
}

export type Brand = {
  brand: string
  version: string
}

export type UserAgentData = {
  brands: Brand[]
  mobile: boolean
  platform: string
}

export interface Navigator {
  userAgentData?: UserAgentData
}



export const CHO_VERSION = '3.0.0'
