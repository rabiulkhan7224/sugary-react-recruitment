export interface User {
    username: string
    fullName: string
    email: string
    avatar: string
    role: {
      id: number
      title: string
    }
    giftingCountry: {
      id: string
      name: string
    }
    currency: {
      id: string
      symbol: string
    }
  }
  
  export interface LoginResponse {
    success: boolean
    token: string
    refreshToken: string
    accessTokenExpiresAt: string
    refreshTokenExpiresAt: string
    user: User
  }