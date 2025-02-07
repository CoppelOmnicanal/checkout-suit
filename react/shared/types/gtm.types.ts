export const enum Events {
  CheckoutId = 'CheckoutId',
}

export interface CheckoutIdPayload {
  nd1: 'Checkout'
  nd2: GtmSections
  nd3: string
  nd4: '-'
  event: Events
}

export enum GtmSections {
  PersonalDataEmail = 'Datos personales - Agregar correo',
  PersonalDataBilling = 'Datos personales y tipo de facturación',
}

export interface GtmProduct {
  id: string
  name: string
  category: string
  brand: string
  variant: string
  price: number
  quantity: number
}

export interface GtmDimensionProduct extends GtmProduct {
  dimension1: string
  dimension2: string
  dimension3: string
}

export interface GtmOrderFormProduct {
  id: string
  name: string
  sku: string
  skuRefId: null
  skuName: string
  seller: 'Coppel S.A.'
  sellerId: '1'
  brand: string
  brandId: string
  isGift: false
  category: string
  categoryId: string
  categoryTree: string[]
  categoryIdTree: string[]
  originalPrice: number
  price: number
  sellingPrice: number
  tax: 0
  quantity: number
  components: []
  measurementUnit: 'un'
  unitMultiplier: 1
}

export interface DataLayer {
  'gtm.start'?: number
  event?: string
  'gtm.uniqueEventId'?: number
  '0'?: string
  '1'?: string
  '2'?: The2
  'gtm.historyChangeSource'?: string
  'gtm.oldUrlFragment'?: string
  'gtm.newUrlFragment'?: string
  'gtm.oldHistoryState'?: null
  'gtm.newHistoryState'?: GtmNewHistoryState
  'gtm.oldUrl'?: string
  'gtm.newUrl'?: string
  'gtm.triggers'?: string
  'gtm.scrollThreshold'?: number
  'gtm.scrollUnits'?: string
  'gtm.scrollDirection'?: string
}

export interface The2 {
  is_legacy_loaded?: boolean
  hjuid?: string
  event_category?: string
  event_label?: string
  non_interaction?: boolean
  language?: string
  page_title?: string
  screen_resolution?: string
  client_id?: string
  allow_display_features?: boolean
  allow_ad_personalization_signals?: boolean
  cookie_domain?: string
  cookie_expires?: number
  cookie_flags?: string
  cookie_path?: string
  cookie_update?: boolean
  is_legacy_converted?: boolean
  send_to?: string[]
}

export interface GtmNewHistoryState {
  key: string
  state: State
}

export interface State {
  navigationRoute: NavigationRoute
  renderRouting: boolean
}

export interface NavigationRoute {
  id: string
  params: Params
  path: string
}

export interface Params {}
