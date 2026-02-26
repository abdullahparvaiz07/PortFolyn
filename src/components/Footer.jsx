import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Github, Twitter, Linkedin, Heart, Mail, Phone, User } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#0d0d14', color: '#9b959e', marginTop: 'auto', borderTop: '1px solid #2d2a4a' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px,5vw,56px) clamp(16px,4vw,32px) 24px' }}>

        {/* Main grid — collapses to 2 col on tablet, 1 col on mobile */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
          gap: 'clamp(24px, 4vw, 40px)',
          marginBottom: 36,
        }}>

          {/* Brand — spans full width on small screens */}
          <div className="footer-col" style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                background: 'linear-gradient(135deg, #7c3aed, #fbbf24)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FileText size={17} color="white" />
              </div>
              <div style={{ fontWeight: 800, fontSize: 17, color: 'white', lineHeight: 1 }}>PortFolyn</div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: '#6b6880', maxWidth: 220 }}>
              Professional CV builder with AI-powered suggestions and ATS-friendly templates.
            </p>
            {/* Social icons */}
            <div className="footer-social" style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 34, height: 34, borderRadius: 8, background: '#1a1730',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#6b6880', transition: 'all 0.2s', textDecoration: 'none',
                  border: '1px solid #2d2a4a',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#7c3aed'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#7c3aed' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1a1730'; e.currentTarget.style.color = '#6b6880'; e.currentTarget.style.borderColor = '#2d2a4a' }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="footer-col">
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: 13, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Product</h4>
            {[{ to: '/builder', label: 'Create CV' }, { to: '/templates', label: 'Templates' }, { to: '/dashboard', label: 'Dashboard' }].map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block', color: '#6b6880', textDecoration: 'none',
                fontSize: 14, marginBottom: 10, transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = '#c4b5fd'}
                onMouseLeave={e => e.target.style.color = '#6b6880'}
              >{l.label}</Link>
            ))}
          </div>

          {/* Features */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: 13, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Features</h4>
            {['Live Preview', 'PDF Export', 'ATS Checker', 'AI Suggestions', 'Google/GitHub Login'].map(f => (
              <div key={f} style={{ fontSize: 14, color: '#6b6880', marginBottom: 10 }}>{f}</div>
            ))}
          </div>

          {/* Author */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: 13, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Author</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                background: 'linear-gradient(135deg, #7c3aed, #fbbf24)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, color: 'white',
              }}>AP</div>
              <span style={{ fontSize: 14, color: 'white', fontWeight: 600 }}>Abdullah Parvaiz</span>
            </div>
            <a href="mailto:abdullahparvaizofficial@gmail.com" style={{
              display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10,
              color: '#6b6880', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s',
              wordBreak: 'break-all',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
              onMouseLeave={e => e.currentTarget.style.color = '#6b6880'}
            >
              <Mail size={13} style={{ marginTop: 2, flexShrink: 0 }} />
              abdullahparvaizofficial@gmail.com
            </a>
            <a href="tel:+923021433046" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              color: '#6b6880', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
              onMouseLeave={e => e.currentTarget.style.color = '#6b6880'}
            >
              <Phone size={13} />
              +92 302 143 3046
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{
          borderTop: '1px solid #2d2a4a', paddingTop: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 10,
        }}>
          <div style={{ fontSize: 12, color: '#4a4560' }}>© 2026 PortFolyn. All rights reserved.</div>
          <div style={{ fontSize: 12, color: '#4a4560', display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
            Built by <span style={{ color: '#c4b5fd', fontWeight: 600, margin: '0 3px' }}>Abdullah Parvaiz</span>
            &nbsp;·&nbsp; Made with <Heart size={12} color="#ef4444" fill="#ef4444" style={{ margin: '0 3px' }} /> for job seekers
          </div>
        </div>
      </div>
    </footer>
  )
}
