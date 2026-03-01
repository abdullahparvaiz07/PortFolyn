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
      background: 'rgba(13,13,20,0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #2d2a4a',
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
            background: 'linear-gradient(135deg, #7c3aed, #fbbf24)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 18px rgba(124,58,237,0.45)',
          }}>
            <FileText size={18} color="white" />
          </div>
          <div className="navbar-logo-text" style={{ fontWeight: 800, fontSize: 20, color: '#ede9fe', lineHeight: 1, letterSpacing: '-0.02em' }}>PortFolyn</div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          {links.map(link => (
            <Link key={link.to} to={link.to} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 8, textDecoration: 'none',
              fontSize: 14, fontWeight: 500,
              color: location.pathname === link.to ? '#c4b5fd' : '#9b959e',
              background: location.pathname === link.to ? '#2e1065' : 'transparent',
              border: location.pathname === link.to ? '1px solid #7c3aed30' : '1px solid transparent',
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
                background: '#1a1730', border: '1px solid #2d2a4a', borderRadius: 10,
                padding: '6px 10px 6px 6px', cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#7c3aed50'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#2d2a4a'}
              >
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: user.role === 'owner'
                    ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                    : 'linear-gradient(135deg, #7c3aed, #fbbf24)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 800, color: 'white',
                }}>
                  {user.role === 'owner' ? <Crown size={14} /> : user.avatar}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#ede9fe', lineHeight: 1 }}>{user.name.split(' ')[0]}</div>
                  {user.role === 'owner' && (
                    <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 600, marginTop: 2 }}>Owner</div>
                  )}
                </div>
                <ChevronDown size={14} color="#9b959e" />
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div style={{
                  position: 'absolute', top: '110%', right: 0, minWidth: 220,
                  background: '#13111e', border: '1px solid #2d2a4a', borderRadius: 12,
                  boxShadow: '0 16px 48px rgba(0,0,0,0.6)', padding: '8px', zIndex: 200,
                }}>
                  <div style={{ padding: '10px 12px 12px', borderBottom: '1px solid #201d36', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                        background: user.role === 'owner'
                          ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                          : 'linear-gradient(135deg, #7c3aed, #fbbf24)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 16, fontWeight: 800, color: 'white',
                      }}>
                        {user.role === 'owner' ? <Crown size={16} /> : user.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#ede9fe' }}>{user.name}</div>
                        <div style={{ fontSize: 12, color: '#9b959e', marginTop: 2 }}>{user.email}</div>
                      </div>
                    </div>
                    {user.role === 'owner' && (
                      <div style={{ marginTop: 10, background: '#1a0a00', border: '1px solid #f59e0b30', borderRadius: 7, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
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
        <div style={{ background: '#13111e', borderTop: '1px solid #2d2a4a', padding: '12px 24px 16px' }}>
          {links.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0',
              textDecoration: 'none', fontSize: 15, fontWeight: 500,
              color: '#9b959e', borderBottom: '1px solid #201d36',
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

      {userMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 199 }} onClick={() => setUserMenuOpen(false)} />
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
