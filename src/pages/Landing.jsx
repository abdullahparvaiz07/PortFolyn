import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles, Download, Eye, Palette, GripVertical, CheckCircle,
  Star, ArrowRight, Zap, Shield, Globe, Users
} from 'lucide-react'

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
  { name: 'Modern Minimal', color: '#3b82f6', bg: '#1e3a5f' },
  { name: 'Corporate Executive', color: '#60a5fa', bg: '#1a2e5a' },
  { name: 'Creative Designer', color: '#818cf8', bg: '#2e1065' },
  { name: 'Academic Research', color: '#34d399', bg: '#064e3b' },
  { name: 'Tech Professional', color: '#22d3ee', bg: '#0f2d3d' },
]

const testimonials = [
  { name: 'Sarah K.', role: 'Software Engineer', text: 'Got my dream job at a top tech company! The ATS checker was a game changer.', stars: 5 },
  { name: 'James M.', role: 'Marketing Manager', text: 'The templates look incredibly professional. I received callbacks within a week!', stars: 5 },
  { name: 'Priya S.', role: 'Data Scientist', text: 'The AI suggestions helped me articulate my experience so much better.', stars: 5 },
]

export default function Landing() {
  return (
    <div style={{ background: '#0d1117' }}>
      {/* Hero */}
      <section className="animated-gradient" style={{ padding: '90px 24px 110px', position: 'relative' }}>
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
              <span style={{ background: 'linear-gradient(135deg, #60a5fa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
              Choose from 5 stunning ATS-friendly templates, customize colors & fonts, get AI-powered suggestions, and export to PDF or Word instantly.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/builder" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ padding: '14px 30px', fontSize: 16 }}>
                  <Sparkles size={18} /> Create CV Free
                </button>
              </Link>
              <Link to="/templates" style={{ textDecoration: 'none' }}>
                <button className="btn-outline" style={{ padding: '14px 30px', fontSize: 16 }}>
                  <Eye size={18} /> View Templates
                </button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 56, flexWrap: 'wrap' }}>
              {[['50K+', 'CVs Created'], ['95%', 'ATS Pass Rate'], ['5', 'Templates'], ['Free', 'Forever']].map(([val, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div className="stat-value" style={{ fontSize: 30, fontWeight: 800, fontFamily: 'Poppins, sans-serif' }}>{val}</div>
                  <div style={{ fontSize: 13, color: '#484f58', marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', background: '#0d1117' }}>
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
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="card card-hover" style={{ padding: 28 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: '#161b22',
                  border: '1px solid #30363d',
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
      <section style={{ padding: '80px 24px', background: '#0a0e15' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: 48 }}>
            <motion.div variants={fadeUp}>
              <span className="badge badge-green" style={{ marginBottom: 14 }}>Templates</span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#e6edf3', fontFamily: 'Poppins, sans-serif' }}>
              5 Professional Templates
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: '#8b949e', fontSize: 16, marginTop: 12 }}>
              Each template is designed to impress and pass ATS screening
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
            {templates.map((t) => (
              <motion.div key={t.name} variants={fadeUp} className="card card-hover" style={{
                minWidth: 180, padding: '24px 20px', textAlign: 'center', cursor: 'pointer',
                flexShrink: 0,
              }}
                whileHover={{ borderColor: t.color, scale: 1.02 }}
              >
                <div style={{
                  width: 120, height: 160, background: t.bg, borderRadius: 8, margin: '0 auto 16px',
                  border: `1px solid ${t.color}30`, position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, background: t.color, opacity: 0.85 }} />
                  <div style={{ padding: '48px 12px 12px' }}>
                    {[90, 100, 80, 70, 90].map((w, i) => (
                      <div key={i} style={{ height: 4, background: t.color, opacity: 0.25, borderRadius: 2, marginBottom: 7, width: `${w}%` }} />
                    ))}
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
      <section style={{ padding: '80px 24px', background: '#0d1117' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#e6edf3', fontFamily: 'Poppins, sans-serif', marginBottom: 52 }}>
              How it works
            </motion.h2>
            <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 32 }}>
              {[
                { step: '01', icon: <Palette size={24} color="#60a5fa" />, title: 'Choose a Template', desc: 'Pick from 5 professional designs' },
                { step: '02', icon: <GripVertical size={24} color="#818cf8" />, title: 'Fill Your Info', desc: 'Add your experience, skills & more' },
                { step: '03', icon: <Zap size={24} color="#fbbf24" />, title: 'Customize & Preview', desc: 'Tweak colors, fonts in real-time' },
                { step: '04', icon: <Download size={24} color="#34d399" />, title: 'Export & Share', desc: 'Download PDF or share online' },
              ].map(item => (
                <motion.div key={item.step} variants={fadeUp} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: 16,
                    background: '#161b22', border: '1px solid #30363d',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px', position: 'relative',
                  }}>
                    {item.icon}
                    <div style={{
                      position: 'absolute', top: -8, right: -8,
                      width: 22, height: 22, borderRadius: 99,
                      background: 'linear-gradient(135deg, #3b82f6, #818cf8)',
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

      {/* Testimonials */}
      <section style={{ padding: '80px 24px', background: '#0a0e15' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: 48 }}>
            <motion.div variants={fadeUp}>
              <span className="badge badge-blue" style={{ marginBottom: 14, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Users size={12} /> Success Stories
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#e6edf3', fontFamily: 'Poppins, sans-serif' }}>
              Loved by job seekers
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp} className="card" style={{ padding: 28 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={15} color="#fbbf24" fill="#fbbf24" />
                  ))}
                </div>
                <p style={{ color: '#c9d1d9', fontSize: 15, lineHeight: 1.65, marginBottom: 20, fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div>
                  <div style={{ fontWeight: 700, color: '#e6edf3', fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: '#8b949e', fontSize: 13 }}>{t.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '80px 24px' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          style={{
            maxWidth: 800, margin: '0 auto', textAlign: 'center',
            background: 'linear-gradient(135deg, #1a2e5a, #2e1065)',
            borderRadius: 24, padding: 'clamp(48px, 6vw, 72px) clamp(32px, 5vw, 64px)',
            position: 'relative', overflow: 'hidden',
            border: '1px solid #3b82f630',
            boxShadow: '0 0 60px rgba(59,130,246,0.12)',
          }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(59,130,246,0.06)' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -40, width: 250, height: 250, borderRadius: '50%', background: 'rgba(129,140,248,0.05)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <CheckCircle size={48} color="#60a5fa" style={{ marginBottom: 20, opacity: 0.9 }} />
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#e6edf3', fontFamily: 'Poppins, sans-serif', marginBottom: 14 }}>
              Ready to land your dream job?
            </h2>
            <p style={{ color: '#8b949e', fontSize: 18, marginBottom: 32, lineHeight: 1.7 }}>
              Join thousands of professionals who built their CV with CVify
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
