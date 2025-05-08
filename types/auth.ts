// Updated to match the exact API response structure
export interface User {
  MinimumVersion: string
  Username: string
  Avatar: string
  CoverThemeIndex: number | null
  PhoneNumber: string | null
  Birthday: string | null
  Email: string
  FullName: string
  FirstName: string
  LastName: string
  PronounId: number | null
  IsCustomer: boolean
  IsGuest: boolean
  SuperAdmin: boolean
  Id: string
  RoleId: number
  PreferredChat: string | null
  PhoneNumberConfirmed: boolean
  EmailConfirmed: boolean
  IsBlocked: boolean
  OnBoardCompleted: boolean
  CityId: number | null
  SenderCountryId: string | null
  SenderCountry: any | null
  GiftingCountryId: string
  GiftingCountry: {
    Id: string
    Name: string
    PhoneCode: string
    CurrencyId: string
    StoreCoverage: boolean
    CustomerCoverage: boolean
    IsActiveForCustomer: boolean
    IsSmsAvailable: boolean
  }
  OccasionDatesJson: string | null
  ProfileCompletePercent: number
  Currency: {
    Id: string
    Symbol: string
    ConversionRate: number
    RoundOff: boolean
  }
  Role: {
    Id: number
    Title: string
    CreatedAt: string
    UpdatedAt: string | null
    ShowSalePrice: boolean
    ShowOldCost: boolean
    ShowOrderDetails: boolean
    ShowOrderBasicData: boolean
    ShowOrderMaterials: boolean
    ShowOrderPayments: boolean
    ShowOrderDelivery: boolean
    ShowOrderPicture: boolean
    CanUpdateOrderPicture: boolean
    CanAddMaterial: boolean
    CanUpdateMaterial: boolean
    CanChangeStatusBoard: boolean
    CanSendNotification: boolean
    CanChangeDeadline: boolean
    CanUpdatePromoCodes: boolean
    DisabledPages: any[]
  }
  OccasionDates: any[]
  OccasionCount: number
}

export interface LoginResponse {
  Success: boolean
  Token: string
  RefreshToken: string
  AccessTokenExpiresAt: string
  RefreshTokenExpiresAt: string
  User: User
}
