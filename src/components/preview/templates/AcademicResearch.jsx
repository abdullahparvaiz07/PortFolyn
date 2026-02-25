import React from 'react'

export default function AcademicResearch({ cv, settings }) {
  const { personal, summary, experience, education, skills, certifications, projects, languages } = cv
  const { primaryColor = '#065f46', font = 'Playfair Display', hiddenSections = [] } = settings

  return (
    <div style={{ fontFamily: `${font}, serif`, color: '#1f2937', fontSize: 10.5, lineHeight: 1.6, padding: '28px 36px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: `2px solid ${primaryColor}`, paddingBottom: 16, marginBottom: 20 }}>
        {personal.photo && (
          <img src={personal.photo} alt="" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${primaryColor}`, marginBottom: 10 }} />
        )}
        <div style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>{personal.name || 'Your Name'}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap', fontSize: 10, color: '#6b7280' }}>
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.phone && <span>📞 {personal.phone}</span>}
          {personal.linkedin && <span>in {personal.linkedin}</span>}
          {personal.address && <span>📍 {personal.address}</span>}
          {personal.website && <span>🌐 {personal.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {!hiddenSections.includes('summary') && summary && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Research Statement</div>
          <p style={{ color: '#374151', lineHeight: 1.75, fontStyle: 'italic' }}>{summary}</p>
        </div>
      )}

      {/* Education */}
      {!hiddenSections.includes('education') && education.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.12em', borderBottom: `1px solid ${primaryColor}40`, paddingBottom: 4, marginBottom: 10 }}>Education</div>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{edu.degree}</div>
                <div style={{ color: primaryColor, fontStyle: 'italic' }}>{edu.school}</div>
                {edu.gpa && <div style={{ color: '#6b7280', fontSize: 10 }}>GPA: {edu.gpa}</div>}
                {edu.thesis && <div style={{ color: '#6b7280', fontSize: 10 }}>Thesis: {edu.thesis}</div>}
              </div>
              <div style={{ color: '#9ca3af', fontSize: 10, whiteSpace: 'nowrap' }}>{edu.startYear} – {edu.endYear}</div>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {!hiddenSections.includes('experience') && experience.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.12em', borderBottom: `1px solid ${primaryColor}40`, paddingBottom: 4, marginBottom: 10 }}>Academic & Professional Experience</div>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{exp.title}</div>
                <div style={{ fontSize: 10, color: '#9ca3af' }}>{exp.startDate} – {exp.endDate || 'Present'}</div>
              </div>
              <div style={{ color: primaryColor, fontStyle: 'italic' }}>{exp.company}</div>
              {exp.description && <p style={{ color: '#4b5563', lineHeight: 1.65, marginTop: 4 }}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {!hiddenSections.includes('projects') && projects.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.12em', borderBottom: `1px solid ${primaryColor}40`, paddingBottom: 4, marginBottom: 10 }}>Research & Projects</div>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 12 }}>{proj.name}</div>
              {proj.description && <p style={{ color: '#4b5563', lineHeight: 1.65, marginTop: 4 }}>{proj.description}</p>}
              {proj.url && <div style={{ color: primaryColor, fontSize: 10, marginTop: 4 }}>{proj.url}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills & Certifications in two cols */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {!hiddenSections.includes('skills') && (skills.technical.length > 0 || skills.soft.length > 0) && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.12em', borderBottom: `1px solid ${primaryColor}40`, paddingBottom: 4, marginBottom: 10 }}>Skills</div>
            {skills.technical.map((s, i) => <div key={i} style={{ fontSize: 10.5, color: '#374151', marginBottom: 4 }}>• {s}</div>)}
            {skills.soft.map((s, i) => <div key={i} style={{ fontSize: 10.5, color: '#374151', marginBottom: 4 }}>• {s}</div>)}
          </div>
        )}
        {!hiddenSections.includes('certifications') && certifications.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.12em', borderBottom: `1px solid ${primaryColor}40`, paddingBottom: 4, marginBottom: 10 }}>Certifications</div>
            {certifications.map(cert => (
              <div key={cert.id} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 10.5 }}>{cert.name}</div>
                {cert.issuer && <div style={{ color: '#6b7280', fontSize: 10 }}>{cert.issuer} · {cert.date}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {!hiddenSections.includes('languages') && languages.length > 0 && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.12em', borderBottom: `1px solid ${primaryColor}40`, paddingBottom: 4, marginBottom: 10 }}>Languages</div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {languages.map(lang => (
              <span key={lang.id} style={{ fontSize: 10.5 }}><b>{lang.name}</b>{lang.level && <span style={{ color: '#6b7280' }}> ({lang.level})</span>}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
