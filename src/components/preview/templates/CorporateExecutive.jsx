import React from 'react'

export default function CorporateExecutive({ cv, settings }) {
  const { personal, summary, experience, education, skills, certifications, projects, languages } = cv
  const { primaryColor = '#1e40af', font = 'Inter', hiddenSections = [] } = settings

  return (
    <div style={{ fontFamily: `${font}, sans-serif`, color: '#1f2937', fontSize: 11, lineHeight: 1.5, display: 'flex', minHeight: '297mm' }}>
      {/* Sidebar */}
      <div style={{ width: '34%', background: primaryColor, color: 'white', padding: '28px 18px', flexShrink: 0 }}>
        {personal.photo && (
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <img src={personal.photo} alt="" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)' }} />
          </div>
        )}
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4, lineHeight: 1.2 }}>{personal.name || 'Your Name'}</div>
        {personal.title && <div style={{ fontSize: 12, fontWeight: 600, color: '#4b5563', marginBottom: 10, textTransform: 'uppercase' }}>{personal.title}</div>}

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', marginTop: 16, paddingTop: 16 }}>
          <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: 10 }}>Contact</div>
          {personal.email && <div style={{ fontSize: 10, marginBottom: 7, opacity: 0.9, wordBreak: 'break-all' }}>✉ {personal.email}</div>}
          {personal.phone && <div style={{ fontSize: 10, marginBottom: 7, opacity: 0.9 }}>📞 {personal.phone}</div>}
          {personal.linkedin && <div style={{ fontSize: 10, marginBottom: 7, opacity: 0.9, wordBreak: 'break-all' }}>in {personal.linkedin}</div>}
          {personal.address && <div style={{ fontSize: 10, marginBottom: 7, opacity: 0.9 }}>📍 {personal.address}</div>}
        </div>

        {!hiddenSections.includes('skills') && (skills.technical.length > 0 || skills.soft.length > 0) && (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', marginTop: 14, paddingTop: 14 }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: 10 }}>Skills</div>
            {skills.technical.map((s, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, opacity: 0.9, marginBottom: 3 }}>{s}</div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                  <div style={{ height: 3, background: 'rgba(255,255,255,0.7)', borderRadius: 2, width: `${70 + (i * 7) % 30}%` }} />
                </div>
              </div>
            ))}
            {skills.soft.map((s, i) => (
              <div key={i} style={{ fontSize: 10, opacity: 0.8, marginBottom: 6 }}>• {s}</div>
            ))}
          </div>
        )}

        {!hiddenSections.includes('languages') && languages.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', marginTop: 14, paddingTop: 14 }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: 10 }}>Languages</div>
            {languages.map(lang => (
              <div key={lang.id} style={{ fontSize: 10, opacity: 0.9, marginBottom: 6 }}>
                {lang.name}{lang.level && <span style={{ opacity: 0.7 }}> · {lang.level}</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '28px 24px' }}>
        {!hiddenSections.includes('summary') && summary && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: 8 }}>Summary</div>
            <p style={{ color: '#374151', lineHeight: 1.65 }}>{summary}</p>
          </div>
        )}

        {!hiddenSections.includes('experience') && experience.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, borderBottom: `2px solid ${primaryColor}`, paddingBottom: 3, marginBottom: 10 }}>Experience</div>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 14, paddingLeft: 12, borderLeft: `3px solid ${primaryColor}20` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: '#111827' }}>{exp.title}</div>
                  <div style={{ fontSize: 10, color: '#9ca3af' }}>{exp.startDate} – {exp.endDate || 'Present'}</div>
                </div>
                <div style={{ color: primaryColor, fontWeight: 600, fontSize: 11, marginBottom: 6 }}>{exp.company}</div>
                {exp.description && <p style={{ color: '#4b5563', lineHeight: 1.6 }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {!hiddenSections.includes('education') && education.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, borderBottom: `2px solid ${primaryColor}`, paddingBottom: 3, marginBottom: 10 }}>Education</div>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12, color: '#111827' }}>{edu.degree}</div>
                  <div style={{ color: primaryColor, fontWeight: 600 }}>{edu.school}</div>
                </div>
                <div style={{ fontSize: 10, color: '#9ca3af' }}>{edu.startYear} – {edu.endYear}</div>
              </div>
            ))}
          </div>
        )}

        {!hiddenSections.includes('certifications') && certifications.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, borderBottom: `2px solid ${primaryColor}`, paddingBottom: 3, marginBottom: 10 }}>Certifications</div>
            {certifications.map(cert => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div><b>{cert.name}</b>{cert.issuer && <span style={{ color: '#6b7280' }}> · {cert.issuer}</span>}</div>
                {cert.date && <span style={{ color: '#9ca3af', fontSize: 10 }}>{cert.date}</span>}
              </div>
            ))}
          </div>
        )}

        {!hiddenSections.includes('projects') && projects.length > 0 && (
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, borderBottom: `2px solid ${primaryColor}`, paddingBottom: 3, marginBottom: 10 }}>Projects</div>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: '#111827' }}>{proj.name}</div>
                {proj.description && <p style={{ color: '#4b5563', lineHeight: 1.6, marginTop: 4 }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
