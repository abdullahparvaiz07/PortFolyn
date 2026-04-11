import React from 'react'

const NEON_CYAN = '#00f5ff'
const NEON_MAG  = '#f000ff'

function NeonSection({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em',
        background: `linear-gradient(90deg, ${NEON_CYAN}, ${NEON_MAG})`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: 8,
      }}>
        {title}
      </div>
      <div style={{ borderBottom: `1px solid ${NEON_CYAN}30`, marginBottom: 10 }} />
      {children}
    </div>
  )
}

export default function NeonFuturistic({ cv, settings }) {
  const { personal, summary, experience, education, skills, certifications, projects, languages } = cv
  const { font = 'Inter', hiddenSections = [] } = settings

  return (
    <div style={{
      fontFamily: `${font}, sans-serif`, color: '#c8d6e5', fontSize: 10.5,
      lineHeight: 1.6, background: '#060614', minHeight: '100%',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0d0d2b 0%, #12012e 100%)',
        borderBottom: `2px solid transparent`,
        borderImage: `linear-gradient(90deg, ${NEON_CYAN}, ${NEON_MAG}) 1`,
        padding: '30px 28px 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Photo */}
          {personal.photo ? (
            <div style={{
              width: 80, height: 80, borderRadius: '50%', flexShrink: 0,
              padding: 3,
              background: `linear-gradient(135deg, ${NEON_CYAN}, ${NEON_MAG})`,
            }}>
              <img
                src={personal.photo}
                alt=""
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ) : (
            <div style={{
              width: 80, height: 80, borderRadius: '50%', flexShrink: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800,
              background: `linear-gradient(135deg, ${NEON_CYAN}22, ${NEON_MAG}22)`,
              border: `2px solid ${NEON_CYAN}60`,
              color: NEON_CYAN,
            }}>
              {(personal.name || 'Y').charAt(0)}
            </div>
          )}

          <div>
            <div style={{
              fontSize: 24, fontWeight: 900, marginBottom: 6,
              background: `linear-gradient(90deg, ${NEON_CYAN}, ${NEON_MAG})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {personal.name || 'Your Name'}
            </div>
            {personal.title && (
              <div style={{
                fontSize: 14, fontWeight: 600, color: '#9ca3af',
                textShadow: `0 0 10px ${primaryColor}80`,
                marginTop: 4
              }}>
                {personal.title}
              </div>
            )}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 10, color: '#7a8799' }}>
              {personal.email   && <span style={{ color: NEON_CYAN }}>✉ {personal.email}</span>}
              {personal.phone   && <span>📞 {personal.phone}</span>}
              {personal.linkedin && <span style={{ color: `${NEON_MAG}cc` }}>in {personal.linkedin}</span>}
              {personal.address  && <span>📍 {personal.address}</span>}
              {personal.website  && <span style={{ color: NEON_CYAN }}>🌐 {personal.website}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '60% 40%' }}>
        {/* Left */}
        <div style={{ padding: '20px 20px 20px 28px', borderRight: `1px solid ${NEON_CYAN}15` }}>
          {!hiddenSections.includes('summary') && summary && (
            <NeonSection title="Mission Brief">
              <p style={{ color: '#9ab0c8', lineHeight: 1.7 }}>{summary}</p>
            </NeonSection>
          )}

          {!hiddenSections.includes('experience') && experience.length > 0 && (
            <NeonSection title="Experience Log">
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: 14, paddingLeft: 12, borderLeft: `2px solid ${NEON_CYAN}40` }}>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: 12 }}>{exp.title}</div>
                  <div style={{ color: NEON_CYAN, fontSize: 11, marginBottom: 2 }}>{exp.company}</div>
                  <div style={{ fontSize: 9.5, color: '#4a5568', marginBottom: 4 }}>{exp.startDate} — {exp.endDate || 'Present'}</div>
                  {exp.description && <p style={{ color: '#9ab0c8', lineHeight: 1.6 }}>{exp.description}</p>}
                </div>
              ))}
            </NeonSection>
          )}

          {!hiddenSections.includes('projects') && projects.length > 0 && (
            <NeonSection title="Projects">
              {projects.map(proj => (
                <div key={proj.id} style={{
                  marginBottom: 12, background: `${NEON_CYAN}08`,
                  border: `1px solid ${NEON_CYAN}20`, borderRadius: 6, padding: '10px 12px',
                }}>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: 11.5 }}>{proj.name}</div>
                  {proj.description && <p style={{ color: '#9ab0c8', lineHeight: 1.6, marginTop: 4 }}>{proj.description}</p>}
                  {proj.url && <div style={{ color: NEON_CYAN, fontSize: 9.5, marginTop: 6 }}>{proj.url}</div>}
                </div>
              ))}
            </NeonSection>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ padding: '20px 24px 20px 16px', background: '#0a0a1e' }}>
          {!hiddenSections.includes('skills') && (skills.technical.length > 0 || skills.soft.length > 0) && (
            <NeonSection title="Tech Stack">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.technical.map((s, i) => (
                  <span key={i} style={{
                    fontSize: 9.5, fontWeight: 600,
                    background: `${NEON_CYAN}15`, color: NEON_CYAN,
                    border: `1px solid ${NEON_CYAN}40`,
                    padding: '2px 8px', borderRadius: 4,
                  }}>{s}</span>
                ))}
              </div>
              {skills.soft.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  {skills.soft.map((s, i) => (
                    <div key={i} style={{ fontSize: 10, color: '#9ab0c8', marginBottom: 4 }}>• {s}</div>
                  ))}
                </div>
              )}
            </NeonSection>
          )}

          {!hiddenSections.includes('education') && education.length > 0 && (
            <NeonSection title="Education">
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: 11 }}>{edu.degree}</div>
                  <div style={{ color: NEON_MAG, fontSize: 10.5 }}>{edu.school}</div>
                  <div style={{ color: '#4a5568', fontSize: 10 }}>{edu.startYear} – {edu.endYear}</div>
                </div>
              ))}
            </NeonSection>
          )}

          {!hiddenSections.includes('certifications') && certifications.length > 0 && (
            <NeonSection title="Certifications">
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 600, color: 'white', fontSize: 10.5 }}>{cert.name}</div>
                  {cert.issuer && <div style={{ color: '#4a5568', fontSize: 10 }}>{cert.issuer} · {cert.date}</div>}
                </div>
              ))}
            </NeonSection>
          )}

          {!hiddenSections.includes('languages') && languages.length > 0 && (
            <NeonSection title="Languages">
              {languages.map(lang => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 6 }}>
                  <span style={{ color: 'white', fontWeight: 600 }}>{lang.name}</span>
                  <span style={{ color: '#4a5568' }}>{lang.level}</span>
                </div>
              ))}
            </NeonSection>
          )}
        </div>
      </div>
    </div>
  )
}
