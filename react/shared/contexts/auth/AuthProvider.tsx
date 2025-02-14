import React, { useContext, useState } from 'react'
import { SingleProvider } from '../../types'
import { AuthContext, AuthContextType } from './AuthContext'
import { HttpMethods } from '../../services/http.service'
import { AuthApi } from '../../api/auth.api'
import { LoginFormType } from '../../components/login'

const AuthProvider: SingleProvider = ({ children }) => {
  const http = new HttpMethods()
  const api = new AuthApi(http)
  const [userLogged, setUserLogged] = useState(false)

  const login = async (data: LoginFormType, charge: (percentage: number) => void) => {
    const { email } = data
    charge(5)

    if (userLogged) {
      charge(10)
      await api.logout()
    }

    await api.startProcess(email)
    const status = await api.validate(data)
    charge(15)

    if (status === 'Success') {
      const [user] = await api.getByEmail(email)
      setUserLogged(!!user)
      charge(30)
      return user
    }

    return status
  }

  const data: AuthContextType = {
    authApi: api,
    setUserLogged,
    login,
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
