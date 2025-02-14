export interface User {
  approved: null
  cartId: number
  coppelId: null
  documentCC: null
  email: string
  empleadocoppel: null
  favoriteAddress: null
  favoriteCard: null
  firebase_id: null
  firstName: string
  hasmargin: null
  message: null
  numberCart: null
  numberCartGuion: string
  numberCartId: null
  numberEmployee: null
  orderformid: string
  passwordReset: null
  profilePicture: null
  profileStatus_Contratos: null
  profileStatus_Direcciones: null
  profileStatus_EstadoDeCuenta: null
  profileStatus_MisDatos: null
  profileStatus_Pedidos: null
  profileStatus_Seguridad: null
  profileStatus_Tarjetas: null
  resetPasswordRequest: null
  subjectCart: string
  sumdescuentoempleado: null
  userId: string
  validatedPhoneCreditCoppel: null
  isCorporate: boolean
  tradeName: null
  rclastcart: string
  rclastcartvalue: number
  rclastsession: string
  rclastsessiondate: Date
  homePhone: string
  phone: string | null
  brandPurchasedTag: Tag
  brandVisitedTag: Tag
  categoryPurchasedTag: Tag
  categoryVisitedTag: Tag
  departmentVisitedTag: Tag
  productPurchasedTag: Tag
  productVisitedTag: Tag
  stateRegistration: null
  lastName: string
  document: string
  isNewsletterOptIn: boolean
  localeDefault: string
  attach: null
  birthDate: null
  businessPhone: null
  carttag: Carttag
  checkouttag: Checkouttag
  corporateDocument: null
  corporateName: null
  documentType: string
  gender: null
  visitedProductWithStockOutSkusTag: Tag
  customerClass: null
  priceTables: null
  birthDateMonth: null
  id: string
  accountId: string
  accountName: string
  dataEntityId: string
  createdBy: null
  createdIn: Date
  updatedBy: string
  updatedIn: Date
  lastInteractionBy: string
  lastInteractionIn: Date
  followers: any[]
  tags: any[]
  auto_filter: null
}

export interface Session {
    id: string
}

export interface Tag {
  DisplayValue: null
  Scores: BrandPurchasedTagScores
}

export interface BrandPurchasedTagScores {}

export interface Carttag {
  DisplayValue: string
  Scores: CarttagScores
}

export interface CarttagScores {
  '74238': The74238[]
}

export interface The74238 {
  Point: number
  Date: Date
  Until: Date
}

export interface Checkouttag {
  DisplayValue: string
  Scores: CheckouttagScores
}

export interface CheckouttagScores {
  Carrinho: The74238[]
  DadosPessoais: The74238[]
  Endereco: The74238[]
  FormaPagamento: The74238[]
}
