export interface Material {
  id: number
  title: string
  variantTitle?: string
  brandName: string
  coverPhoto: string
  salesPrice: number
  salesPriceInUsd: number
}

export interface Tag {
  Id: number
  Title: string
}

export interface DeliveryArea {
  Id: number
  Name: string
  CityId?: number
}

export interface MaterialsResponse {
  totalCount: number
  remainingCount: number
  tags: Tag[]
  deliveryAreas: DeliveryArea[]
  materials: Material[]
  __refreshedToken?: string // Special property for token refresh
}
