import React from 'react'

export default function CreativeDesigner({ cv, settings }) {
  const { personal, summary, experience, education, skills, certifications, projects, languages } = cv
  const { primaryColor = '#7c3aed', font = 'Poppins', hiddenSections = [] } = settings
  const accent = primaryColor

  return (
    <div style={{ fontFamily: `${font}, sans-serif`, color: '#1f2937', fontSize: 11, lineHeight: 1.5 }}>
      {/* Diagonal header */}
      <div style={{ position: 'relative', background: accent, color: 'white', padding: '32px 32px 48px', clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {personal.photo ? (
            <img src={personal.photo} alt="" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.5)' }} />
          ) : (
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700 }}>
              {(personal.name || 'Y').charAt(0)}
            </div>
          )}
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{personal.name || 'Your Name'}</div>
            {personal.title && <div style={{ fontSize: 14, fontWeight: 600, color: primaryColor, marginBottom: 10 }}>{personal.title}</div>}
            <div style={{ opacity: 0.85, display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 10.5 }}>
              {personal.email && <span>✉ {personal.email}</span>}
              {personal.phone && <span>📞 {personal.phone}</span>}
              {personal.website && <span>🌐 {personal.website}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 32px 24px', marginTop: -16 }}>
        {/* Summary */}
        {!hiddenSections.includes('summary') && summary && (
          <div style={{ marginBottom: 20, background: `${accent}10`, borderRadius: 10, padding: 16, borderLeft: `4px solid ${accent}` }}>
            <p style={{ color: '#374151', lineHeight: 1.7 }}>{summary}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            {!hiddenSections.includes('experience') && experience.length > 0 && (
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 20, height: 3, background: accent, borderRadius: 2 }} />
                  Experience
                </div>
                {experience.map(exp => (
                  <div key={exp.id} style={{ marginBottom: 14 }}>
                    <div style={{ fontWeight: 700, fontSize: 12, color: '#111827' }}>{exp.title}</div>
                    <div style={{ color: accent, fontWeight: 600 }}>{exp.company}</div>
                    <div style={{ fontSize: 9.5, color: '#9ca3af', marginBottom: 4 }}>{exp.startDate} – {exp.endDate || 'Present'}</div>
                    {exp.description && <p style={{ color: '#4b5563', lineHeight: 1.6 }}>{exp.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {!hiddenSections.includes('projects') && projects.length > 0 && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 20, height: 3, background: accent, borderRadius: 2 }} />
                  Projects
                </div>
                {projects.map(proj => (
                  <div key={proj.id} style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, color: '#111827' }}>{proj.name}</div>
                    {proj.description && <p style={{ color: '#4b5563', lineHeight: 1.6, marginTop: 4 }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {!hiddenSections.includes('education') && education.length > 0 && (
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 20, height: 3, background: accent, borderRadius: 2 }} />
                  Education
                </div>
                {education.map(edu => (
                  <div key={edu.id} style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, color: '#111827' }}>{edu.degree}</div>
                    <div style={{ color: accent, fontWeight: 600 }}>{edu.school}</div>
                    <div style={{ fontSize: 10, color: '#9ca3af' }}>{edu.startYear} – {edu.endYear}</div>
                  </div>
                ))}
              </div>
            )}

            {!hiddenSections.includes('skills') && (skills.technical.length > 0 || skills.soft.length > 0) && (
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 20, height: 3, background: accent, borderRadius: 2 }} />
                  Skills
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {[...skills.technical, ...skills.soft].map((s, i) => (
                    <span key={i} style={{ background: `${accent}15`, color: accent, padding: '3px 10px', borderRadius: 99, fontSize: 10, fontWeight: 600 }}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            {!hiddenSections.includes('certifications') && certifications.length > 0 && (
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 20, height: 3, background: accent, borderRadius: 2 }} />
                  Certifications
                </div>
                {certifications.map(cert => (
                  <div key={cert.id} style={{ marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, color: '#111827' }}>{cert.name}</div>
                    {cert.issuer && <div style={{ color: '#6b7280', fontSize: 10 }}>{cert.issuer} · {cert.date}</div>}
                  </div>
                ))}
              </div>
            )}

            {!hiddenSections.includes('languages') && languages.length > 0 && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 20, height: 3, background: accent, borderRadius: 2 }} />
                  Languages
                </div>
                {languages.map(lang => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600 }}>{lang.name}</span>
                    <span style={{ color: '#6b7280' }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
