import { createContext } from 'react'
import { AuthApi } from '../../api/auth.api'
import { User } from '../../types'
import { LoginFormType } from '../../components/login'

export interface AuthContextType {
  authApi: AuthApi
  setUserLogged: React.Dispatch<React.SetStateAction<boolean>>
  login: (data: LoginFormType, charge: (percentage: number) => void) => Promise<'WrongCredentials' | 'BlockedUser' | 'InvalidToken' | User>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
