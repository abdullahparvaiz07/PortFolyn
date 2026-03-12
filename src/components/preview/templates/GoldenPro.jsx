import React from 'react'

export default function GoldenPro({ cv, settings }) {
  const { personal, summary, experience, education, skills, certifications, projects, languages } = cv
  const { primaryColor = '#3d5a5e', font = 'Inter', hiddenSections = [] } = settings
  const header = primaryColor
  const dark = '#2c2c2c'

  const levelToPercent = (level) => {
    switch (level) {
      case 'Native': return 100
      case 'Fluent': return 85
      case 'Professional': return 70
      case 'Conversational': return 50
      default: return 35
    }
  }

  const SkillBar = ({ label, level = 70 }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}>
      <span style={{ fontSize: 10, minWidth: 95, color: '#333', lineHeight: 1.3 }}>{label}</span>
      <div style={{ flex: 1, display: 'flex', gap: 3 }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 5, borderRadius: 1,
            background: i < Math.round(level / 20) ? header : '#d0d0d0',
          }} />
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ fontFamily: `${font}, sans-serif`, color: dark, fontSize: 10.5, lineHeight: 1.55, background: '#f5f3f0', minHeight: '297mm' }}>

      {/* ═══════════ HEADER ═══════════ */}
      <div style={{ display: 'flex', alignItems: 'center', background: header, color: 'white', padding: 0 }}>
        {/* Photo area — left portion */}
        <div style={{ width: 175, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 0', background: 'rgba(255,255,255,0.06)' }}>
          {personal.photo ? (
            <div style={{ width: 110, height: 110, borderRadius: '50%', overflow: 'hidden', border: '4px solid rgba(255,255,255,0.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              <img src={personal.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '4px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 800 }}>
              {(personal.name || 'Y').charAt(0)}
            </div>
          )}
        </div>
        {/* Name area — right portion */}
        <div style={{ flex: 1, padding: '26px 28px' }}>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '0.04em', lineHeight: 1.15, textTransform: 'uppercase' }}>
            {personal.name || 'Your Name'}
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 400, opacity: 0.8, marginTop: 5, letterSpacing: '0.02em' }}>
            {personal.title || 'Professional Title'}
          </div>
        </div>
      </div>

      {/* ═══════════ MAIN BODY ═══════════ */}
      <div style={{ display: 'flex', minHeight: 'calc(297mm - 136px)' }}>

        {/* ──── LEFT SIDEBAR ──── */}
        <div style={{ width: 200, padding: '22px 20px', background: '#ece9e3', flexShrink: 0 }}>

          {/* ABOUT ME */}
          {!hiddenSections.includes('summary') && summary && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10, color: dark }}>
                About Me
              </div>
              <div style={{ width: 30, height: 2, background: dark, marginBottom: 10 }} />
              <p style={{ fontSize: 10, color: '#444', lineHeight: 1.7, textAlign: 'justify' }}>{summary}</p>
            </div>
          )}

          {/* EDUCATION */}
          {!hiddenSections.includes('education') && education.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10, color: dark }}>
                Education
              </div>
              <div style={{ width: 30, height: 2, background: dark, marginBottom: 10 }} />
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 10.5, color: '#222' }}>{edu.degree || 'Degree'}</div>
                  <div style={{ fontSize: 10, color: '#555', fontWeight: 600 }}>{edu.school || 'University'}</div>
                  <div style={{ fontSize: 9.5, color: '#888', marginTop: 2 }}>
                    {edu.startYear || '2016'} – {edu.endYear || '2020'}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SKILLS */}
          {!hiddenSections.includes('skills') && (skills.technical.length > 0 || skills.soft.length > 0) && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10, color: dark }}>
                Skills
              </div>
              <div style={{ width: 30, height: 2, background: dark, marginBottom: 10 }} />
              {[...skills.technical, ...skills.soft].slice(0, 6).map((skill, i) => (
                <SkillBar key={i} label={skill} level={Math.max(40, 90 - i * 10)} />
              ))}
            </div>
          )}

          {/* LANGUAGE */}
          {!hiddenSections.includes('languages') && languages.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10, color: dark }}>
                Language
              </div>
              <div style={{ width: 30, height: 2, background: dark, marginBottom: 10 }} />
              {languages.map(lang => (
                <div key={lang.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                  <span style={{ fontSize: 7, color: header }}>●</span>
                  <span style={{ fontSize: 10, color: '#333' }}>{lang.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* CERTIFICATIONS */}
          {!hiddenSections.includes('certifications') && certifications.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10, color: dark }}>
                Certifications
              </div>
              <div style={{ width: 30, height: 2, background: dark, marginBottom: 10 }} />
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 10, color: '#222' }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: 9.5, color: '#777' }}>{cert.issuer} · {cert.date}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ──── RIGHT MAIN CONTENT ──── */}
        <div style={{ flex: 1, padding: '22px 24px', background: 'white' }}>

          {/* CONTACT ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', marginBottom: 22, paddingBottom: 16, borderBottom: '1.5px solid #e0e0e0' }}>
            {personal.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: header, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white', flexShrink: 0 }}>📞</div>
                <span style={{ fontSize: 9.5, color: '#444' }}>{personal.phone}</span>
              </div>
            )}
            {personal.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: header, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white', flexShrink: 0 }}>🌐</div>
                <span style={{ fontSize: 9.5, color: '#444', wordBreak: 'break-all' }}>{personal.website}</span>
              </div>
            )}
            {personal.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: header, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white', flexShrink: 0 }}>✉</div>
                <span style={{ fontSize: 9.5, color: '#444', wordBreak: 'break-all' }}>{personal.email}</span>
              </div>
            )}
            {personal.address && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: header, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white', flexShrink: 0 }}>📍</div>
                <span style={{ fontSize: 9.5, color: '#444', lineHeight: 1.45 }}>{personal.address}</span>
              </div>
            )}
          </div>

          {/* EXPERIENCE — TIMELINE */}
          {!hiddenSections.includes('experience') && experience.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14, color: dark }}>
                Experience
              </div>
              <div style={{ width: 40, height: 2, background: dark, marginBottom: 14 }} />

              {experience.map((exp, i) => (
                <div key={exp.id} style={{ display: 'flex', gap: 14, marginBottom: i < experience.length - 1 ? 18 : 0, position: 'relative' }}>
                  {/* Timeline dot + line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 14, flexShrink: 0, paddingTop: 3 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', border: `2px solid ${header}`, background: 'white', zIndex: 1 }} />
                    {i < experience.length - 1 && (
                      <div style={{ flex: 1, width: 1.5, background: '#ccc', marginTop: 2 }} />
                    )}
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                      <div style={{ fontWeight: 800, fontSize: 11.5, color: '#111' }}>{exp.title || 'Job Title'}</div>
                      <span style={{ fontSize: 10, color: '#777', fontWeight: 600, flexShrink: 0, marginLeft: 10 }}>
                        {exp.startDate || '2020'} – {exp.endDate || '2023'}
                      </span>
                    </div>
                    <div style={{ fontSize: 10, color: '#777', marginBottom: 5, fontStyle: 'italic' }}>
                      {exp.company || 'Company Name'}{personal.address ? ` | ${personal.address}` : ''}
                    </div>
                    {exp.description && (
                      <div style={{ fontSize: 10, color: '#444', lineHeight: 1.7 }}>
                        {exp.description.split(/[•\n]/).filter(Boolean).map((line, j) => (
                          <div key={j} style={{ display: 'flex', gap: 6, marginBottom: 3 }}>
                            <span style={{ flexShrink: 0, color: '#888', marginTop: 1 }}>•</span>
                            <span>{line.trim()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {!hiddenSections.includes('projects') && projects.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14, color: dark }}>
                Projects
              </div>
              <div style={{ width: 40, height: 2, background: dark, marginBottom: 14 }} />
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: '#111' }}>{proj.name}</div>
                  {proj.description && <p style={{ fontSize: 10, color: '#555', lineHeight: 1.65, marginTop: 3 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* REFERENCES */}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14, color: dark }}>
              References
            </div>
            <div style={{ width: 40, height: 2, background: dark, marginBottom: 14 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {experience.length > 0 ? experience.slice(0, 2).map((exp, i) => (
                <div key={i}>
                  <div style={{ fontWeight: 800, fontSize: 10.5, color: '#111' }}>{exp.company || `Reference ${i + 1}`}</div>
                  <div style={{ fontSize: 10, color: '#777', fontStyle: 'italic' }}>{exp.title}</div>
                  {personal.phone && <div style={{ fontSize: 9.5, color: '#888', marginTop: 3 }}><strong>Phone:</strong> {personal.phone}</div>}
                  {personal.email && <div style={{ fontSize: 9.5, color: '#888' }}><strong>Email:</strong> {personal.email}</div>}
                </div>
              )) : (
                <div>
                  <div style={{ fontWeight: 800, fontSize: 10.5, color: '#111' }}>Available on request</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
