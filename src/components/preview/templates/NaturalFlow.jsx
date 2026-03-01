import React from 'react'

const TERRA  = '#c26b2f'
const FOREST = '#4a7c59'
const CREAM  = '#fdf6ee'
const DARK   = '#2d2416'

function Card({ children, color }) {
  return (
    <div style={{
      background: 'white', borderRadius: 10, padding: '14px 16px', marginBottom: 14,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderLeft: `4px solid ${color || TERRA}`,
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ title, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: color || TERRA, flexShrink: 0 }} />
      <div style={{ fontSize: 11, fontWeight: 800, color: color || TERRA, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {title}
      </div>
      <div style={{ flex: 1, height: 1, background: `${color || TERRA}30` }} />
    </div>
  )
}

export default function NaturalFlow({ cv, settings }) {
  const { personal, summary, experience, education, skills, certifications, projects, languages } = cv
  const { primaryColor = TERRA, font = 'Inter', hiddenSections = [] } = settings
  const secColor = primaryColor === TERRA ? FOREST : primaryColor

  return (
    <div style={{ fontFamily: `${font}, sans-serif`, color: DARK, fontSize: 10.5, lineHeight: 1.6, background: CREAM, minHeight: '100%' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%)`,
        padding: '28px 32px 24px', color: 'white',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Photo */}
          {personal.photo ? (
            <img
              src={personal.photo}
              alt=""
              style={{
                width: 76, height: 76, borderRadius: 16, objectFit: 'cover', flexShrink: 0,
                border: '3px solid rgba(255,255,255,0.6)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}
            />
          ) : (
            <div style={{
              width: 76, height: 76, borderRadius: 16, flexShrink: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700,
              background: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.4)',
              color: 'white',
            }}>
              {(personal.name || 'Y').charAt(0)}
            </div>
          )}

          <div>
            <div style={{ fontSize: 23, fontWeight: 800, marginBottom: 6, lineHeight: 1.1 }}>
              {personal.name || 'Your Name'}
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 10, opacity: 0.9 }}>
              {personal.email    && <span>✉ {personal.email}</span>}
              {personal.phone    && <span>📞 {personal.phone}</span>}
              {personal.address  && <span>📍 {personal.address}</span>}
              {personal.website  && <span>🌐 {personal.website}</span>}
              {personal.linkedin && <span>in {personal.linkedin}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 24px' }}>
        {!hiddenSections.includes('summary') && summary && (
          <div style={{ marginBottom: 18 }}>
            <SectionTitle title="About Me" color={primaryColor} />
            <div style={{
              background: 'white', borderRadius: 10, padding: '12px 16px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)', borderTop: `3px solid ${primaryColor}`,
            }}>
              <p style={{ color: '#4a3728', lineHeight: 1.75 }}>{summary}</p>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Left column */}
          <div>
            {!hiddenSections.includes('experience') && experience.length > 0 && (
              <div style={{ marginBottom: 18 }}>
                <SectionTitle title="Experience" color={primaryColor} />
                {experience.map(exp => (
                  <Card key={exp.id} color={primaryColor}>
                    <div style={{ fontWeight: 700, fontSize: 11.5, color: DARK }}>{exp.title}</div>
                    <div style={{ color: primaryColor, fontWeight: 600, fontSize: 11, marginBottom: 2 }}>{exp.company}</div>
                    <div style={{ fontSize: 9.5, color: '#9c8068', marginBottom: 4 }}>{exp.startDate} – {exp.endDate || 'Present'}</div>
                    {exp.description && <p style={{ color: '#4a3728', lineHeight: 1.6 }}>{exp.description}</p>}
                  </Card>
                ))}
              </div>
            )}

            {!hiddenSections.includes('projects') && projects.length > 0 && (
              <div>
                <SectionTitle title="Projects" color={primaryColor} />
                {projects.map(proj => (
                  <Card key={proj.id} color={secColor}>
                    <div style={{ fontWeight: 700, fontSize: 11.5, color: DARK }}>{proj.name}</div>
                    {proj.description && <p style={{ color: '#4a3728', lineHeight: 1.6, marginTop: 4 }}>{proj.description}</p>}
                    {proj.url && <div style={{ color: secColor, fontSize: 9.5, marginTop: 4 }}>{proj.url}</div>}
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Right column */}
          <div>
            {!hiddenSections.includes('education') && education.length > 0 && (
              <div style={{ marginBottom: 18 }}>
                <SectionTitle title="Education" color={secColor} />
                {education.map(edu => (
                  <Card key={edu.id} color={secColor}>
                    <div style={{ fontWeight: 700, fontSize: 11.5, color: DARK }}>{edu.degree}</div>
                    <div style={{ color: secColor, fontWeight: 600 }}>{edu.school}</div>
                    {edu.gpa && <div style={{ fontSize: 10, color: '#9c8068' }}>GPA: {edu.gpa}</div>}
                    <div style={{ fontSize: 10, color: '#9c8068' }}>{edu.startYear} – {edu.endYear}</div>
                  </Card>
                ))}
              </div>
            )}

            {!hiddenSections.includes('skills') && (skills.technical.length > 0 || skills.soft.length > 0) && (
              <div style={{ marginBottom: 18 }}>
                <SectionTitle title="Skills" color={secColor} />
                <div style={{
                  background: 'white', borderRadius: 10, padding: '12px 14px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {skills.technical.map((s, i) => (
                      <span key={i} style={{
                        background: `${primaryColor}18`, color: primaryColor,
                        padding: '2px 10px', borderRadius: 99, fontSize: 10, fontWeight: 600,
                      }}>{s}</span>
                    ))}
                    {skills.soft.map((s, i) => (
                      <span key={i} style={{
                        background: `${secColor}18`, color: secColor,
                        padding: '2px 10px', borderRadius: 99, fontSize: 10, fontWeight: 600,
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!hiddenSections.includes('certifications') && certifications.length > 0 && (
              <div style={{ marginBottom: 18 }}>
                <SectionTitle title="Certifications" color={primaryColor} />
                {certifications.map(cert => (
                  <div key={cert.id} style={{ background: 'white', borderRadius: 8, padding: '8px 12px', marginBottom: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                    <div style={{ fontWeight: 600, fontSize: 10.5, color: DARK }}>{cert.name}</div>
                    {cert.issuer && <div style={{ color: '#9c8068', fontSize: 10 }}>{cert.issuer} · {cert.date}</div>}
                  </div>
                ))}
              </div>
            )}

            {!hiddenSections.includes('languages') && languages.length > 0 && (
              <div>
                <SectionTitle title="Languages" color={secColor} />
                <div style={{ background: 'white', borderRadius: 10, padding: '10px 14px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  {languages.map(lang => (
                    <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 10.5 }}>
                      <span style={{ fontWeight: 600, color: DARK }}>{lang.name}</span>
                      <span style={{ color: '#9c8068' }}>{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
