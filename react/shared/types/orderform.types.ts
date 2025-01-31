export interface OrderForm {
  orderFormId: string
  salesChannel: string
  loggedIn: boolean
  isCheckedIn: boolean
  storeId: null
  checkedInPickupPointId: null
  allowManualPrice: boolean
  canEditData: boolean
  userProfileId: string
  userType: null
  ignoreProfileData: boolean
  value: number
  messages: any[]
  items: AddToCartItem[]
  selectableGifts: any[]
  totalizers: Totalizer[]
  shippingData: ShippingData
  clientProfileData: ClientProfileData
  paymentData: PaymentData
  marketingData: null
  sellers: Seller[]
  clientPreferencesData: ClientPreferencesData
  commercialConditionData: null
  storePreferencesData: StorePreferencesData
  giftRegistryData: null
  openTextField: null
  invoiceData: InvoiceData
  customData: CustomData
  itemMetadata: ItemMetadata
  hooksData: null
  ratesAndBenefitsData: RatesAndBenefitsData
  subscriptionData: null
  merchantContextData: null
  purchaseAgentsData: null
  itemsOrdination: null
}

export interface UserDevice {
  platform: string,
}

export interface ClientPreferencesData {
  locale: string
  optinNewsLetter: null
}

export interface ClientProfileData {
  email: string
  firstName: string
  lastName: string
  document: string
  documentType: null
  phone: string
  corporateName: null
  tradeName: null
  corporateDocument: null
  stateInscription: null
  corporatePhone: null
  isCorporate: boolean
  profileCompleteOnLoading: boolean
  profileErrorOnLoading: boolean
  customerClass: null
}

export interface CustomData {
  customApps: CustomApp[]
}

export interface CustomApp {
  fields: Fields
  id: string
  major: number
}

export interface Fields {
  version: string
  device: string
  shipping: string
  paymenterror: string
  ordergroup: string
}

export interface InvoiceData {
  address: InvoiceDataAddress
}

export interface InvoiceDataAddress {
  postalCode: string
  city: string
  state: State
  country: CountryCode
  street: string
  number: string
  neighborhood: null
  complement: string
  reference: null
  geoCoordinates: any[]
}

export enum CountryCode {
  Arg = 'ARG',
}

export enum State {
  BuenosAires = 'Buenos Aires',
  CiudadAutónomaDeBuenosAires = 'Ciudad Autónoma de Buenos Aires',
  SantaFe = 'Santa Fe',
}

export interface ItemMetadata {
  items: ItemMetadataItem[]
}

export interface ItemMetadataItem {
  id: string
  seller: string
  name: string
  skuName: string
  productId: string
  refId: string
  ean: null
  imageUrl: string
  detailUrl: string
  assemblyOptions: any[]
}

export interface AddToCartItem {
  uniqueId: string
  id: string
  productId: string
  productRefId: string
  refId: string
  ean: null
  name: string
  skuName: string
  modalType: null
  parentItemIndex: null
  parentAssemblyBinding: null
  assemblies: any[]
  priceValidUntil: Date
  tax: number
  price: number
  listPrice: number
  manualPrice: null
  manualPriceAppliedBy: null
  sellingPrice: number
  rewardValue: number
  isGift: boolean
  additionalInfo: AdditionalInfo
  preSaleDate: null
  productCategoryIds: string
  productCategories: { [key: string]: string }
  quantity: number
  seller: string
  sellerChain: string[]
  imageUrl: string
  detailUrl: string
  components: any[]
  bundleItems: any[]
  attachments: any[]
  attachmentOfferings: any[]
  offerings: any[]
  priceTags: PriceTag[]
  availability: string
  measurementUnit: string
  unitMultiplier: number
  manufacturerCode: null
  priceDefinition: PriceDefinition
  taxCode: string
}

export interface AdditionalInfo {
  dimension: null
  brandName: string
  brandId: string
  offeringInfo: null
  offeringType: null
  offeringTypeId: null
}

export interface PriceDefinition {
  calculatedSellingPrice: number
  total: number
  sellingPrices: SellingPrice[]
  reason: null
}

export interface SellingPrice {
  value: number
  quantity: number
}

export interface PriceTag {
  name: string
  value: number
  rawValue: number
  isPercentual: boolean
  identifier: string
  owner: string
}

export interface PaymentData {
  updateStatus: string
  installmentOptions: InstallmentOption[]
  paymentSystems: PaymentSystem[]
  payments: any[]
  giftCards: any[]
  giftCardMessages: any[]
  availableAccounts: any[]
  availableTokens: any[]
  availableAssociations: AvailableAssociations
}

export interface AvailableAssociations {}

export interface InstallmentOption {
  paymentSystem: string
  bin: null
  paymentName: null
  paymentGroupName: null
  value: number
  installments: Installment[]
}

export interface Installment {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments?: Installment[]
  id?: ID
}

export enum ID {
  Coppelar = 'COPPELAR',
}

export interface PaymentSystem {
  id: number
  name: string
  groupName: string
  validator: Validator
  stringId: string
  template: string
  requiresDocument: boolean
  displayDocument: boolean
  isCustom: boolean
  description: null | string
  requiresAuthentication: boolean
  dueDate: Date
  availablePayments: null
}

export interface Validator {
  regex: null | string
  mask: Mask | null
  cardCodeRegex: CardCodeRegex | null
  cardCodeMask: null | string
  weights: number[] | null
  useCvv: boolean
  useExpirationDate: boolean
  useCardHolderName: boolean
  useBillingAddress: boolean
}

export enum CardCodeRegex {
  The093$ = '^[0-9]{3}$',
  The094$ = '^[0-9]{4}$',
}

export enum Mask {
  The999999999999999 = '9999 999999 99999',
  The9999999999999999 = '9999 9999 9999 9999',
}

export interface RatesAndBenefitsData {
  rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[]
  teaser: any[]
}

export interface RateAndBenefitsIdentifier {
  id: string
  name: string
  featured: boolean
  description: string
  matchedParameters: MatchedParameters
  additionalInfo: null
  triggeredBy: null
}

export interface MatchedParameters {
  'zipCode@Shipping': string
  slaIds: string
}

export interface Seller {
  id: string
  name: string
  logo: string
  minimumOrderValue: number
}

export interface ShippingData {
  address: AvailableAddressClass
  logisticsInfo: LogisticsInfo[]
  selectedAddresses: AvailableAddressClass[]
  availableAddresses: AvailableAddressClass[]
  pickupPoints: PickupPoint[]
  contactInformation: any[]
}

export interface AvailableAddressClass {
  addressType: AddressType
  receiverName: null
  addressId: string
  isDisposable: boolean
  postalCode: string
  city: string
  state: State
  country: CountryCode
  street: null | string
  number: null | string
  neighborhood: null | string
  complement: Complement | null
  reference: null
  geoCoordinates: number[]
}

export enum AddressType {
  Pickup = 'pickup',
  Residential = 'residential',
  Search = 'search',
}

export enum Complement {
  AltoAvellanedaShopping = 'Alto Avellaneda Shopping. ',
  Empty = '',
  LiniersShopping = 'Liniers Shopping',
  SANJustoShopping = 'San Justo Shopping.',
}

export interface LogisticsInfo {
  itemIndex: number
  selectedSla: string
  selectedDeliveryChannel: SelectedDeliveryChannel
  addressId: string
  slas: Sla[]
  shipsTo: CountryCode[]
  itemId: string
  deliveryChannels: DeliveryChannel[]
}

export interface DeliveryChannel {
  id: SelectedDeliveryChannel
}

export enum SelectedDeliveryChannel {
  Delivery = 'delivery',
  PickupInPoint = 'pickup-in-point',
}

export interface Sla {
  id: string
  deliveryChannel: SelectedDeliveryChannel
  name: string
  deliveryIds: DeliveryID[]
  shippingEstimate: ShippingEstimate
  shippingEstimateDate: null
  lockTTL: null
  availableDeliveryWindows: any[]
  deliveryWindow: null
  price: number
  listPrice: number
  tax: number
  pickupStoreInfo: PickupStoreInfo
  pickupPointId: null | string
  pickupDistance: number
  polygonName: string
  transitTime: ShippingEstimate
}

export interface DeliveryID {
  courierId: string
  warehouseId: string
  dockId: DockID
  courierName: CourierName
  quantity: number
  kitItemDetails: any[]
}

export enum CourierName {
  CoppelExpres = 'COPPEL EXPRES',
  PuntosDeRetiro = 'PUNTOS DE RETIRO',
}

export enum DockID {
  The1C3Bc18 = '1c3bc18',
}

export interface PickupStoreInfo {
  isPickupStore: boolean
  friendlyName: null | string
  address: AvailableAddressClass | null
  additionalInfo: null | string
  dockId: DockID | null
}

export enum ShippingEstimate {
  The2Bd = '2bd',
}

export interface PickupPoint {
  friendlyName: string
  address: AvailableAddressClass
  additionalInfo: string
  id: string
  isActive: null
  businessHours: BusinessHour[]
}

export interface BusinessHour {
  DayOfWeek: number
  OpeningTime: string
  ClosingTime: string
}

export interface StorePreferencesData {
  countryCode: CountryCode
  saveUserData: boolean
  timeZone: string
  currencyCode: string
  currencyLocale: number
  currencySymbol: string
  currencyFormatInfo: CurrencyFormatInfo
}

export interface CurrencyFormatInfo {
  currencyDecimalDigits: number
  currencyDecimalSeparator: string
  currencyGroupSeparator: string
  currencyGroupSize: number
  startsWithCurrencySymbol: boolean
}

export interface Totalizer {
  id: string
  name: string
  value: number
  alternativeTotals?: Totalizer[]
}
