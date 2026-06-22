import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser, login as authLogin, logout as authLogout, register as authRegister } from '../utils/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser())

  useEffect(() => {
    const refresh = () => setUser(getCurrentUser())
    window.addEventListener('auth-changed', refresh)
    return () => window.removeEventListener('auth-changed', refresh)
  }, [])

  const login = async (data) => {
    const u = authLogin(data)
    setUser(u)
    return u
  }

  const register = async (data) => {
    const u = authRegister(data)
    setUser(u)
    return u
  }

  const logout = () => {
    authLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
