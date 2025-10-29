import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('yazoo_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('yazoo_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API call - replace with real authentication
      const users = JSON.parse(localStorage.getItem('yazoo_users') || '[]')
      const existingUser = users.find(u => u.email === email && u.password === password)
      
      if (existingUser) {
        const userSession = {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          loginTime: new Date().toISOString()
        }
        
        setUser(userSession)
        localStorage.setItem('yazoo_user', JSON.stringify(userSession))
        return { success: true, user: userSession }
      } else {
        return { success: false, error: 'Invalid email or password' }
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' }
    }
  }

  const signup = async (userData) => {
    try {
      const { name, email, password } = userData
      
      // Get existing users
      const users = JSON.parse(localStorage.getItem('yazoo_users') || '[]')
      
      // Check if user already exists
      if (users.find(u => u.email === email)) {
        return { success: false, error: 'User with this email already exists' }
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In real app, this should be hashed
        createdAt: new Date().toISOString()
      }

      // Save to localStorage (simulate database)
      users.push(newUser)
      localStorage.setItem('yazoo_users', JSON.stringify(users))

      // Auto-login after signup
      const userSession = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        loginTime: new Date().toISOString()
      }

      setUser(userSession)
      localStorage.setItem('yazoo_user', JSON.stringify(userSession))
      
      return { success: true, user: userSession }
    } catch (error) {
      return { success: false, error: 'Signup failed. Please try again.' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('yazoo_user')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}