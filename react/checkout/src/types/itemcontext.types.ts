export interface ItemContext {
  Id: number
  ProductId: number
  NameComplete: string
  ComplementName: string
  ProductName: string
  ProductDescription: string
  ProductRefId: string
  TaxCode: string
  SkuName: string
  IsActive: boolean
  IsTransported: boolean
  IsInventoried: boolean
  IsGiftCardRecharge: boolean
  ImageUrl: string
  DetailUrl: string
  CSCIdentification: null
  BrandId: string
  BrandName: string
  IsBrandActive: boolean
  Dimension: Dimension
  RealDimension: RealDimension
  ManufacturerCode: string
  IsKit: boolean
  KitItems: any[]
  Services: any[]
  Categories: any[]
  CategoriesFullPath: string[]
  Attachments: any[]
  Collections: any[]
  SkuSellers: SkuSeller[]
  SalesChannels: number[]
  Images: Image[]
  Videos: any[]
  SkuSpecifications: any[]
  ProductSpecifications: ProductSpecification[]
  ProductClustersIds: string
  PositionsInClusters: { [key: string]: number }
  ProductClusterNames: { [key: string]: string }
  ProductClusterHighlights: { [key: string]: string }
  ProductCategoryIds: string
  IsDirectCategoryActive: boolean
  ProductGlobalCategoryId: null
  ProductCategories: { [key: string]: string }
  CommercialConditionId: number
  RewardValue: number
  AlternateIds: AlternateIDS
  AlternateIdValues: string[]
  EstimatedDateArrival: null
  MeasurementUnit: string
  UnitMultiplier: number
  InformationSource: string
  ModalType: null
  KeyWords: string
  ReleaseDate: Date
  ProductIsVisible: boolean
  ShowIfNotAvailable: boolean
  IsProductActive: boolean
  ProductFinalScore: number
}

export interface AlternateIDS {
  RefId: string
}

export interface Dimension {
  cubicweight: number
  height: number
  length: number
  weight: number
  width: number
}

export interface Image {
  ImageUrl: string
  ImageName: string
  FileId: number
}

export interface ProductSpecification {
  FieldId: number
  FieldName: string
  FieldValueIds: number[]
  FieldValues: string[]
  IsFilter: boolean
  FieldGroupId: number
  FieldGroupName: string
}

export interface RealDimension {
  realCubicWeight: number
  realHeight: number
  realLength: number
  realWeight: number
  realWidth: number
}

export interface SkuSeller {
  SellerId: string
  StockKeepingUnitId: number
  SellerStockKeepingUnitId: string
  IsActive: boolean
  FreightCommissionPercentage: number
  ProductCommissionPercentage: number
}

export enum CuotesGateway {
  OneS = '1s',
  ThreeS = '3s',
  SixS = '6s',
  NineS = '9s',
  TwelveS = '12s',
  OneSpa = '1spa',
  ThreeSpa = '3spa',
  SixSpa = '6spa',
  NineSpa = '9spa',
  TwelveSpa = '12spa',
  FifteenSpa = '15spa',
  OneSmp = '1smp',
  ThreeSmp = '3smp',
  SixSmp = '6smp',
  NineSmp = '9smp',
  TwelveSmp = '12smp',
}

export enum Gateways {
  S = 's',
  Spa = 'spa',
  Smp = 'smp',
}

export type ComercialCondition = {
  id: CuotesGateway
  gateway: Gateways
}

export const COMERCIAL_CONDITIONS: Record<number, ComercialCondition> = {
  512: { id: CuotesGateway.OneS, gateway: Gateways.S },
  538: { id: CuotesGateway.ThreeS, gateway: Gateways.S },
  514: { id: CuotesGateway.SixS, gateway: Gateways.S },
  515: { id: CuotesGateway.NineS, gateway: Gateways.S },
  516: { id: CuotesGateway.TwelveS, gateway: Gateways.S },
  517: { id: CuotesGateway.OneSpa, gateway: Gateways.Spa },
  537: { id: CuotesGateway.ThreeSpa, gateway: Gateways.Spa },
  520: { id: CuotesGateway.SixSpa, gateway: Gateways.Spa },
  521: { id: CuotesGateway.NineSpa, gateway: Gateways.Spa },
  522: { id: CuotesGateway.TwelveSpa, gateway: Gateways.Spa },
  570: { id: CuotesGateway.FifteenSpa, gateway: Gateways.Spa },
  525: { id: CuotesGateway.OneSmp, gateway: Gateways.Smp },
  526: { id: CuotesGateway.ThreeSmp, gateway: Gateways.Smp },
  527: { id: CuotesGateway.SixSmp, gateway: Gateways.Smp },
  528: { id: CuotesGateway.NineSmp, gateway: Gateways.Smp },
  529: { id: CuotesGateway.TwelveSmp, gateway: Gateways.Smp },
}

export const COMERCIAL_CONDITIONS_SKU: Record<CuotesGateway, string> = {
  [CuotesGateway.OneS]: '70531',
  [CuotesGateway.ThreeS]: '70532',
  [CuotesGateway.SixS]: '70533',
  [CuotesGateway.NineS]: '70534',
  [CuotesGateway.TwelveS]: '70535',
  [CuotesGateway.OneSpa]: '70493',
  [CuotesGateway.ThreeSpa]: '70494',
  [CuotesGateway.SixSpa]: '70495',
  [CuotesGateway.NineSpa]: '70496',
  [CuotesGateway.TwelveSpa]: '70501',
  [CuotesGateway.FifteenSpa]: '72069',
  [CuotesGateway.OneSmp]: '70536',
  [CuotesGateway.ThreeSmp]: '70537',
  [CuotesGateway.SixSmp]: '70538',
  [CuotesGateway.NineSmp]: '70539',
  [CuotesGateway.TwelveSmp]: '70540',
}
