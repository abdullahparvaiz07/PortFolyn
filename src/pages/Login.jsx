import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { FileText, Mail, Lock, User, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react'
import { isFirebaseConfigured } from '../config/firebase'

// Google SVG icon
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
)

// GitHub SVG icon
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

export default function Login() {
  const { login, register, loginWithGoogle, loginWithGithub } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [mode,     setMode]     = useState('login')
  const [form,     setForm]     = useState({ name: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [oauthLoading, setOauthLoading] = useState(null) // 'google' | 'github' | null

  const set = (field) => (e) => { setForm(f => ({ ...f, [field]: e.target.value })); setError('') }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    let result
    if (mode === 'login') {
      if (!form.email || !form.password) { setError('Please fill in all fields.'); setLoading(false); return }
      result = login(form.email, form.password)
    } else {
      if (!form.name || !form.email || !form.password) { setError('Please fill in all fields.'); setLoading(false); return }
      if (form.password.length < 6) { setError('Password must be at least 6 characters.'); setLoading(false); return }
      result = register(form.name, form.email, form.password)
    }
    if (result.success) navigate(from, { replace: true })
    else setError(result.error)
    setLoading(false)
  }

  const handleOAuth = async (provider) => {
    setOauthLoading(provider)
    setError('')
    const fn = provider === 'google' ? loginWithGoogle : loginWithGithub
    const result = await fn()
    if (result.success) navigate(from, { replace: true })
    else setError(result.error)
    setOauthLoading(null)
  }

  const switchMode = (m) => { setMode(m); setError(''); setForm({ name: '', email: '', password: '' }) }

  return (
    <div style={{
      minHeight: '100vh', background: '#0d0d14',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glows */}
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #7c3aed, #fbbf24)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
            boxShadow: '0 0 32px rgba(124,58,237,0.4)',
          }}>
            <FileText size={26} color="white" />
          </div>
          <h1 style={{ fontWeight: 900, fontSize: 28, color: '#ede9fe', fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.02em', marginBottom: 6 }}>PortFolyn</h1>
          <p style={{ color: '#9b959e', fontSize: 14 }}>Professional CV Builder</p>
        </div>

        {/* Card */}
        <div style={{ background: '#13111e', border: '1px solid #2d2a4a', borderRadius: 16, padding: '28px 28px 24px', boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}>

          {/* Mode Tabs */}
          <div style={{ display: 'flex', background: '#0d0d14', borderRadius: 10, padding: 4, marginBottom: 24 }}>
            {[['login', 'Sign In'], ['register', 'Create Account']].map(([m, label]) => (
              <button key={m} onClick={() => switchMode(m)} style={{
                flex: 1, padding: '9px 0', borderRadius: 7, border: 'none', cursor: 'pointer',
                fontWeight: 700, fontSize: 14, fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
                background: mode === m ? 'linear-gradient(135deg, #7c3aed, #fbbf24)' : 'transparent',
                color: mode === m ? 'white' : '#9b959e',
                boxShadow: mode === m ? '0 2px 8px rgba(124,58,237,0.35)' : 'none',
              }}>{label}</button>
            ))}
          </div>

          {/* ── Social OAuth Buttons ─────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>

            {/* Google */}
            <button
              onClick={() => handleOAuth('google')}
              disabled={!!oauthLoading}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '11px 16px', borderRadius: 10, border: '1px solid #2d2a4a',
                background: '#1a1730', color: '#ede9fe', fontWeight: 600, fontSize: 14,
                fontFamily: 'Inter, sans-serif', cursor: oauthLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', opacity: oauthLoading && oauthLoading !== 'google' ? 0.5 : 1,
              }}
              onMouseEnter={e => { if (!oauthLoading) e.currentTarget.style.borderColor = '#7c3aed50' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2d2a4a' }}
            >
              {oauthLoading === 'google'
                ? <span style={{ width: 18, height: 18, border: '2px solid #2d2a4a', borderTopColor: '#7c3aed', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                : <GoogleIcon />
              }
              {mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
            </button>

            {/* GitHub */}
            <button
              onClick={() => handleOAuth('github')}
              disabled={!!oauthLoading}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '11px 16px', borderRadius: 10, border: '1px solid #2d2a4a',
                background: '#1a1730', color: '#ede9fe', fontWeight: 600, fontSize: 14,
                fontFamily: 'Inter, sans-serif', cursor: oauthLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', opacity: oauthLoading && oauthLoading !== 'github' ? 0.5 : 1,
              }}
              onMouseEnter={e => { if (!oauthLoading) e.currentTarget.style.borderColor = '#7c3aed50' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2d2a4a' }}
            >
              {oauthLoading === 'github'
                ? <span style={{ width: 18, height: 18, border: '2px solid #2d2a4a', borderTopColor: '#7c3aed', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                : <GithubIcon />
              }
              {mode === 'login' ? 'Sign in with GitHub' : 'Sign up with GitHub'}
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: '#2d2a4a' }} />
            <span style={{ color: '#4a4560', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: '#2d2a4a' }} />
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden', marginBottom: 14 }}>
                  <label className="form-label">Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} color="#4a4560" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                    <input className="form-input" placeholder="John Doe" value={form.name} onChange={set('name')} style={{ paddingLeft: 38 }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ marginBottom: 14 }}>
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#4a4560" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} style={{ paddingLeft: 38 }} />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#4a4560" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input className="form-input" type={showPass ? 'text' : 'password'}
                  placeholder={mode === 'register' ? 'Min. 6 characters' : '••••••••'}
                  value={form.password} onChange={set('password')} style={{ paddingLeft: 38, paddingRight: 42 }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#4a4560', padding: 0,
                }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ background: '#2d1010', border: '1px solid #7f1d1d50', borderRadius: 8, padding: '10px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AlertCircle size={15} color="#f87171" />
                  <span style={{ fontSize: 13, color: '#f87171' }}>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" className="btn-primary" disabled={loading || !!oauthLoading}
              style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: 15, opacity: loading ? 0.7 : 1 }}>
              {loading ? '...' : mode === 'login'
                ? <><Sparkles size={16} /> Sign In</>
                : <><User size={16} /> Create Account</>
              }
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#4a4560', fontSize: 13, marginTop: 20 }}>
          © 2026 PortFolyn · Built by Abdullah Parvaiz
        </p>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
