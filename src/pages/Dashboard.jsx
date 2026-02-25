import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCVStore } from '../store/cvStore'
import { Plus, Edit2, Trash2, Download, Clock, FileText, Sparkles } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function Dashboard() {
  const navigate = useNavigate()
  const savedCVs = useCVStore(s => s.savedCVs)
  const loadCV = useCVStore(s => s.loadCV)
  const deleteCV = useCVStore(s => s.deleteCV)
  const newCV = useCVStore(s => s.newCV)

  const handleEdit = (id) => {
    loadCV(id)
    navigate('/builder')
  }

  const handleNew = () => {
    newCV()
    navigate('/builder')
  }

  const formatDate = (iso) => {
    if (!iso) return 'Unknown'
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div style={{ background: '#0d1117', minHeight: 'calc(100vh - 64px)', padding: 'clamp(32px, 5vw, 64px) 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: '#e6edf3', fontFamily: 'Poppins, sans-serif', marginBottom: 6 }}>
              My CVs
            </h1>
            <p style={{ color: '#8b949e', fontSize: 15 }}>
              {savedCVs.length === 0 ? 'No saved CVs yet.' : `${savedCVs.length} saved CV${savedCVs.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <button className="btn-primary" style={{ padding: '12px 22px', fontSize: 15 }} onClick={handleNew}>
            <Plus size={18} /> Create New CV
          </button>
        </div>

        {/* Empty state */}
        {savedCVs.length === 0 && (
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="card" style={{ padding: 'clamp(48px, 8vw, 80px) 48px', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <FileText size={36} color="#2563eb" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#e6edf3', marginBottom: 10 }}>No CVs saved yet</h2>
            <p style={{ color: '#8b949e', fontSize: 15, maxWidth: 360, margin: '0 auto 28px', lineHeight: 1.7 }}>
              Create your first professional CV using our AI-powered builder and save it here.
            </p>
            <button className="btn-primary" style={{ padding: '13px 28px', fontSize: 16 }} onClick={handleNew}>
              <Sparkles size={18} /> Create My First CV
            </button>
          </motion.div>
        )}

        {/* CV Cards */}
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {savedCVs.map(saved => (
            <motion.div key={saved.id} variants={fadeUp} className="card card-hover" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Color bar */}
              <div style={{ height: 5, background: saved.settings?.primaryColor || '#2563eb' }} />
              <div style={{ padding: '18px 20px 20px' }}>
                {/* Title row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: 16, color: '#e6edf3', lineHeight: 1.2 }}>{saved.title}</h3>
                    <div style={{ marginTop: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, background: '#f3f4f6', color: '#6b7280', padding: '2px 8px', borderRadius: 99 }}>
                        {saved.settings?.template?.replace(/-/g, ' ') || 'Template'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#9ca3af' }}>
                    <Clock size={13} /> {formatDate(saved.lastEdited)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#9ca3af' }}>
                    <Download size={13} /> {saved.downloads || 0} downloads
                  </div>
                </div>

                {/* CV info summary */}
                <div style={{ background: '#161b22', borderRadius: 8, padding: '10px 12px', marginBottom: 14, fontSize: 12, color: '#8b949e', lineHeight: 1.7 }}>
                  {saved.cv?.personal?.email && <div>✉ {saved.cv.personal.email}</div>}
                  <div>
                    {saved.cv?.experience?.length || 0} experience · {saved.cv?.education?.length || 0} education · {(saved.cv?.skills?.technical?.length || 0) + (saved.cv?.skills?.soft?.length || 0)} skills
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: 13 }} onClick={() => handleEdit(saved.id)}>
                    <Edit2 size={14} /> Edit
                  </button>
                  <button className="btn-ghost" style={{ color: '#ef4444', border: '1px solid #fee2e2', borderRadius: 8, padding: '8px 12px' }} onClick={() => deleteCV(saved.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tips */}
        <div style={{ marginTop: 48, background: 'linear-gradient(135deg, #0f1f3d, #1a1040)', borderRadius: 14, padding: '24px 28px', border: '1px solid #3b82f630' }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: '#60a5fa', marginBottom: 12 }}>💡 Pro Tips</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              'Tailor your CV for each job application',
              'Use the ATS checker to boost your score',
              'Keep your CV to 1–2 pages max',
              'Quantify achievements with numbers',
            ].map((tip, i) => (
              <div key={i} style={{ fontSize: 13, color: '#c9d1d9', display: 'flex', gap: 8 }}>
                <span style={{ color: '#2563eb', flexShrink: 0 }}>✓</span> {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
