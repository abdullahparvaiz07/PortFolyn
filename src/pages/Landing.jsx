import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles, Download, Eye, Palette, GripVertical, CheckCircle,
  ArrowRight, Zap, Shield, Globe, Upload
} from 'lucide-react'
import Comments from '../components/Comments'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useCVStore } from '../store/cvStore'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

const features = [
  { icon: <Eye size={22} color="#60a5fa" />, title: 'Live Preview', desc: 'See your CV update in real-time as you type.' },
  { icon: <Sparkles size={22} color="#818cf8" />, title: 'AI Suggestions', desc: 'Smart AI-powered bullet point and summary suggestions.' },
  { icon: <Shield size={22} color="#34d399" />, title: 'ATS Friendly', desc: 'Templates optimized to pass applicant tracking systems.' },
  { icon: <Download size={22} color="#fbbf24" />, title: 'Export PDF & DOCX', desc: 'Download in multiple formats, ready to send.' },
  { icon: <Palette size={22} color="#f87171" />, title: 'Customizable', desc: 'Choose colors, fonts, and layouts to match your style.' },
  { icon: <Globe size={22} color="#22d3ee" />, title: 'Shareable Link', desc: 'Get a unique link to share your CV online instantly.' },
]

const templates = [
  { name: 'Modern Minimal',     color: '#3b82f6', bg: '#1e3a5f', photo: '/avatar1.png' },
  { name: 'Corporate Executive', color: '#60a5fa', bg: '#1a2e5a', photo: '/avatar2.png' },
  { name: 'Academic Research',   color: '#34d399', bg: '#064e3b', photo: '/avatar1.png' },
  { name: 'Tech Professional',   color: '#22d3ee', bg: '#0f2d3d', photo: '/avatar2.png' },
  { name: 'Elegant Classic',     color: '#c9973a', bg: '#2a1f0a', photo: '/avatar3.png' },
  { name: 'Vintage Muse',        color: '#c4956a', bg: '#2d2018', photo: '/avatar3.png' },
  { name: 'Blue Sidebar',        color: '#29b6d4', bg: '#061a2e', photo: '/avatar2.png' },
  { name: 'Resume Exact',        color: '#242424', bg: '#1c1c1c', photo: '/avatar1.png' },
]



export default function Landing() {
  const navigate = useNavigate()
  const setEntireCV = useCVStore(s => s.setEntireCV)



  return (
    <div style={{ background: 'var(--bg-base)' }}>
      {/* Hero */}
      <section className="animated-gradient hero-section" style={{ padding: 'clamp(60px,8vw,110px) clamp(16px,4vw,24px)', position: 'relative' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}>
              <span className="badge badge-blue" style={{ marginBottom: 24, fontSize: 13, padding: '6px 16px' }}>
                ✨ AI-Powered CV Builder
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} style={{
              fontSize: 'clamp(38px, 7vw, 76px)',
              fontWeight: 900,
              color: '#e6edf3',
              lineHeight: 1.08,
              marginBottom: 22,
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '-0.03em',
            }}>
              Build Your{' '}
              <span style={{ background: 'linear-gradient(135deg, #c4b5fd, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Professional CV
              </span>
              {' '}in Minutes
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: '#8b949e',
              maxWidth: 620,
              margin: '0 auto 40px',
              lineHeight: 1.75,
            }}>
              Choose from 8 stunning ATS-friendly templates, customize colors & fonts, get AI-powered suggestions, and export to PDF or Word instantly.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }} className="hero-cta">
              <Link to="/builder" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ padding: '14px 28px', fontSize: 16 }}>
                  <Sparkles size={18} /> Start from Scratch
                </button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} style={{ marginTop: 60, perspective: 1000 }}>
              <motion.div 
                style={{
                  position: 'relative',
                  margin: '0 auto',
                  maxWidth: 900,
                  borderRadius: 24,
                  padding: 16,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(124,58,237,0.2)',
                  backdropFilter: 'blur(16px)'
                }}
                whileHover={{ rotateX: 2, rotateY: -2, scale: 1.01 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <img src="/dashboard_mockup.png" alt="Dashboard Mockup" style={{ width: '100%', height: 'auto', borderRadius: 12, display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, borderRadius: 24, boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 80, flexWrap: 'wrap' }} className="stat-bar">
              {[['95%', 'ATS Pass Rate'], ['8', 'Templates'], ['Free', 'Forever']].map(([val, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div className="stat-value" style={{ fontSize: 30, fontWeight: 800, fontFamily: 'Poppins, sans-serif' }}>{val}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-base)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: 56 }}>
            <motion.div variants={fadeUp}>
              <span className="badge badge-purple" style={{ marginBottom: 14 }}>Features</span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#e6edf3', fontFamily: 'Poppins, sans-serif' }}>
              Everything you need to land the job
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="features-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="card card-hover" style={{ padding: 28 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 17, color: '#e6edf3', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: '#8b949e', fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Templates strip */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: 48 }}>
            <motion.div variants={fadeUp}>
              <span className="badge badge-green" style={{ marginBottom: 14 }}>Templates</span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#e6edf3', fontFamily: 'Poppins, sans-serif' }}>
              8 Professional Templates
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: '#8b949e', fontSize: 16, marginTop: 12 }}>
              Each template is designed to impress and pass ATS screening
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, WebkitOverflowScrolling: 'touch' }}>
            {templates.map((t) => (
              <motion.div key={t.name} variants={fadeUp} className="card card-hover template-strip-card" style={{
                minWidth: 160, padding: '20px 16px', textAlign: 'center', cursor: 'pointer', flexShrink: 0,
              }}
                whileHover={{ borderColor: t.color, scale: 1.02 }}
              >
                <div style={{
                  width: 120, height: 160, background: t.bg, borderRadius: 8, margin: '0 auto 16px',
                  border: `1px solid ${t.color}40`, position: 'relative', overflow: 'hidden',
                }}>
                  {/* Colored header */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, background: t.color, opacity: 0.92 }} />
                  {/* Profile photo circle */}
                  <div style={{
                    position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
                    width: 30, height: 30, borderRadius: '50%', overflow: 'hidden',
                    border: `2px solid rgba(255,255,255,0.75)`,
                    zIndex: 2, boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                  }}>
                    <img src={t.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                  {/* CV content area */}
                  <div style={{ position: 'absolute', top: 48, left: 8, right: 8, bottom: 6 }}>
                    {/* Name + title */}
                    <div style={{ height: 5, width: '70%', background: 'rgba(255,255,255,0.75)', borderRadius: 2, marginBottom: 3 }} />
                    <div style={{ height: 3, width: '50%', background: `${t.color}cc`, borderRadius: 2, marginBottom: 8 }} />
                    {/* Experience section */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 4 }}>
                      <div style={{ height: 4, width: 28, background: t.color, borderRadius: 2, opacity: 0.9 }} />
                      <div style={{ flex: 1, height: 1, background: `${t.color}35` }} />
                    </div>
                    <div style={{ height: 3, width: '85%', background: 'rgba(255,255,255,0.55)', borderRadius: 2, marginBottom: 3 }} />
                    <div style={{ height: 3, width: '65%', background: 'rgba(255,255,255,0.28)', borderRadius: 2, marginBottom: 3 }} />
                    <div style={{ height: 3, width: '75%', background: 'rgba(255,255,255,0.28)', borderRadius: 2, marginBottom: 7 }} />
                    {/* Skills section */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 5 }}>
                      <div style={{ height: 4, width: 22, background: t.color, borderRadius: 2, opacity: 0.9 }} />
                      <div style={{ flex: 1, height: 1, background: `${t.color}35` }} />
                    </div>
                    <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                      {[28, 36, 22, 30].map((w, i) => (
                        <div key={i} style={{
                          height: 8, width: w, borderRadius: 99,
                          background: i % 2 === 0 ? `${t.color}50` : `${t.color}25`,
                          border: `1px solid ${t.color}45`,
                        }} />
                      ))}
                    </div>
                  </div>
                </div>
                <span style={{ fontWeight: 700, fontSize: 13, color: '#c9d1d9' }}>{t.name}</span>
              </motion.div>
            ))}
          </motion.div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/templates" style={{ textDecoration: 'none' }}>
              <button className="btn-outline">
                View All Templates <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-base)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#e6edf3', fontFamily: 'Poppins, sans-serif', marginBottom: 52 }}>
              How it works
            </motion.h2>
            <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 32 }}>
              {[
                { step: '01', icon: <Palette size={24} color="#60a5fa" />, title: 'Choose a Template', desc: 'Pick from 8 professional designs' },
                { step: '02', icon: <GripVertical size={24} color="#818cf8" />, title: 'Fill Your Info', desc: 'Add your experience, skills & more' },
                { step: '03', icon: <Zap size={24} color="#fbbf24" />, title: 'Customize & Preview', desc: 'Tweak colors, fonts in real-time' },
                { step: '04', icon: <Download size={24} color="#34d399" />, title: 'Export & Share', desc: 'Download PDF or share online' },
              ].map(item => (
                <motion.div key={item.step} variants={fadeUp} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: 16,
                    background: 'var(--bg-surface)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px', position: 'relative',
                  }}>
                    {item.icon}
                    <div style={{
                      position: 'absolute', top: -8, right: -8,
                      width: 22, height: 22, borderRadius: 99,
                      background: 'linear-gradient(135deg, #7c3aed, #fbbf24)',
                      color: 'white', fontSize: 10, fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{item.step}</div>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: '#e6edf3', marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ color: '#8b949e', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Real user comments section */}
      <Comments />

      {/* CTA Banner */}
      <section style={{ padding: '80px 24px' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          style={{
            maxWidth: 800, margin: '0 auto', textAlign: 'center',
            background: `radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.14) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, rgba(251,191,36,0.06) 0%, transparent 60%)`,
            borderRadius: 24, padding: 'clamp(48px, 6vw, 72px) clamp(32px, 5vw, 64px)',
            position: 'relative', overflow: 'hidden',
            border: '1px solid #3b82f630',
            boxShadow: '0 0 60px rgba(124,58,237,0.18)',
          }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(124,58,237,0.08)' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -40, width: 250, height: 250, borderRadius: '50%', background: 'rgba(251,191,36,0.05)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <CheckCircle size={48} color="#60a5fa" style={{ marginBottom: 20, opacity: 0.9 }} />
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#e6edf3', fontFamily: 'Poppins, sans-serif', marginBottom: 14 }}>
              Ready to land your dream job?
            </h2>
            <p style={{ color: '#8b949e', fontSize: 18, marginBottom: 32, lineHeight: 1.7 }}>
              Start building your professional CV today — it's completely free
            </p>
            <Link to="/builder" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '14px 32px', fontSize: 16 }}>
                <Sparkles size={18} /> Start Building — It's Free
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
