import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Github, Twitter, Linkedin, Heart, Mail, Phone, User } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#111827', color: '#9ca3af', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FileText size={18} color="white" />
              </div>
              <div style={{ fontWeight: 800, fontSize: 18, color: 'white', lineHeight: 1 }}>CVify</div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#6b7280' }}>
              CVify — Professional CV builder with AI-powered suggestions and ATS-friendly templates.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Product</h4>
            {[{ to: '/builder', label: 'Create CV' }, { to: '/templates', label: 'Templates' }, { to: '/dashboard', label: 'Dashboard' }].map(l => (
              <Link key={l.to} to={l.to} style={{ display: 'block', color: '#9ca3af', textDecoration: 'none', fontSize: 14, marginBottom: 10, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = '#9ca3af'}
              >{l.label}</Link>
            ))}
          </div>

          {/* Features */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Features</h4>
            {['Live Preview', 'PDF Export', 'DOCX Export', 'ATS Checker', 'AI Suggestions'].map(f => (
              <div key={f} style={{ fontSize: 14, color: '#6b7280', marginBottom: 10 }}>{f}</div>
            ))}
          </div>

          {/* Social */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Connect</h4>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: 8, background: '#1f2937',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#9ca3af', transition: 'all 0.2s', textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1f2937'; e.currentTarget.style.color = '#9ca3af' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Author */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Author</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <User size={14} color="#6366f1" />
              <span style={{ fontSize: 14, color: 'white', fontWeight: 600 }}>Abdullah Parvaiz</span>
            </div>
            <a href="mailto:abdullahparvaizofficial@gmail.com" style={{
              display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10,
              color: '#9ca3af', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s',
              wordBreak: 'break-all',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
            >
              <Mail size={13} style={{ marginTop: 2, flexShrink: 0 }} />
              abdullahparvaizofficial@gmail.com
            </a>
            <a href="tel:+923021433046" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              color: '#9ca3af', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
            >
              <Phone size={13} />
              +92 302 143 3046
            </a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1f2937', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 13 }}>© 2026 CVify. All rights reserved.</div>
          <div style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            Built by <span style={{ color: 'white', fontWeight: 600, marginLeft: 4 }}>Abdullah Parvaiz</span>
            &nbsp;·&nbsp; Made with <Heart size={13} color="#ef4444" fill="#ef4444" style={{ margin: '0 4px' }} /> for job seekers
          </div>
        </div>
      </div>
    </footer>
  )
}
