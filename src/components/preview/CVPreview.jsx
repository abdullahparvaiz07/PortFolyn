import React from 'react'
import { useCVStore } from '../../store/cvStore'
import ModernMinimal from './templates/ModernMinimal'
import CorporateExecutive from './templates/CorporateExecutive'
import AcademicResearch from './templates/AcademicResearch'
import TechProfessional from './templates/TechProfessional'
import ElegantClassic from './templates/ElegantClassic'
import GoldenPro from './templates/GoldenPro'
import VintageMuse from './templates/VintageMuse'
import BlueSidebar from './templates/BlueSidebar'

export const TEMPLATES = {
  'modern-minimal': ModernMinimal,
  'corporate-executive': CorporateExecutive,
  'academic-research': AcademicResearch,
  'tech-professional': TechProfessional,
  'elegant-classic': ElegantClassic,
  'golden-pro': GoldenPro,
  'vintage-muse': VintageMuse,
  'blue-sidebar': BlueSidebar,
}

// Scaled preview — renders a full A4 at native size but the parent must set
// the outer container width/transform. This component just outputs the raw
// 210mm × 297mm CV so the parent can scale it however it needs to.
export default function CVPreview() {
  const cv = useCVStore(s => s.cv)
  const settings = useCVStore(s => s.settings)
  const TemplateComponent = TEMPLATES[settings.template] || ModernMinimal

  return (
    <div
      id="cv-preview-root"
      style={{
        width: '210mm',
        minHeight: '297mm',
        background: 'white',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <TemplateComponent cv={cv} settings={settings} />
    </div>
  )
}

// Full-size version for export / printing
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
