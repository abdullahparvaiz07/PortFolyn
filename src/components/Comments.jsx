import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, Trash2, Star } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const COMMENTS_KEY = 'portfolyn_comments'

function getComments() {
  try { return JSON.parse(localStorage.getItem(COMMENTS_KEY) || '[]') } catch { return [] }
}
function saveComments(comments) {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments))
}

export default function Comments() {
  const { user } = useAuth()
  const [comments, setComments] = useState(getComments)
  const [text, setText]         = useState('')
  const [rating, setRating]     = useState(5)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [error, setError]       = useState('')

  useEffect(() => { saveComments(comments) }, [comments])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) { setError('Please write something before submitting.'); return }
    const newComment = {
      id:     Date.now(),
      userId: user.id,
      name:   user.name,
      avatar: user.avatar,
      role:   user.role,
      text:   text.trim(),
      rating,
      date:   new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    }
    setComments(prev => [newComment, ...prev])
    setText('')
    setRating(5)
    setError('')
  }

  const handleDelete = (id) => {
    setComments(prev => prev.filter(c => c.id !== id))
  }

  const canDelete = (comment) => user && (user.id === comment.userId || user.role === 'owner')

  return (
    <section style={{ padding: '80px 24px', background: '#0d0d14' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="badge badge-blue" style={{ marginBottom: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <MessageSquare size={12} /> Community Reviews
          </span>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, color: '#ede9fe', fontFamily: 'Poppins, sans-serif' }}>
            What users are saying
          </h2>
          <p style={{ color: '#9b959e', marginTop: 10, fontSize: 15 }}>
            {comments.length > 0
              ? `${comments.length} review${comments.length !== 1 ? 's' : ''} from real users`
              : 'Be the first to leave a review!'}
          </p>
        </div>

        {/* Comment form — only when logged in */}
        {user ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: '#13111e', border: '1px solid #2d2a4a',
              borderRadius: 16, padding: '24px', marginBottom: 32,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: user.role === 'owner'
                  ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                  : 'linear-gradient(135deg, #7c3aed, #fbbf24)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, fontWeight: 800, color: 'white',
              }}>
                {user.photo
                  ? <img src={user.photo} alt="" style={{ width: '100%', height: '100%', borderRadius: 10, objectFit: 'cover' }} />
                  : user.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#ede9fe', fontSize: 14 }}>{user.name}</div>
                <div style={{ color: '#9b959e', fontSize: 12 }}>Leaving a review</div>
              </div>
            </div>

            {/* Star rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
              <span style={{ fontSize: 13, color: '#9b959e', marginRight: 4 }}>Rating:</span>
              {[1,2,3,4,5].map(s => (
                <Star
                  key={s}
                  size={22}
                  style={{ cursor: 'pointer', transition: 'transform 0.15s' }}
                  color="#fbbf24"
                  fill={(hoveredStar || rating) >= s ? '#fbbf24' : 'transparent'}
                  onMouseEnter={() => setHoveredStar(s)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setRating(s)}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <textarea
                className="form-input"
                rows={3}
                placeholder="Share your experience with PortFolyn..."
                value={text}
                onChange={e => { setText(e.target.value); setError('') }}
                style={{ marginBottom: 12, resize: 'vertical' }}
              />
              {error && (
                <div style={{ fontSize: 13, color: '#f87171', marginBottom: 10 }}>⚠ {error}</div>
              )}
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                <Send size={15} /> Post Review
              </button>
            </form>
          </motion.div>
        ) : (
          <div style={{
            background: '#13111e', border: '1px dashed #2d2a4a',
            borderRadius: 16, padding: '28px', marginBottom: 32, textAlign: 'center',
          }}>
            <MessageSquare size={32} color="#4a4560" style={{ marginBottom: 12 }} />
            <p style={{ color: '#9b959e', fontSize: 15, marginBottom: 4 }}>Sign in to leave a review</p>
            <p style={{ color: '#4a4560', fontSize: 13 }}>Your feedback helps other users!</p>
          </div>
        )}

        {/* Comments list */}
        <AnimatePresence>
          {comments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '48px 24px', color: '#4a4560' }}
            >
              <MessageSquare size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              <p style={{ fontSize: 15 }}>No reviews yet. Be the first!</p>
            </motion.div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {comments.map(c => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="card"
                  style={{ padding: '20px 22px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                        background: c.role === 'owner'
                          ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                          : 'linear-gradient(135deg, #7c3aed, #fbbf24)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 14, fontWeight: 800, color: 'white', overflow: 'hidden',
                      }}>
                        {c.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#ede9fe', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                          {c.name}
                          {c.role === 'owner' && (
                            <span style={{ fontSize: 10, background: '#1a0a00', border: '1px solid #f59e0b40', color: '#f59e0b', padding: '1px 7px', borderRadius: 99, fontWeight: 700 }}>Owner</span>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: 2, marginTop: 3 }}>
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} size={12} color="#fbbf24" fill={c.rating >= s ? '#fbbf24' : 'transparent'} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 12, color: '#4a4560' }}>{c.date}</span>
                      {canDelete(c) && (
                        <button
                          onClick={() => handleDelete(c.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4a4560', padding: 4, borderRadius: 6, transition: 'color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                          onMouseLeave={e => e.currentTarget.style.color = '#4a4560'}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p style={{ color: '#c4b5fd', fontSize: 14, lineHeight: 1.7 }}>"{c.text}"</p>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
