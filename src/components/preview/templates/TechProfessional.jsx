import React from 'react'

export default function TechProfessional({ cv, settings }) {
  const { personal, summary, experience, education, skills, certifications, projects, languages } = cv
  const { primaryColor = '#0f172a', font = 'JetBrains Mono', hiddenSections = [] } = settings
  const accent = '#38bdf8'

  return (
    <div style={{ fontFamily: `${font}, monospace`, color: '#e2e8f0', fontSize: 10.5, lineHeight: 1.6, background: '#0f172a', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ background: '#1e293b', padding: '24px 28px', borderBottom: `2px solid ${accent}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {personal.photo ? (
            <img src={personal.photo} alt="" style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover', border: `2px solid ${accent}` }} />
          ) : (
            <div style={{ width: 64, height: 64, borderRadius: 8, background: '#334155', border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: accent }}>
              {(personal.name || 'Y').charAt(0)}
            </div>
          )}
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 4 }}>{personal.name || 'Your Name'}</div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 10, color: '#94a3b8' }}>
              {personal.email && <span style={{ color: accent }}>✉ {personal.email}</span>}
              {personal.phone && <span>📞 {personal.phone}</span>}
              {personal.linkedin && <span>in {personal.linkedin}</span>}
              {personal.website && <span>🌐 {personal.website}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '60% 40%' }}>
        {/* Left main */}
        <div style={{ padding: '20px 20px 20px 28px', borderRight: '1px solid #1e293b' }}>
          {!hiddenSections.includes('summary') && summary && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
                <span style={{ color: '#64748b' }}>// </span>about
              </div>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>{summary}</p>
            </div>
          )}

          {!hiddenSections.includes('experience') && experience.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
                <span style={{ color: '#64748b' }}>// </span>experience
              </div>
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: 14, paddingLeft: 12, borderLeft: `2px solid ${accent}40` }}>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: 12 }}>{exp.title}</div>
                  <div style={{ color: accent, fontSize: 11 }}>{exp.company}</div>
                  <div style={{ fontSize: 9.5, color: '#64748b', marginBottom: 4 }}>{exp.startDate} — {exp.endDate || 'Present'}</div>
                  {exp.description && <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {!hiddenSections.includes('projects') && projects.length > 0 && (
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
                <span style={{ color: '#64748b' }}>// </span>projects
              </div>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: 12, background: '#1e293b', borderRadius: 6, padding: '10px 12px', border: `1px solid #334155` }}>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: 11.5 }}>{proj.name}</div>
                  {proj.description && <p style={{ color: '#94a3b8', lineHeight: 1.6, marginTop: 4 }}>{proj.description}</p>}
                  {proj.url && <div style={{ color: accent, fontSize: 9.5, marginTop: 6 }}>{proj.url}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ padding: '20px 24px 20px 16px', background: '#0a1120' }}>
          {!hiddenSections.includes('skills') && (skills.technical.length > 0 || skills.soft.length > 0) && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
                <span style={{ color: '#64748b' }}>// </span>stack
              </div>
              {skills.technical.map((s, i) => (
                <div key={i} style={{ background: '#1e293b', border: `1px solid ${accent}30`, borderRadius: 4, padding: '3px 10px', marginBottom: 6, fontSize: 10, color: accent, display: 'inline-block', marginRight: 6 }}>{s}</div>
              ))}
              {skills.soft.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 9, color: '#64748b', marginBottom: 6 }}>// soft skills</div>
                  {skills.soft.map((s, i) => (
                    <div key={i} style={{ fontSize: 10, color: '#94a3b8', marginBottom: 4 }}>• {s}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!hiddenSections.includes('education') && education.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
                <span style={{ color: '#64748b' }}>// </span>education
              </div>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: 11 }}>{edu.degree}</div>
                  <div style={{ color: accent, fontSize: 10.5 }}>{edu.school}</div>
                  <div style={{ color: '#64748b', fontSize: 10 }}>{edu.startYear} – {edu.endYear}</div>
                </div>
              ))}
            </div>
          )}

          {!hiddenSections.includes('certifications') && certifications.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
                <span style={{ color: '#64748b' }}>// </span>certs
              </div>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: 8 }}>
                  <div style={{ color: 'white', fontSize: 10.5, fontWeight: 600 }}>{cert.name}</div>
                  {cert.issuer && <div style={{ color: '#64748b', fontSize: 10 }}>{cert.issuer} · {cert.date}</div>}
                </div>
              ))}
            </div>
          )}

          {!hiddenSections.includes('languages') && languages.length > 0 && (
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
                <span style={{ color: '#64748b' }}>// </span>languages
              </div>
              {languages.map(lang => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 10 }}>
                  <span style={{ color: 'white' }}>{lang.name}</span>
                  <span style={{ color: '#64748b' }}>{lang.level}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
