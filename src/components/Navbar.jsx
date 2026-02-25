import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FileText, LayoutTemplate, LayoutDashboard, Menu, X, Sparkles, LogOut, Crown, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const links = [
    { to: '/templates', label: 'Templates', icon: <LayoutTemplate size={16} /> },
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
    setUserMenuOpen(false)
  }

  return (
    <nav style={{
      background: 'rgba(13,17,23,0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #30363d',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64,
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #3b82f6, #818cf8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(59,130,246,0.35)',
          }}>
            <FileText size={18} color="white" />
          </div>
          <div style={{ fontWeight: 800, fontSize: 20, color: '#e6edf3', lineHeight: 1, letterSpacing: '-0.02em' }}>CVify</div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          {links.map(link => (
            <Link key={link.to} to={link.to} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 8, textDecoration: 'none',
              fontSize: 14, fontWeight: 500,
              color: location.pathname === link.to ? '#60a5fa' : '#8b949e',
              background: location.pathname === link.to ? '#1e3a5f' : 'transparent',
              border: location.pathname === link.to ? '1px solid #3b82f630' : '1px solid transparent',
              transition: 'all 0.2s ease',
            }}>
              {link.icon} {link.label}
            </Link>
          ))}

          <Link to="/builder" style={{ textDecoration: 'none', marginLeft: 4 }}>
            <button className="btn-primary"><Sparkles size={15} /> Create CV</button>
          </Link>

          {/* User Avatar Menu */}
          {user && (
            <div style={{ position: 'relative', marginLeft: 8 }}>
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#1c2333', border: '1px solid #30363d', borderRadius: 10,
                padding: '6px 10px 6px 6px', cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f650'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#30363d'}
              >
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: user.role === 'owner'
                    ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                    : 'linear-gradient(135deg, #3b82f6, #818cf8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 800, color: 'white',
                }}>
                  {user.role === 'owner' ? <Crown size={14} /> : user.avatar}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#e6edf3', lineHeight: 1 }}>{user.name.split(' ')[0]}</div>
                  {user.role === 'owner' && (
                    <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 600, marginTop: 2 }}>Owner</div>
                  )}
                </div>
                <ChevronDown size={14} color="#8b949e" />
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div style={{
                  position: 'absolute', top: '110%', right: 0, minWidth: 220,
                  background: '#161b22', border: '1px solid #30363d', borderRadius: 12,
                  boxShadow: '0 16px 48px rgba(0,0,0,0.5)', padding: '8px', zIndex: 200,
                }}>
                  {/* Profile info */}
                  <div style={{ padding: '10px 12px 12px', borderBottom: '1px solid #21262d', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                        background: user.role === 'owner'
                          ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                          : 'linear-gradient(135deg, #3b82f6, #818cf8)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 16, fontWeight: 800, color: 'white',
                      }}>
                        {user.role === 'owner' ? <Crown size={16} /> : user.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#e6edf3' }}>{user.name}</div>
                        <div style={{ fontSize: 12, color: '#8b949e', marginTop: 2 }}>{user.email}</div>
                      </div>
                    </div>
                    {user.role === 'owner' && (
                      <div style={{ marginTop: 10, background: '#1a1200', border: '1px solid #f59e0b30', borderRadius: 7, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Crown size={12} color="#f59e0b" />
                        <span style={{ fontSize: 11.5, color: '#f59e0b', fontWeight: 600 }}>Owner · Full Access</span>
                      </div>
                    )}
                  </div>

                  <button onClick={handleLogout} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: 'transparent', color: '#f87171', fontWeight: 600, fontSize: 14,
                    fontFamily: 'Inter, sans-serif', transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = '#2d1010'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="btn-ghost" style={{ display: 'none', padding: '8px' }} id="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#161b22', borderTop: '1px solid #30363d', padding: '12px 24px 16px' }}>
          {links.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0',
              textDecoration: 'none', fontSize: 15, fontWeight: 500,
              color: '#8b949e', borderBottom: '1px solid #21262d',
            }}>
              {link.icon} {link.label}
            </Link>
          ))}
          <Link to="/builder" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>
              <Sparkles size={15} /> Create CV
            </button>
          </Link>
          {user && (
            <button onClick={handleLogout} className="btn-ghost" style={{ marginTop: 8, width: '100%', justifyContent: 'center', color: '#f87171' }}>
              <LogOut size={15} /> Sign Out
            </button>
          )}
        </div>
      )}

      {/* Close user menu on outside click */}
      {userMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 199 }} onClick={() => setUserMenuOpen(false)} />
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
