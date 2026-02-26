import React, { createContext, useContext, useState, useEffect } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider, githubProvider, isFirebaseConfigured } from '../config/firebase'

// ── Pre-seeded owner account ───────────────────────────────────────────────────
const OWNER_ACCOUNT = {
  id: 'owner',
  name: 'Abdullah Parvaiz',
  email: 'abdullahparvaizofficial@gmail.com',
  password: 'PortFolyn@2026',
  role: 'owner',
  avatar: 'AP',
}

const USERS_KEY  = 'portfolyn_users'
const SESSION_KEY = 'portfolyn_session'

function getUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY)
    const users  = stored ? JSON.parse(stored) : []
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
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session
  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY)
      if (session) {
        const parsed = JSON.parse(session)
        const found  = getUsers().find(u => u.id === parsed.id)
        // For OAuth users (no id in local list), just restore from session
        if (found || parsed.provider) setUser(parsed)
      }
    } catch {}
    setLoading(false)
  }, [])

  // ── Persist session helper ─────────────────────────────────────────────────
  const persist = (sessionUser) => {
    setUser(sessionUser)
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
  }

  // ── Email / password login ─────────────────────────────────────────────────
  const login = (email, password) => {
    const users = getUsers()
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) return { success: false, error: 'Invalid email or password.' }
    const sessionUser = {
      id: found.id, name: found.name, email: found.email,
      role: found.role, avatar: found.avatar || found.name.charAt(0).toUpperCase(),
    }
    persist(sessionUser)
    return { success: true }
  }

  // ── Register ───────────────────────────────────────────────────────────────
  const register = (name, email, password) => {
    const users = getUsers()
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      return { success: false, error: 'An account with this email already exists.' }

    const newUser = {
      id:       Date.now().toString(),
      name, email, password,
      role:     'user',
      avatar:   name.charAt(0).toUpperCase(),
    }
    users.push(newUser)
    saveUsers(users)
    persist({ id: newUser.id, name, email, role: 'user', avatar: newUser.avatar })
    return { success: true }
  }

  // ── Google OAuth ───────────────────────────────────────────────────────────
  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured)
      return { success: false, error: 'Firebase is not configured. See .env.local file.' }
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const fu     = result.user
      const sessionUser = {
        id:       fu.uid,
        name:     fu.displayName || 'Google User',
        email:    fu.email,
        photo:    fu.photoURL,
        avatar:   (fu.displayName || 'G').charAt(0).toUpperCase(),
        role:     'user',
        provider: 'google',
      }
      persist(sessionUser)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message || 'Google sign-in failed.' }
    }
  }

  // ── GitHub OAuth ───────────────────────────────────────────────────────────
  const loginWithGithub = async () => {
    if (!isFirebaseConfigured)
      return { success: false, error: 'Firebase is not configured. See .env.local file.' }
    try {
      const result = await signInWithPopup(auth, githubProvider)
      const fu     = result.user
      const sessionUser = {
        id:       fu.uid,
        name:     fu.displayName || fu.email?.split('@')[0] || 'GitHub User',
        email:    fu.email,
        photo:    fu.photoURL,
        avatar:   (fu.displayName || 'G').charAt(0).toUpperCase(),
        role:     'user',
        provider: 'github',
      }
      persist(sessionUser)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message || 'GitHub sign-in failed.' }
    }
  }

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = () => {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
    if (isFirebaseConfigured && auth?.currentUser) auth.signOut().catch(() => {})
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, loginWithGithub, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
