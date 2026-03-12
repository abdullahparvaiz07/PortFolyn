import React from 'react'

export default function BlueSidebar({ cv, settings }) {
  const { personal, summary, experience, education, skills, certifications, projects, languages } = cv
  const { primaryColor = '#0d3b5e', font = 'Inter', hiddenSections = [] } = settings
  const accent = '#29b6d4' // bright cyan accent matching the image

  const SkillBar = ({ label, level = 70 }) => (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#374151' }}>{label}</span>
      </div>
      <div style={{ height: 4, background: '#e0e0e0', borderRadius: 2 }}>
        <div style={{ height: '100%', width: `${level}%`, background: accent, borderRadius: 2 }} />
      </div>
    </div>
  )

  return (
    <div style={{ fontFamily: `${font}, sans-serif`, display: 'flex', minHeight: '297mm', background: 'white' }}>
      {/* LEFT SIDEBAR */}
      <div style={{ width: 200, background: primaryColor, color: 'white', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Photo area */}
        <div style={{ padding: '28px 16px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: `${primaryColor}cc` }}>
          {personal.photo ? (
            <div style={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${accent}`, marginBottom: 6 }}>
              <img src={personal.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: `3px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 800, marginBottom: 6 }}>
              {(personal.name || 'Y').charAt(0)}
            </div>
          )}
        </div>

        <div style={{ padding: '0 16px', flex: 1 }}>
          {/* Contact Section */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>👤</div>
              <span style={{ fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'white' }}>Contact Me</span>
            </div>
            {personal.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, flexShrink: 0 }}>📞</div>
                <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.9)', lineHeight: 1.4 }}>{personal.phone}</span>
              </div>
            )}
            {personal.website && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, flexShrink: 0, marginTop: 1 }}>🌐</div>
                <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.9)', lineHeight: 1.4, wordBreak: 'break-all' }}>{personal.website}</span>
              </div>
            )}
            {personal.email && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, flexShrink: 0, marginTop: 1 }}>✉</div>
                <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.9)', lineHeight: 1.4, wordBreak: 'break-all' }}>{personal.email}</span>
              </div>
            )}
            {personal.address && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, flexShrink: 0, marginTop: 1 }}>📍</div>
                <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.9)', lineHeight: 1.4 }}>{personal.address}</span>
              </div>
            )}
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', marginBottom: 14 }} />

          {/* References */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>👥</div>
              <span style={{ fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'white' }}>References</span>
            </div>
            {experience.slice(0, 2).map((exp, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: accent, marginBottom: 4 }} />
                <div style={{ fontWeight: 800, fontSize: 10, textTransform: 'uppercase', color: 'white' }}>{exp.company || `Reference ${i + 1}`}</div>
                <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.7)' }}>{exp.title}</div>
              </div>
            ))}
            {experience.length === 0 && (
              <div>
                <div style={{ fontWeight: 800, fontSize: 10, color: 'white' }}>Available on</div>
                <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.7)' }}>Request</div>
              </div>
            )}
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', marginBottom: 14 }} />

          {/* Education */}
          {!hiddenSections.includes('education') && education.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>🎓</div>
                <span style={{ fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'white' }}>Education</span>
              </div>
              {education.map((edu, i) => (
                <div key={edu.id} style={{ marginBottom: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: accent, marginBottom: 4 }} />
                  <div style={{ fontWeight: 800, fontSize: 10, color: 'white' }}>{edu.degree || 'Degree'}</div>
                  <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', fontWeight: 600 }}>{edu.school}</div>
                  <div style={{ fontSize: 9, color: accent }}>
                    {edu.startYear} — {edu.endYear}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages in sidebar */}
          {!hiddenSections.includes('languages') && languages.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>🌍</div>
                <span style={{ fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'white' }}>Languages</span>
              </div>
              {languages.map(lang => (
                <div key={lang.id} style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'white' }}>{lang.name}</span>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>{lang.level}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div style={{ flex: 1 }}>
        {/* Name Header */}
        <div style={{ padding: '24px 28px 16px', background: '#f4f6f8', borderBottom: '3px solid #e0e0e0' }}>
          <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.01em', color: '#0d1b2a' }}>
            {(personal.name || 'Your Name').split(' ').map((part, i) => (
              <span key={i} style={{ fontWeight: i === 0 ? 400 : 900, marginRight: 8 }}>{part}</span>
            ))}
          </div>
          <div style={{ fontSize: 11, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>
            {personal.title || 'Graphic & Web Designer'}
          </div>
        </div>

        <div style={{ padding: '20px 28px' }}>
          {/* About Me */}
          {!hiddenSections.includes('summary') && summary && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>👤</div>
                <span style={{ fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0d1b2a' }}>About Me</span>
              </div>
              <p style={{ fontSize: 10.5, color: '#4b5563', lineHeight: 1.75, textAlign: 'justify' }}>{summary}</p>
            </div>
          )}

          {/* Job Experience */}
          {!hiddenSections.includes('experience') && experience.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>💼</div>
                <span style={{ fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0d1b2a' }}>Job Experience</span>
              </div>
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: 14, paddingLeft: 14, borderLeft: `2px solid ${accent}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                    <div style={{ fontWeight: 800, fontSize: 11, color: '#111827', textTransform: 'uppercase' }}>{exp.title || 'Job Title'}</div>
                    <span style={{ fontSize: 9.5, color: accent, fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>
                      {exp.startDate || '2020'} — {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic', marginBottom: 4 }}>
                    {exp.company || 'Company Name'}
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: 10, color: '#4b5563', lineHeight: 1.65 }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {!hiddenSections.includes('skills') && (skills.technical.length > 0 || skills.soft.length > 0) && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>⚡</div>
                <span style={{ fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0d1b2a' }}>Skills</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 24px' }}>
                {[...skills.technical, ...skills.soft].map((skill, i) => (
                  <SkillBar key={i} label={skill} level={Math.max(40, 85 - i * 7)} />
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {!hiddenSections.includes('projects') && projects.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>📂</div>
                <span style={{ fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0d1b2a' }}>Projects</span>
              </div>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: '#111827' }}>{proj.name}</div>
                  {proj.description && <p style={{ fontSize: 10, color: '#4b5563', lineHeight: 1.6, marginTop: 3 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {!hiddenSections.includes('certifications') && certifications.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>🏆</div>
                <span style={{ fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0d1b2a' }}>Certifications</span>
              </div>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 10.5, color: '#111827' }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{cert.issuer} · {cert.date}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
