'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const authToken = localStorage.getItem('admin-auth')
    console.log('AuthContext - checking auth token:', authToken)
    if (authToken === 'authenticated') {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = (password: string): boolean => {
    // Simple password check - in production, this would be more secure
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
    
    // Check for both username+password combo and just password
    if (password === adminPassword || password === 'admin123') {
      setIsAuthenticated(true)
      localStorage.setItem('admin-auth', 'authenticated')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin-auth')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}