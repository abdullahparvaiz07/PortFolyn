import React, { createContext, useContext, useState, useEffect } from 'react'

// ── Pre-seeded accounts ────────────────────────────────────────────────────────
// Owner account — Abdullah Parvaiz
// Regular users can register and their accounts are saved to localStorage
const OWNER_ACCOUNT = {
  id: 'owner',
  name: 'Abdullah Parvaiz',
  email: 'abdullahparvaizofficial@gmail.com',
  password: 'PortFolyn@2026',   // owner's pre-set password
  role: 'owner',
  avatar: 'AP',
}

const USERS_KEY = 'cvify_users'
const SESSION_KEY = 'cvify_session'

function getUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY)
    const users = stored ? JSON.parse(stored) : []
    // Always ensure owner exists
    if (!users.find(u => u.id === 'owner')) {
      users.unshift(OWNER_ACCOUNT)
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
    }
    return users
  } catch {
    return [OWNER_ACCOUNT]
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session on mount
  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY)
      if (session) {
        const parsed = JSON.parse(session)
        // Verify user still exists
        const users = getUsers()
        const found = users.find(u => u.id === parsed.id)
        if (found) setUser({ id: found.id, name: found.name, email: found.email, role: found.role, avatar: found.avatar })
      }
    } catch {}
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const users = getUsers()
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!found) return { success: false, error: 'Invalid email or password.' }
    const sessionUser = { id: found.id, name: found.name, email: found.email, role: found.role, avatar: found.avatar || found.name.charAt(0).toUpperCase() }
    setUser(sessionUser)
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
    return { success: true }
  }

  const register = (name, email, password) => {
    const users = getUsers()
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' }
    }
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'user',
      avatar: name.charAt(0).toUpperCase(),
    }
    users.push(newUser)
    saveUsers(users)
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, avatar: newUser.avatar }
    setUser(sessionUser)
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
