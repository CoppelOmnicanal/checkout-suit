export interface StarProcessPayload {
  fingerprint: null
  callbackUrl: null
  returnUrl: null
  accountName: string
  scope: string
  user: string
}

export interface ValidatePayload {
  login: string
  password: string
}

export type AuthStatus = 'WrongCredentials' | 'Success' | 'BlockedUser' | 'InvalidToken'

export interface ValidateResponse {
  authStatus: AuthStatus
  promptMFA: boolean
  lastAttemptAvailable: null
  clientToken: null
  authCookie: AuthCookie
  accountAuthCookie: AuthCookie
  expiresIn: number
  userId: string
  phoneNumber: null
  scope: null
}

export interface AuthCookie {
  Name: string
  Value: string
}
