import React, { useRef } from 'react'
import { useCVStore } from '../../store/cvStore'
import ModernMinimal from './templates/ModernMinimal'
import CorporateExecutive from './templates/CorporateExecutive'
import CreativeDesigner from './templates/CreativeDesigner'
import AcademicResearch from './templates/AcademicResearch'
import TechProfessional from './templates/TechProfessional'

const TEMPLATES = {
  'modern-minimal': ModernMinimal,
  'corporate-executive': CorporateExecutive,
  'creative-designer': CreativeDesigner,
  'academic-research': AcademicResearch,
  'tech-professional': TechProfessional,
}

export default function CVPreview({ scale = 0.5 }) {
  const cv = useCVStore(s => s.cv)
  const settings = useCVStore(s => s.settings)
  const previewRef = useRef(null)

  const TemplateComponent = TEMPLATES[settings.template] || ModernMinimal

  return (
    <div ref={previewRef} id="cv-preview-root" style={{
      width: `${210 * scale}mm`,
      minHeight: `${297 * scale}mm`,
      background: 'white',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      borderRadius: 4,
      transform: `scale(${scale > 0.5 ? 1 : 1})`,
    }}>
      <div style={{
        width: '210mm',
        minHeight: '297mm',
        background: 'white',
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
        overflow: 'hidden',
      }}>
        <TemplateComponent cv={cv} settings={settings} />
      </div>
    </div>
  )
}

// Full-size version for export
export function CVPreviewFull() {
  const cv = useCVStore(s => s.cv)
  const settings = useCVStore(s => s.settings)
  const TemplateComponent = TEMPLATES[settings.template] || ModernMinimal

  return (
    <div id="cv-full-preview" style={{ width: '210mm', minHeight: '297mm', background: 'white' }}>
      <TemplateComponent cv={cv} settings={settings} />
    </div>
  )
}
