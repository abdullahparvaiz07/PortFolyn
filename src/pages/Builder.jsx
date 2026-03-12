import React, { useState, useRef, useEffect } from 'react'
import { useCVStore } from '../store/cvStore'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, FileText, GraduationCap, Briefcase, Wrench,
  Award, FolderOpen, Languages, ChevronDown, ChevronUp,
  Plus, Trash2, GripVertical, Download, Share2, Save,
  Sparkles, CheckCircle, Eye, EyeOff, Palette, Type,
  Lightbulb, Bug, X
} from 'lucide-react'
import CVPreview from '../components/preview/CVPreview'
import { HexColorPicker } from 'react-colorful'
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core'
import {
  arrayMove, SortableContext, useSortable, verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// ── FONTS ─────────────────────────────────────────────────────────────────────
const FONTS = ['Inter', 'Poppins', 'Roboto', 'Playfair Display', 'JetBrains Mono']

// ── TEMPLATES ─────────────────────────────────────────────────────────────────
const TEMPLATES = [
  { id: 'modern-minimal', label: 'Modern Minimal', color: '#2563eb' },
  { id: 'corporate-executive', label: 'Corporate Executive', color: '#1e40af' },
  { id: 'academic-research', label: 'Academic Research', color: '#065f46' },
  { id: 'tech-professional', label: 'Tech Professional', color: '#0f172a' },
  { id: 'elegant-classic', label: 'Elegant Classic', color: '#92702a' },
  { id: 'vintage-muse', label: 'Vintage Muse', color: '#c4956a' },
  { id: 'blue-sidebar', label: 'Blue Sidebar', color: '#0d3b5e' },
  { id: 'resume-exact', label: 'Resume Exact', color: '#242424' },
]

// ── AI SUGGESTIONS ────────────────────────────────────────────────────────────
const AI_SUMMARIES = [
  'Results-driven professional with 5+ years of experience delivering high-impact solutions. Skilled in cross-functional collaboration, problem-solving, and driving measurable business outcomes.',
  'Innovative engineer with a proven track record of building scalable systems and leading agile teams. Passionate about leveraging technology to solve complex challenges.',
  'Dynamic leader with expertise in strategic planning and stakeholder management. Adept at driving organizational growth through data-driven decisions and process optimization.',
  'Dedicated professional combining technical excellence with strong communication skills. Committed to continuous learning and delivering value in fast-paced environments.',
]

// ── ATS CHECKER ───────────────────────────────────────────────────────────────
function checkATS(cv) {
  const issues = []
  let score = 100
  if (!cv.personal.name) { issues.push('❌ Missing name'); score -= 15 }
  if (!cv.personal.email) { issues.push('❌ Missing email'); score -= 10 }
  if (!cv.personal.phone) { issues.push('❌ Missing phone'); score -= 10 }
  if (!cv.summary) { issues.push('⚠️ No professional summary'); score -= 10 }
  if (cv.experience.length === 0) { issues.push('⚠️ No work experience added'); score -= 15 }
  if (cv.skills.technical.length === 0) { issues.push('⚠️ No technical skills listed'); score -= 10 }
  if (cv.education.length === 0) { issues.push('⚠️ No education added'); score -= 10 }
  if (cv.summary && cv.summary.length < 50) { issues.push('💡 Summary too short (aim for 3+ sentences)'); score -= 5 }
  return { score: Math.max(0, score), issues }
}

// ── SORTABLE SECTION ITEM ─────────────────────────────────────────────────────
function SortableSection({ id, label, isHidden, onToggle, icon }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: isHidden ? '#f9fafb' : 'white', border: '1.5px solid #e5e7eb', borderRadius: 8, marginBottom: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span {...attributes} {...listeners} className="drag-handle" style={{ display: 'flex', cursor: 'grab' }}>
          <GripVertical size={16} />
        </span>
        <span style={{ fontSize: 13, fontWeight: 500, color: isHidden ? '#9ca3af' : '#374151' }}>{label}</span>
      </div>
      <button onClick={onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isHidden ? '#d1d5db' : '#2563eb', padding: 4 }}>
        {isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  )
}

// ── FORM SECTIONS ─────────────────────────────────────────────────────────────
function PersonalForm() {
  const cv = useCVStore(s => s.cv)
  const setPersonal = useCVStore(s => s.setPersonal)

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPersonal({ photo: ev.target.result })
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {[['name', 'Full Name', 'John Doe'], ['email', 'Email', 'john@email.com'], ['phone', 'Phone', '+1 (555) 000-0000'], ['linkedin', 'LinkedIn', 'linkedin.com/in/john']].map(([field, label, ph]) => (
          <div key={field}>
            <label className="form-label">{label}</label>
            <input className="form-input" placeholder={ph} value={cv.personal[field] || ''} onChange={e => setPersonal({ [field]: e.target.value })} />
          </div>
        ))}
        <div style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Address</label>
          <input className="form-input" placeholder="New York, NY, USA" value={cv.personal.address || ''} onChange={e => setPersonal({ address: e.target.value })} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Website / Portfolio</label>
          <input className="form-input" placeholder="https://yourportfolio.com" value={cv.personal.website || ''} onChange={e => setPersonal({ website: e.target.value })} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Profile Photo</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {cv.personal.photo && <img src={cv.personal.photo} alt="" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e5e7eb' }} />}
            <label style={{ cursor: 'pointer' }}>
              <div className="btn-outline" style={{ pointerEvents: 'none' }}>Upload Photo</div>
              <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
            </label>
            {cv.personal.photo && <button className="btn-ghost" onClick={() => setPersonal({ photo: null })}><X size={14} /> Remove</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryForm({ onAISuggest }) {
  const summary = useCVStore(s => s.cv.summary)
  const setSummary = useCVStore(s => s.setSummary)
  const [showAI, setShowAI] = useState(false)

  return (
    <div>
      <label className="form-label">Professional Summary</label>
      <textarea className="form-input" rows={5} placeholder="Write a compelling 3-4 sentence summary highlighting your key experience, skills, and career goals..." value={summary} onChange={e => setSummary(e.target.value)} />
      <button className="btn-outline" style={{ marginTop: 10, fontSize: 13 }} onClick={() => setShowAI(!showAI)}>
        <Sparkles size={14} /> AI Suggestions
      </button>
      {showAI && (
        <div style={{ marginTop: 12, background: '#eff6ff', borderRadius: 10, padding: 14, border: '1.5px solid #bfdbfe' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#1d4ed8', marginBottom: 10 }}>✨ Choose an AI-generated summary:</div>
          {AI_SUMMARIES.map((s, i) => (
            <div key={i} onClick={() => { setSummary(s); setShowAI(false) }} style={{ background: 'white', border: '1.5px solid #dbeafe', borderRadius: 8, padding: 12, marginBottom: 8, cursor: 'pointer', fontSize: 12, lineHeight: 1.65, color: '#374151', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#2563eb'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#dbeafe'}>
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function EducationForm() {
  const education = useCVStore(s => s.cv.education)
  const addEducation = useCVStore(s => s.addEducation)
  const updateEducation = useCVStore(s => s.updateEducation)
  const removeEducation = useCVStore(s => s.removeEducation)
  const [open, setOpen] = useState(null)

  return (
    <div>
      {education.map((edu) => (
        <div key={edu.id} className="card" style={{ padding: 16, marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setOpen(open === edu.id ? null : edu.id)}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{edu.degree || 'New Education'}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{edu.school}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-ghost" style={{ padding: '4px 8px' }} onClick={e => { e.stopPropagation(); removeEducation(edu.id) }}><Trash2 size={14} color="#ef4444" /></button>
              {open === edu.id ? <ChevronUp size={18} color="#6b7280" /> : <ChevronDown size={18} color="#6b7280" />}
            </div>
          </div>
          {open === edu.id && (
            <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Degree / Qualification</label>
                <input className="form-input" placeholder="Bachelor of Science in Computer Science" value={edu.degree || ''} onChange={e => updateEducation(edu.id, { degree: e.target.value })} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">School / University</label>
                <input className="form-input" placeholder="MIT" value={edu.school || ''} onChange={e => updateEducation(edu.id, { school: e.target.value })} />
              </div>
              <div>
                <label className="form-label">Start Year</label>
                <input className="form-input" placeholder="2018" value={edu.startYear || ''} onChange={e => updateEducation(edu.id, { startYear: e.target.value })} />
              </div>
              <div>
                <label className="form-label">End Year</label>
                <input className="form-input" placeholder="2022" value={edu.endYear || ''} onChange={e => updateEducation(edu.id, { endYear: e.target.value })} />
              </div>
              <div>
                <label className="form-label">GPA (Optional)</label>
                <input className="form-input" placeholder="3.8/4.0" value={edu.gpa || ''} onChange={e => updateEducation(edu.id, { gpa: e.target.value })} />
              </div>
            </div>
          )}
        </div>
      ))}
      <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }} onClick={() => { const id = Date.now(); addEducation({}); setOpen(id) }}>
        <Plus size={16} /> Add Education
      </button>
    </div>
  )
}

function ExperienceForm() {
  const experience = useCVStore(s => s.cv.experience)
  const addExperience = useCVStore(s => s.addExperience)
  const updateExperience = useCVStore(s => s.updateExperience)
  const removeExperience = useCVStore(s => s.removeExperience)
  const [open, setOpen] = useState(null)

  return (
    <div>
      {experience.map((exp) => (
        <div key={exp.id} className="card" style={{ padding: 16, marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setOpen(open === exp.id ? null : exp.id)}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{exp.title || 'New Position'}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{exp.company}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-ghost" style={{ padding: '4px 8px' }} onClick={e => { e.stopPropagation(); removeExperience(exp.id) }}><Trash2 size={14} color="#ef4444" /></button>
              {open === exp.id ? <ChevronUp size={18} color="#6b7280" /> : <ChevronDown size={18} color="#6b7280" />}
            </div>
          </div>
          {open === exp.id && (
            <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label className="form-label">Job Title</label>
                <input className="form-input" placeholder="Senior Software Engineer" value={exp.title || ''} onChange={e => updateExperience(exp.id, { title: e.target.value })} />
              </div>
              <div>
                <label className="form-label">Company</label>
                <input className="form-input" placeholder="Acme Corp" value={exp.company || ''} onChange={e => updateExperience(exp.id, { company: e.target.value })} />
              </div>
              <div>
                <label className="form-label">Start Date</label>
                <input className="form-input" placeholder="Jan 2021" value={exp.startDate || ''} onChange={e => updateExperience(exp.id, { startDate: e.target.value })} />
              </div>
              <div>
                <label className="form-label">End Date</label>
                <input className="form-input" placeholder="Present" value={exp.endDate || ''} onChange={e => updateExperience(exp.id, { endDate: e.target.value })} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Description (use • for bullet points)</label>
                <textarea className="form-input" rows={4} placeholder="• Led a team of 5 engineers to deliver new features&#10;• Improved system performance by 40%..." value={exp.description || ''} onChange={e => updateExperience(exp.id, { description: e.target.value })} />
              </div>
            </div>
          )}
        </div>
      ))}
      <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }} onClick={() => addExperience({})}>
        <Plus size={16} /> Add Experience
      </button>
    </div>
  )
}

function SkillsForm() {
  const skills = useCVStore(s => s.cv.skills)
  const setSkills = useCVStore(s => s.setSkills)
  const [techInput, setTechInput] = useState('')
  const [softInput, setSoftInput] = useState('')

  const addSkill = (type, value) => {
    if (!value.trim()) return
    const arr = skills[type] || []
    setSkills({ [type]: [...arr, value.trim()] })
    type === 'technical' ? setTechInput('') : setSoftInput('')
  }
  const removeSkill = (type, idx) => {
    const arr = [...(skills[type] || [])]
    arr.splice(idx, 1)
    setSkills({ [type]: arr })
  }

  return (
    <div>
      {[['technical', 'Technical Skills', techInput, setTechInput], ['soft', 'Soft Skills', softInput, setSoftInput]].map(([type, label, val, setVal]) => (
        <div key={type} style={{ marginBottom: 20 }}>
          <label className="form-label">{label}</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <input className="form-input" placeholder={type === 'technical' ? 'e.g. React, Python, AWS' : 'e.g. Leadership, Communication'} value={val} onChange={e => setVal(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill(type, val) } }} />
            <button className="btn-primary" style={{ flexShrink: 0 }} onClick={() => addSkill(type, val)}><Plus size={16} /></button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(skills[type] || []).map((s, i) => (
              <span key={i} className="badge badge-blue" style={{ cursor: 'pointer', gap: 6 }}>
                {s}
                <X size={11} onClick={() => removeSkill(type, i)} />
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function CertificationsForm() {
  const certifications = useCVStore(s => s.cv.certifications)
  const addCertification = useCVStore(s => s.addCertification)
  const updateCertification = useCVStore(s => s.updateCertification)
  const removeCertification = useCVStore(s => s.removeCertification)

  return (
    <div>
      {certifications.map((cert) => (
        <div key={cert.id} className="card" style={{ padding: 14, marginBottom: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{cert.name || 'New Certification'}</span>
            <button className="btn-ghost" style={{ padding: '4px 8px' }} onClick={() => removeCertification(cert.id)}><Trash2 size={14} color="#ef4444" /></button>
          </div>
          <div>
            <label className="form-label">Certification Name</label>
            <input className="form-input" placeholder="AWS Solutions Architect" value={cert.name || ''} onChange={e => updateCertification(cert.id, { name: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Issuing Organization</label>
            <input className="form-input" placeholder="Amazon Web Services" value={cert.issuer || ''} onChange={e => updateCertification(cert.id, { issuer: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Date</label>
            <input className="form-input" placeholder="Dec 2023" value={cert.date || ''} onChange={e => updateCertification(cert.id, { date: e.target.value })} />
          </div>
        </div>
      ))}
      <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }} onClick={() => addCertification({})}>
        <Plus size={16} /> Add Certification
      </button>
    </div>
  )
}

function ProjectsForm() {
  const projects = useCVStore(s => s.cv.projects)
  const addProject = useCVStore(s => s.addProject)
  const updateProject = useCVStore(s => s.updateProject)
  const removeProject = useCVStore(s => s.removeProject)
  const [open, setOpen] = useState(null)

  return (
    <div>
      {projects.map((proj) => (
        <div key={proj.id} className="card" style={{ padding: 16, marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setOpen(open === proj.id ? null : proj.id)}>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{proj.name || 'New Project'}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-ghost" style={{ padding: '4px 8px' }} onClick={e => { e.stopPropagation(); removeProject(proj.id) }}><Trash2 size={14} color="#ef4444" /></button>
              {open === proj.id ? <ChevronUp size={18} color="#6b7280" /> : <ChevronDown size={18} color="#6b7280" />}
            </div>
          </div>
          {open === proj.id && (
            <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
              <div>
                <label className="form-label">Project Name</label>
                <input className="form-input" placeholder="E-commerce Platform" value={proj.name || ''} onChange={e => updateProject(proj.id, { name: e.target.value })} />
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea className="form-input" rows={3} value={proj.description || ''} onChange={e => updateProject(proj.id, { description: e.target.value })} />
              </div>
              <div>
                <label className="form-label">URL / GitHub Link</label>
                <input className="form-input" placeholder="https://github.com/..." value={proj.url || ''} onChange={e => updateProject(proj.id, { url: e.target.value })} />
              </div>
            </div>
          )}
        </div>
      ))}
      <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }} onClick={() => addProject({})}>
        <Plus size={16} /> Add Project
      </button>
    </div>
  )
}

function LanguagesForm() {
  const languages = useCVStore(s => s.cv.languages)
  const addLanguage = useCVStore(s => s.addLanguage)
  const removeLanguage = useCVStore(s => s.removeLanguage)
  const [name, setName] = useState('')
  const [level, setLevel] = useState('Professional')

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 10, marginBottom: 14 }}>
        <input className="form-input" placeholder="Language (e.g. English)" value={name} onChange={e => setName(e.target.value)} />
        <select className="form-input" value={level} onChange={e => setLevel(e.target.value)} style={{ width: 'auto' }}>
          {['Native', 'Fluent', 'Professional', 'Conversational', 'Basic'].map(l => <option key={l}>{l}</option>)}
        </select>
        <button className="btn-primary" onClick={() => { if (name.trim()) { addLanguage({ name: name.trim(), level }); setName('') } }}><Plus size={16} /></button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {languages.map(lang => (
          <span key={lang.id} className="badge badge-purple" style={{ gap: 6, cursor: 'pointer' }}>
            {lang.name} · {lang.level}
            <X size={11} onClick={() => removeLanguage(lang.id)} />
          </span>
        ))}
      </div>
    </div>
  )
}

// ── MAIN BUILDER ──────────────────────────────────────────────────────────────
const FORM_TABS = [
  { id: 'personal', label: 'Personal', icon: <User size={16} /> },
  { id: 'summary', label: 'Summary', icon: <FileText size={16} /> },
  { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
  { id: 'skills', label: 'Skills', icon: <Wrench size={16} /> },
  { id: 'certifications', label: 'Certifications', icon: <Award size={16} /> },
  { id: 'projects', label: 'Projects', icon: <FolderOpen size={16} /> },
  { id: 'languages', label: 'Languages', icon: <Languages size={16} /> },
]

// Hook: dynamically scale a 210mm (794px) div to fit the container
function usePreviewScale(containerRef) {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    if (!containerRef.current) return
    const compute = () => {
      const w = containerRef.current.clientWidth
      setScale(Math.min(1, w / 794))
    }
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [containerRef])
  return scale
}

export default function Builder() {
  const [activeTab, setActiveTab] = useState('personal')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showSections, setShowSections] = useState(false)
  const [showATS, setShowATS] = useState(false)
  const [savedMsg, setSavedMsg] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [mobilePanel, setMobilePanel] = useState('form') // 'form' | 'preview'
  const cv = useCVStore(s => s.cv)
  const settings = useCVStore(s => s.settings)
  const setTemplate = useCVStore(s => s.setTemplate)
  const setPrimaryColor = useCVStore(s => s.setPrimaryColor)
  const setFont = useCVStore(s => s.setFont)
  const setSectionOrder = useCVStore(s => s.setSectionOrder)
  const toggleSection = useCVStore(s => s.toggleSection)
  const saveCurrentCV = useCVStore(s => s.saveCurrentCV)
  const trackDownload = useCVStore(s => s.trackDownload)
  const currentCVId = useCVStore(s => s.currentCVId)
  const previewRef = useRef(null)
  const previewContainerRef = useRef(null)
  const previewScale = usePreviewScale(previewContainerRef)

  // DnD sensors
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = settings.sectionOrder.indexOf(active.id)
      const newIndex = settings.sectionOrder.indexOf(over.id)
      setSectionOrder(arrayMove(settings.sectionOrder, oldIndex, newIndex))
    }
  }

  const handleSave = () => {
    saveCurrentCV()
    setSavedMsg(true)
    setTimeout(() => setSavedMsg(false), 2500)
  }

  const handlePDFExport = async () => {
    // Use the hidden off-screen element so PDF works even when preview panel is hidden on mobile
    const element = document.getElementById('cv-pdf-export') || document.getElementById('cv-preview-inner')
    if (!element) { alert('Preview not ready. Please try again.'); return }
    setPdfLoading(true)
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pdfWidth  = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`${cv.personal.name || 'PortFolyn-CV'}.pdf`)
      if (currentCVId) trackDownload(currentCVId)
    } catch (err) {
      console.error('PDF export failed:', err)
      alert('PDF export failed. Please try again.')
    } finally {
      setPdfLoading(false)
    }
  }

  const handleShare = () => {
    const data = btoa(encodeURIComponent(JSON.stringify({ cv, settings })))
    const url = `${window.location.origin}/share?data=${data}`
    navigator.clipboard.writeText(url).then(() => alert('Share link copied to clipboard!'))
  }

  const ats = checkATS(cv)

  const sectionLabels = {
    summary: 'Summary', experience: 'Experience', education: 'Education',
    skills: 'Skills', certifications: 'Certifications', projects: 'Projects', languages: 'Languages',
  }

  return (
    <div>
      {/* Mobile Form/Preview tab toggle */}
      <div style={{ display: 'none' }} className="mobile-panel-toggle">
        <div style={{ display: 'flex', background: '#13111e', borderBottom: '1px solid #2d2a4a' }}>
          {[['form', '✏️ Edit CV'], ['preview', '👁 Preview']].map(([panel, label]) => (
            <button key={panel} onClick={() => setMobilePanel(panel)} style={{
              flex: 1, padding: '13px', border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: 14, fontFamily: 'Inter, sans-serif',
              background: mobilePanel === panel ? '#2e1065' : 'transparent',
              color: mobilePanel === panel ? '#c4b5fd' : '#9b959e',
              borderBottom: mobilePanel === panel ? '2px solid #7c3aed' : '2px solid transparent',
            }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="builder-layout" style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden', background: '#0d0d14' }}>
      {/* ── Left Panel: Form ────────────────────────────────────────────── */}
      <div className="builder-left-panel" style={{
        width: 420, flexShrink: 0, background: '#13111e',
        borderRight: '1px solid #2d2a4a', display: 'flex', flexDirection: 'column', overflowY: 'auto',
      }}>
        {/* Toolbar */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #201d36', display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn-ghost" style={{ fontSize: 12 }} onClick={() => setShowSections(!showSections)}>
            <GripVertical size={14} /> Sections
          </button>
          <div style={{ position: 'relative' }}>
            <button className="btn-ghost" style={{ fontSize: 12 }} onClick={() => setShowColorPicker(!showColorPicker)}>
              <Palette size={14} />
              <span style={{ width: 14, height: 14, borderRadius: '50%', background: settings.primaryColor, border: '1px solid #e5e7eb', display: 'inline-block' }} />
            </button>
            {showColorPicker && (
              <div style={{ position: 'absolute', zIndex: 200, top: '110%', left: 0, background: 'white', padding: 12, borderRadius: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.15)', border: '1px solid #e5e7eb' }}>
                <HexColorPicker color={settings.primaryColor} onChange={setPrimaryColor} />
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                  {['#2563eb','#7c3aed','#065f46','#0f172a','#dc2626','#d97706','#0891b2'].map(c => (
                    <div key={c} onClick={() => { setPrimaryColor(c); setShowColorPicker(false) }} style={{ width: 22, height: 22, borderRadius: '50%', background: c, cursor: 'pointer', border: settings.primaryColor === c ? '3px solid #111' : '1px solid #e5e7eb' }} />
                  ))}
                </div>
                <button className="btn-ghost" style={{ fontSize: 12, marginTop: 8, width: '100%' }} onClick={() => setShowColorPicker(false)}>Done</button>
              </div>
            )}
          </div>
          <select className="form-input" style={{ width: 'auto', fontSize: 12, padding: '6px 10px' }} value={settings.font} onChange={e => setFont(e.target.value)}>
            {FONTS.map(f => <option key={f}>{f}</option>)}
          </select>
          <button className="btn-ghost" style={{ fontSize: 12, color: ats.score < 70 ? '#ef4444' : '#10b981' }} onClick={() => setShowATS(!showATS)}>
            <Bug size={14} /> ATS {ats.score}%
          </button>
        </div>

        {/* ATS Panel */}
        {showATS && (
          <div style={{ margin: '12px 16px', background: ats.score >= 80 ? '#d1fae5' : ats.score >= 60 ? '#fef3c7' : '#fee2e2', borderRadius: 10, padding: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: '#111827' }}>ATS Score: {ats.score}/100</div>
            <div style={{ height: 6, background: '#e5e7eb', borderRadius: 99, marginBottom: 12 }}>
              <div style={{ height: 6, borderRadius: 99, background: ats.score >= 80 ? '#10b981' : ats.score >= 60 ? '#f59e0b' : '#ef4444', width: `${ats.score}%`, transition: 'width 0.5s ease' }} />
            </div>
            {ats.issues.length === 0 ? (
              <div style={{ color: '#065f46', fontSize: 13 }}>✅ Great — your CV is ATS-ready!</div>
            ) : ats.issues.map((issue, i) => (
              <div key={i} style={{ fontSize: 12, color: '#374151', marginBottom: 6 }}>{issue}</div>
            ))}
          </div>
        )}

        {/* Section reorder */}
        {showSections && (
          <div style={{ margin: '12px 16px', padding: 14, background: '#f9fafb', borderRadius: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 10 }}>Drag to reorder · Toggle visibility</div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={settings.sectionOrder} strategy={verticalListSortingStrategy}>
                {settings.sectionOrder.map(s => (
                  <SortableSection key={s} id={s} label={sectionLabels[s] || s} isHidden={settings.hiddenSections.includes(s)} onToggle={() => toggleSection(s)} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        )}

        {/* Template picker */}
        <div style={{ padding: '10px 16px', borderBottom: '1px solid #201d36', display: 'flex', gap: 6, overflowX: 'auto' }}>
          {TEMPLATES.map(t => (
            <button key={t.id} onClick={() => setTemplate(t.id)} style={{
              flexShrink: 0, padding: '5px 12px', borderRadius: 999, fontSize: 11.5, fontWeight: 600, cursor: 'pointer', border: 'none', fontFamily: 'Inter, sans-serif',
              background: settings.template === t.id ? t.color : '#f3f4f6',
              color: settings.template === t.id ? 'white' : '#6b7280',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Form tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #201d36', overflowX: 'auto' }}>
          {FORM_TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flexShrink: 0, padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: 12.5, fontFamily: 'Inter, sans-serif',
              color: activeTab === tab.id ? '#c4b5fd' : '#9b959e',
              borderBottom: activeTab === tab.id ? '2px solid #7c3aed' : '2px solid transparent',
              display: 'flex', alignItems: 'center', gap: 5,
              transition: 'color 0.2s',
            }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Form content */}
        <div style={{ padding: 16, flex: 1, overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
              {activeTab === 'personal' && <PersonalForm />}
              {activeTab === 'summary' && <SummaryForm />}
              {activeTab === 'education' && <EducationForm />}
              {activeTab === 'experience' && <ExperienceForm />}
              {activeTab === 'skills' && <SkillsForm />}
              {activeTab === 'certifications' && <CertificationsForm />}
              {activeTab === 'projects' && <ProjectsForm />}
              {activeTab === 'languages' && <LanguagesForm />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom action bar */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid #201d36', display: 'flex', gap: 8, background: '#13111e' }}>
          <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center', fontSize: 13 }} onClick={handleSave}>
            {savedMsg ? <><CheckCircle size={15} color="#10b981" /> Saved!</> : <><Save size={15} /> Save</>}
          </button>
          <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center', fontSize: 13 }} onClick={handleShare}>
            <Share2 size={15} /> Share
          </button>
          <button className="btn-primary" style={{ flex: 1.5, justifyContent: 'center', fontSize: 13, opacity: pdfLoading ? 0.7 : 1 }} onClick={handlePDFExport} disabled={pdfLoading}>
            {pdfLoading ? '⏳ Exporting…' : <><Download size={15} /> PDF</>}
          </button>
        </div>
      </div>

      {/* ── Right Panel: Live Preview ────────────────────────────────────── */}
      <div className="builder-right-panel" style={{ flex: 1, background: '#070710', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 16px' }}>
        <div style={{ fontSize: 11, color: '#4a4560', marginBottom: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Live Preview · A4</div>

        {/* Responsive preview wrapper — scales full A4 to container width */}
        <div
          ref={previewContainerRef}
          style={{ width: '100%', maxWidth: 794, position: 'relative' }}
        >
          {/* Outer box that reserves the scaled height */}
          <div style={{ width: '100%', paddingTop: `${297 / 210 * 100}%`, position: 'relative' }}>
            <div
              id="cv-preview-inner"
              style={{
                position: 'absolute', top: 0, left: 0,
                width: 794, height: 1123,
                transformOrigin: 'top left',
                transform: `scale(${previewScale})`,
                background: 'white',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                overflow: 'hidden',
              }}
            >
              <CVPreview />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={handlePDFExport} disabled={pdfLoading}
            style={{ opacity: pdfLoading ? 0.7 : 1 }}>
            {pdfLoading ? '⏳ Exporting…' : <><Download size={16} /> Download PDF</>}
          </button>
          <button className="btn-outline" onClick={handleShare}><Share2 size={16} /> Copy Share Link</button>
        </div>
      </div>
      </div>
      {/* End builder-layout ↑ */}

      {/* Hidden off-screen element — always rendered for reliable PDF export on mobile */}
      <div id="cv-pdf-export" style={{
        position: 'fixed', left: '-9999px', top: 0,
        width: '210mm', background: 'white', overflow: 'hidden',
        pointerEvents: 'none', zIndex: -1,
      }}>
        <CVPreview scale={1} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-panel-toggle { display: block !important; }
          .builder-left-panel { display: ${mobilePanel === 'form' ? 'flex' : 'none'} !important; }
          .builder-right-panel { display: ${mobilePanel === 'preview' ? 'flex' : 'none'} !important; }
          .builder-layout { height: auto !important; overflow: visible !important; }
        }
      `}</style>
    </div>
  )
}
