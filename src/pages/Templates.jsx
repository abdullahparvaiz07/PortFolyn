import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCVStore } from '../store/cvStore'
import { CheckCircle, ArrowRight, Palette } from 'lucide-react'

const TEMPLATES = [
  { id: 'modern-minimal', name: 'Modern Minimal', color: '#3b82f6', bg: '#1e3a5f',
    tags: ['Clean', 'ATS', 'Popular'],
    desc: 'A sleek, contemporary design perfect for tech and creative professionals.',
    accent: '#60a5fa',
  },
  { id: 'corporate-executive', name: 'Corporate Executive', color: '#60a5fa', bg: '#1a2e5a',
    tags: ['Professional', 'ATS', 'Sidebar'],
    desc: 'Two-column layout with sidebar — ideal for senior roles and corporate positions.',
    accent: '#93c5fd',
  },
  { id: 'creative-designer', name: 'Creative Designer', color: '#818cf8', bg: '#2e1065',
    tags: ['Creative', 'Bold', 'Two-column'],
    desc: 'Stand out with a diagonal header and vibrant layout. Great for design roles.',
    accent: '#a5b4fc',
  },
  { id: 'academic-research', name: 'Academic Research', color: '#34d399', bg: '#064e3b',
    tags: ['Academic', 'Serif', 'Classic'],
    desc: 'Scholarly serif typography with a centered header — perfect for academia.',
    accent: '#6ee7b7',
  },
  { id: 'tech-professional', name: 'Tech Professional', color: '#22d3ee', bg: '#0f2d3d',
    tags: ['Dark Mode', 'Code Style', 'Terminal'],
    desc: 'Dark terminal-inspired theme with code-comment headers. Built for developers.',
    accent: '#67e8f9',
  },
]

function TemplateThumbnail({ template }) {
  return (
    <div style={{ width: '100%', paddingBottom: '132%', position: 'relative', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: template.id === 'tech-professional' ? '#0a1120' : '#161b22' }}>
        {/* Simulated template preview */}
        <div style={{ height: '28%', background: template.color, display: 'flex', alignItems: 'flex-end', padding: '0 12px 10px', opacity: 0.9 }}>
          <div>
            <div style={{ height: 8, width: 80, background: 'rgba(255,255,255,0.85)', borderRadius: 4 }} />
            <div style={{ height: 5, width: 50, background: 'rgba(255,255,255,0.45)', borderRadius: 4, marginTop: 5 }} />
          </div>
        </div>
        <div style={{ padding: 12 }}>
          {[70, 100, 85, 60, 90, 75].map((w, i) => (
            <div key={i} style={{ height: 4, background: template.color, opacity: 0.3, borderRadius: 2, marginBottom: 7, width: `${w}%` }} />
          ))}
          <div style={{ marginTop: 10 }}>
            <div style={{ height: 6, width: '50%', background: template.color, opacity: 0.2, borderRadius: 2, marginBottom: 6 }} />
            {[90, 80, 100].map((w, i) => (
              <div key={i} style={{ height: 3, background: '#30363d', borderRadius: 2, marginBottom: 5, width: `${w}%` }} />
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
          5 Professional Templates
        </h1>
        <p style={{ color: '#8b949e', fontSize: 18, maxWidth: 520, margin: '0 auto' }}>
          Each template is ATS-optimized, fully customizable, and designed to impress hiring managers.
        </p>
      </div>

      {/* Template Grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px' }}>
        <motion.div initial="hidden" animate="show" variants={stagger}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
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
