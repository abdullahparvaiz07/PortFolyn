import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FileText, Mail, Lock, User, Eye, EyeOff, Sparkles, Shield, AlertCircle } from 'lucide-react'

export default function Login() {
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    setError('')
  }

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

    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  const switchMode = (m) => {
    setMode(m)
    setError('')
    setForm({ name: '', email: '', password: '' })
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0d1117',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glows */}
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #3b82f6, #818cf8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 0 32px rgba(59,130,246,0.35)',
          }}>
            <FileText size={26} color="white" />
          </div>
          <h1 style={{ fontWeight: 900, fontSize: 28, color: '#e6edf3', fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.02em', marginBottom: 6 }}>CVify</h1>
          <p style={{ color: '#8b949e', fontSize: 14 }}>Professional CV Builder</p>
        </div>

        {/* Card */}
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 16, padding: '32px 32px 28px', boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', background: '#0d1117', borderRadius: 10, padding: 4, marginBottom: 28 }}>
            {[['login', 'Sign In'], ['register', 'Create Account']].map(([m, label]) => (
              <button key={m} onClick={() => switchMode(m)} style={{
                flex: 1, padding: '9px 0', borderRadius: 7, border: 'none', cursor: 'pointer',
                fontWeight: 700, fontSize: 14, fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
                background: mode === m ? 'linear-gradient(135deg, #3b82f6, #6366f1)' : 'transparent',
                color: mode === m ? 'white' : '#8b949e',
                boxShadow: mode === m ? '0 2px 8px rgba(59,130,246,0.3)' : 'none',
              }}>
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden', marginBottom: 16 }}>
                  <label className="form-label">Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} color="#484f58" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                    <input className="form-input" placeholder="John Doe" value={form.name} onChange={set('name')} style={{ paddingLeft: 38 }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ marginBottom: 16 }}>
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#484f58" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} style={{ paddingLeft: 38 }} />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#484f58" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input className="form-input" type={showPass ? 'text' : 'password'} placeholder={mode === 'register' ? 'Min. 6 characters' : '••••••••'}
                  value={form.password} onChange={set('password')} style={{ paddingLeft: 38, paddingRight: 42 }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#484f58', padding: 0,
                }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ background: '#2d1010', border: '1px solid #7f1d1d50', borderRadius: 8, padding: '10px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AlertCircle size={15} color="#f87171" />
                  <span style={{ fontSize: 13, color: '#f87171' }}>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" className="btn-primary" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: 15, opacity: loading ? 0.7 : 1 }}>
              {loading ? '...' : mode === 'login' ? <><Sparkles size={16} /> Sign In</> : <><User size={16} /> Create Account</>}
            </button>
          </form>

          {/* Owner hint */}
          {mode === 'login' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              style={{ marginTop: 20, background: '#0f1f3d', border: '1px solid #3b82f630', borderRadius: 10, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <Shield size={15} color="#60a5fa" style={{ marginTop: 1, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#60a5fa', marginBottom: 3 }}>Owner Access</div>
                <div style={{ fontSize: 11.5, color: '#8b949e', lineHeight: 1.6 }}>
                  Email: <span style={{ color: '#c9d1d9' }}>abdullahparvaizofficial@gmail.com</span><br />
                  Password: <span style={{ color: '#c9d1d9' }}>CVify@2026</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#484f58', fontSize: 13, marginTop: 20 }}>
          © 2026 CVify · Built by Abdullah Parvaiz
        </p>
      </motion.div>
    </div>
  )
}
