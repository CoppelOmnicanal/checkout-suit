import { createContext } from 'react'
import { Session, User } from '../../types/user.types'

export interface AuthContextType {
  getUserProfileByEmail: (email: string) => Promise<User | null>
  getSession: () => Promise<Session>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
