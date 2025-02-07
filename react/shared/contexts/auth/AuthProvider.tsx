import React, { useContext } from 'react'
import { SingleProvider } from '../../types'
import { AuthContext, AuthContextType } from './AuthContext'
import { HttpMethods } from '../../services/http.service'
import { AuthApi } from '../../api/auth.api'

const AuthProvider: SingleProvider = ({ children }) => {
  const http = new HttpMethods()
  const authApi = new AuthApi(http)

  const getUserProfileByEmail = async (email: string) => {
    if (!email) {
      return null
    }

    try {
      const [user] = await authApi.getByEmail(email)
      if (user) {
        return user
      }
    } catch (error) {
      console.log('🚀 ~ getUserProfileByEmail ~ error:', error)
    }
    return null
  }

  const getSession = async () => {
    const session = await authApi.getSession()
    return session
  }

  const data: AuthContextType = {
    getUserProfileByEmail,
    getSession,
  }

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
