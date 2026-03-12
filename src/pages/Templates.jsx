import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCVStore } from '../store/cvStore'
import { CheckCircle, ArrowRight, Palette } from 'lucide-react'

const TEMPLATES = [
  { id: 'modern-minimal', name: 'Modern Minimal', color: '#3b82f6', bg: '#1e3a5f',
    tags: ['Clean', 'ATS', 'Popular'],
    desc: 'A sleek, contemporary design perfect for tech and creative professionals.',
    accent: '#60a5fa', photo: '/avatar1.png',
  },
  { id: 'corporate-executive', name: 'Corporate Executive', color: '#60a5fa', bg: '#1a2e5a',
    tags: ['Professional', 'ATS', 'Sidebar'],
    desc: 'Two-column layout with sidebar — ideal for senior roles and corporate positions.',
    accent: '#93c5fd', photo: '/avatar2.png',
  },
  { id: 'academic-research', name: 'Academic Research', color: '#34d399', bg: '#064e3b',
    tags: ['Academic', 'Serif', 'Classic'],
    desc: 'Scholarly serif typography with a centered header — perfect for academia.',
    accent: '#6ee7b7', photo: '/avatar1.png',
  },
  { id: 'tech-professional', name: 'Tech Professional', color: '#22d3ee', bg: '#0f2d3d',
    tags: ['Dark Mode', 'Code Style', 'Terminal'],
    desc: 'Dark terminal-inspired theme with code-comment headers. Built for developers.',
    accent: '#67e8f9', photo: '/avatar2.png',
  },
  { id: 'elegant-classic', name: 'Elegant Classic', color: '#c9973a', bg: '#2a1f0a',
    tags: ['Serif', 'Formal', 'Gold'],
    desc: 'Timeless serif typography with decorative double-line borders and gold accents.',
    accent: '#e4b96a', photo: '/avatar3.png',
  },
  { id: 'golden-pro', name: 'Golden Pro', color: '#d4a017', bg: '#1a1400',
    tags: ['Bold', 'Graphic', '3-Column'],
    desc: 'Sharp black & white layout with gold accents. Eye-catching 3-column bottom section.',
    accent: '#f0c040', photo: '/avatar1.png',
  },
  { id: 'vintage-muse', name: 'Vintage Muse', color: '#c4956a', bg: '#2d2018',
    tags: ['Elegant', 'Serif', 'Earthy'],
    desc: 'Warm beige editorial design with arched photo and artistic typography.',
    accent: '#e8c49a', photo: '/avatar3.png',
  },
  { id: 'blue-sidebar', name: 'Blue Sidebar', color: '#0d3b5e', bg: '#061a2e',
    tags: ['Sidebar', 'Professional', 'Bold'],
    desc: 'Dark teal sidebar with photo and contact info, clean white main content area.',
    accent: '#29b6d4', photo: '/avatar2.png',
  },
]

function TemplateThumbnail({ template }) {
  const isDark = ['tech-professional'].includes(template.id)
  const isWarm = template.id === 'vintage-muse'
  const isSidebar = ['corporate-executive', 'blue-sidebar'].includes(template.id)
  const bgBase = isDark ? '#0a1120' : isWarm ? '#2d2018' : '#161b22'
  const lineColor = 'rgba(255,255,255,0.22)'
  const strongLine = 'rgba(255,255,255,0.65)'
  const accentLine = template.color

  return (
    <div style={{ width: '100%', paddingBottom: '132%', position: 'relative', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: bgBase }}>

        {/* ── Header bar ── */}
        <div style={{
          position: 'absolute', top: 0,
          left: 0, right: isSidebar ? 'auto' : 0,
          width: isSidebar ? '36%' : '100%',
          height: isSidebar ? '100%' : '32%',
          background: template.id === 'neon-futuristic'
            ? 'linear-gradient(135deg, #0d0d2b 60%, #1a0030)'
            : template.color,
          borderRight: isSidebar ? `1px solid ${template.color}55` : 'none',
          borderBottom: template.id === 'neon-futuristic' ? `2px solid ${template.color}` : 'none',
          opacity: 0.95,
        }} />

        {/* ── Profile photo ── */}
        <div style={{
          position: 'absolute',
          top: isSidebar ? 12 : '7%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: isSidebar ? 36 : 40,
          height: isSidebar ? 36 : 40,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `2px solid rgba(255,255,255,0.7)`,
          boxShadow: `0 2px 10px rgba(0,0,0,0.5)`,
          zIndex: 3,
        }}>
          <img src={template.photo} alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
        </div>

        {/* ── Sidebar column (Corporate Executive) ── */}
        {isSidebar && (
          <div style={{ position: 'absolute', top: 56, left: 0, width: '36%', padding: '0 6px' }}>
            <div style={{ height: 4, width: '60%', background: strongLine, borderRadius: 2, margin: '0 auto 3px' }} />
            <div style={{ height: 3, width: '80%', background: lineColor, borderRadius: 2, margin: '0 auto 3px' }} />
            <div style={{ height: 3, width: '70%', background: lineColor, borderRadius: 2, margin: '0 auto 10px' }} />
            <div style={{ height: 4, width: '55%', background: accentLine, borderRadius: 2, opacity: 0.8, margin: '0 auto 5px' }} />
            {[1,2,3,4].map(i => (
              <div key={i} style={{ height: 8, background: `${accentLine}40`, borderRadius: 4, marginBottom: 4, width: `${[90,75,85,65][i-1]}%` }} />
            ))}
          </div>
        )}

        {/* ── Main content area ── */}
        <div style={{
          position: 'absolute',
          top: isSidebar ? 10 : '34%',
          left: isSidebar ? '38%' : 10,
          right: 10,
          bottom: 8,
        }}>
          {!isSidebar && (
            <>
              <div style={{ height: 6, width: '65%', background: strongLine, borderRadius: 3, marginBottom: 4 }} />
              <div style={{ height: 3, width: '45%', background: `${accentLine}cc`, borderRadius: 2, marginBottom: 10 }} />
            </>
          )}

          {/* EXPERIENCE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
            <div style={{ height: 3, width: 3, borderRadius: '50%', background: accentLine }} />
            <div style={{ height: 4, width: 42, background: accentLine, borderRadius: 2, opacity: 0.9 }} />
            <div style={{ flex: 1, height: 1, background: `${accentLine}40` }} />
          </div>
          <div style={{ height: 4, width: '80%', background: strongLine, borderRadius: 2, marginBottom: 3 }} />
          <div style={{ height: 3, width: '55%', background: lineColor, borderRadius: 2, marginBottom: 3 }} />
          <div style={{ height: 3, width: '90%', background: lineColor, borderRadius: 2, marginBottom: 3 }} />
          <div style={{ height: 3, width: '70%', background: lineColor, borderRadius: 2, marginBottom: 8 }} />

          {/* EDUCATION */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
            <div style={{ height: 3, width: 3, borderRadius: '50%', background: accentLine }} />
            <div style={{ height: 4, width: 36, background: accentLine, borderRadius: 2, opacity: 0.9 }} />
            <div style={{ flex: 1, height: 1, background: `${accentLine}40` }} />
          </div>
          <div style={{ height: 4, width: '75%', background: strongLine, borderRadius: 2, marginBottom: 3 }} />
          <div style={{ height: 3, width: '50%', background: lineColor, borderRadius: 2, marginBottom: 8 }} />

          {/* SKILLS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
            <div style={{ height: 3, width: 3, borderRadius: '50%', background: accentLine }} />
            <div style={{ height: 4, width: 28, background: accentLine, borderRadius: 2, opacity: 0.9 }} />
            <div style={{ flex: 1, height: 1, background: `${accentLine}40` }} />
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {[32, 44, 28, 38, 24].map((w, i) => (
              <div key={i} style={{
                height: 9, width: w, borderRadius: 99,
                background: i % 2 === 0 ? `${accentLine}55` : `${accentLine}28`,
                border: `1px solid ${accentLine}50`,
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }
const stagger = { show: { transition: { staggerChildren: 0.08 } } }

export default function Templates() {
  const navigate = useNavigate()
  const setTemplate = useCVStore(s => s.setTemplate)
  const setPrimaryColor = useCVStore(s => s.setPrimaryColor)
  const currentTemplate = useCVStore(s => s.settings.template)

  const handleUse = (t) => {
    setTemplate(t.id)
    setPrimaryColor(t.color)
    navigate('/builder')
  }

  return (
    <div style={{ background: '#0d1117', minHeight: 'calc(100vh - 64px)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0f1f3d, #1a1040)', padding: 'clamp(40px, 6vw, 72px) 24px', textAlign: 'center' }}>
        <span className="badge badge-blue" style={{ marginBottom: 16 }}>🎨 Template Gallery</span>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 900, color: '#e6edf3', fontFamily: 'Poppins, sans-serif', marginBottom: 14 }}>
          8 Professional Templates
        </h1>
        <p style={{ color: '#8b949e', fontSize: 18, maxWidth: 520, margin: '0 auto' }}>
          Each template is ATS-optimized, fully customizable, and designed to impress hiring managers.
        </p>
      </div>

      {/* Template Grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(28px,5vw,56px) clamp(12px,4vw,24px)' }}>
        <motion.div initial="hidden" animate="show" variants={stagger}
          className="templates-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {TEMPLATES.map(template => (
            <motion.div key={template.id} variants={fadeUp} className="card card-hover" style={{
              overflow: 'hidden',
              border: currentTemplate === template.id ? `2px solid ${template.color}` : '2px solid transparent',
              transition: 'all 0.2s',
            }}>
              {/* Preview Thumbnail */}
              <div style={{ padding: 16, background: template.bg, borderBottom: '1px solid #30363d' }}>
                <TemplateThumbnail template={template} />
              </div>

              {/* Info */}
              <div style={{ padding: '18px 20px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h3 style={{ fontWeight: 800, fontSize: 16, color: '#e6edf3' }}>{template.name}</h3>
                  {currentTemplate === template.id && (
                    <span className="badge badge-green" style={{ fontSize: 11 }}>
                      <CheckCircle size={11} /> Active
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                  {template.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 11, fontWeight: 600, background: template.bg, color: template.color, padding: '2px 8px', borderRadius: 99 }}>{tag}</span>
                  ))}
                </div>
                <p style={{ color: '#8b949e', fontSize: 13.5, lineHeight: 1.65, marginBottom: 16 }}>{template.desc}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: 13, background: template.color }} onClick={() => handleUse(template)}>
                    Use Template <ArrowRight size={15} />
                  </button>
                  <button className="btn-outline" style={{ fontSize: 13, padding: '9px 14px', borderColor: template.color, color: template.color }} onClick={() => handleUse(template)}>
                    <Palette size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '0 24px 72px' }}>
        <p style={{ color: '#8b949e', fontSize: 14, marginBottom: 16 }}>All templates are ATS-friendly and export perfectly to PDF & DOCX</p>
        <Link to="/builder" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '13px 28px', fontSize: 16 }}>
            Start Building Your CV
          </button>
        </Link>
      </div>
    </div>
  )
}
