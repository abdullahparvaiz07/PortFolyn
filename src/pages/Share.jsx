import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ModernMinimal from '../components/preview/templates/ModernMinimal'
import CorporateExecutive from '../components/preview/templates/CorporateExecutive'
import CreativeDesigner from '../components/preview/templates/CreativeDesigner'
import AcademicResearch from '../components/preview/templates/AcademicResearch'
import TechProfessional from '../components/preview/templates/TechProfessional'
import { FileText, AlertCircle, Download } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const TEMPLATES = {
  'modern-minimal': ModernMinimal,
  'corporate-executive': CorporateExecutive,
  'creative-designer': CreativeDesigner,
  'academic-research': AcademicResearch,
  'tech-professional': TechProfessional,
}

export default function Share() {
  const [downloading, setDownloading] = useState(false)

  const { cv, settings, error } = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    const data = params.get('data')
    if (!data) return { cv: null, settings: null, error: 'No CV data found in URL.' }
    try {
      const parsed = JSON.parse(decodeURIComponent(atob(data)))
      return { cv: parsed.cv, settings: parsed.settings, error: null }
    } catch {
      return { cv: null, settings: null, error: 'Invalid or corrupted share link.' }
    }
  }, [])

  const handlePDF = async () => {
    setDownloading(true)
    const el = document.getElementById('share-cv-preview')
    if (!el) return
    const canvas = await html2canvas(el, {
      scale: 4,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: el.scrollWidth,
      height: el.scrollHeight,
    })
    const imgData = canvas.toDataURL('image/png', 1.0)
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`${cv?.personal?.name || 'shared-cv'}.pdf`)
    setDownloading(false)
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 128px)', textAlign: 'center', padding: 32 }}>
        <AlertCircle size={64} color="#ef4444" style={{ marginBottom: 20 }} />
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111827', marginBottom: 8 }}>Share link error</h1>
        <p style={{ color: '#6b7280', marginBottom: 24 }}>{error}</p>
        <Link to="/builder"><button className="btn-primary">Create Your Own CV</button></Link>
      </div>
    )
  }

  const TemplateComponent = TEMPLATES[settings.template] || ModernMinimal

  return (
    <div style={{ background: '#f3f4f6', minHeight: 'calc(100vh - 128px)', padding: '32px 24px' }}>
      {/* Top bar */}
      <div style={{ maxWidth: '210mm', margin: '0 auto 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Shared CV</div>
          <h2 style={{ fontWeight: 800, fontSize: 20, color: '#111827' }}>{cv?.personal?.name || 'Professional CV'}</h2>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/builder" style={{ textDecoration: 'none' }}>
            <button className="btn-outline"><FileText size={15} /> Create Mine</button>
          </Link>
          <button className="btn-primary" onClick={handlePDF} disabled={downloading}>
            <Download size={15} /> {downloading ? 'Exporting…' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* CV */}
      <div id="share-cv-preview" style={{ width: '210mm', minHeight: '297mm', background: 'white', margin: '0 auto', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
        <TemplateComponent cv={cv} settings={settings} />
      </div>
    </div>
  )
}
