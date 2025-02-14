export interface VTEXUser {
  userProfileId: string
  profileProvider: string
  availableAccounts: AvailableAccount[]
  availableAddresses: AvailableAddress[]
  contactInformation: any[]
  contacts: any[]
  contactsInfo: any[]
  userProfile: UserProfile
  isComplete: boolean
}

export interface AvailableAccount {
  accountId: string
  paymentSystem: string
  paymentSystemName: string
  cardNumber: string
  bin: string
  availableAddresses: string[]
  isExpired: boolean
  accountStatus: null
}

export interface AvailableAddress {
  addressType: string
  receiverName: string
  addressId: string
  isDisposable: boolean
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: null
  complement: null | string
  reference: null | string
  geoCoordinates: any[]
}

export interface UserProfile {
  email: string
  firstName: string
  lastName: string
  document: string
  documentType: string
  phone: string
  corporateName: null
  tradeName: null
  corporateDocument: null
  stateInscription: null
  corporatePhone: null
  isCorporate: boolean
  profileCompleteOnLoading: null
  profileErrorOnLoading: null
  customerClass: null
}
