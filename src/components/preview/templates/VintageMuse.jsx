import React from 'react'

export default function VintageMuse({ cv, settings }) {
  const { personal, summary, experience, education, skills, certifications, projects, languages } = cv
  const { primaryColor = '#c4956a', font = 'Playfair Display', hiddenSections = [] } = settings
  const accent = primaryColor

  return (
    <div style={{ fontFamily: `${font}, Georgia, serif`, color: '#2a2118', fontSize: 11, lineHeight: 1.6, background: '#e8e4d9', minHeight: '297mm' }}>
      {/* TOP SECTION: Name + Photo + Contact */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', padding: '36px 32px 24px', alignItems: 'start', gap: 24 }}>
        {/* Left: Name + summary */}
        <div style={{ paddingTop: 8 }}>
          <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1.05, textTransform: 'uppercase', fontStyle: 'italic', color: '#2a2118' }}>
            {personal.name || 'Your Name'}
          </div>
          <div style={{ height: 1, background: '#2a2118', margin: '14px 0 12px' }} />
          {!hiddenSections.includes('summary') && summary && (
            <p style={{ fontSize: 10.5, color: '#4a3b2a', lineHeight: 1.75, textAlign: 'justify' }}>{summary}</p>
          )}
        </div>

        {/* Center: Photo with arch shape */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 110, height: 130,
            borderRadius: '55px 55px 12px 12px',
            overflow: 'hidden',
            border: `2px solid ${accent}`,
            background: '#d4c9b8',
          }}>
            {personal.photo ? (
              <img src={personal.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 800, color: '#a08060' }}>
                {(personal.name || 'Y').charAt(0)}
              </div>
            )}
          </div>
          {/* Decorative badge */}
          <div style={{ border: `1.5px solid ${accent}`, borderRadius: 999, padding: '3px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: accent }}>
              {personal.title || 'Professional'}
            </div>
          </div>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#4a3b2a', textAlign: 'center', fontStyle: 'italic' }}>
            {personal.name || 'Your Name'}
          </div>
          {personal.title && <div style={{ fontSize: 15, fontStyle: 'italic', color: '#5c4a3d', marginTop: 8 }}>{personal.title}</div>}
        </div>

        {/* Right: Contact Info */}
        <div style={{ paddingTop: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, color: '#2a2118' }}>
            Contact Me
          </div>
          {personal.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: `1px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>📞</div>
              <span style={{ fontSize: 10 }}>{personal.phone}</span>
            </div>
          )}
          {personal.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: `1px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>✉</div>
              <span style={{ fontSize: 10 }}>{personal.email}</span>
            </div>
          )}
          {personal.address && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: `1px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>🏠</div>
              <span style={{ fontSize: 10, lineHeight: 1.5 }}>{personal.address}</span>
            </div>
          )}
          {personal.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: `1px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>🌐</div>
              <span style={{ fontSize: 10 }}>{personal.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ height: 1.5, background: '#2a2118', margin: '0 32px' }} />

      {/* MAIN 2-COLUMN BODY */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 0, padding: '0 32px' }}>
        {/* LEFT: Awards / Education / Languages / Skills */}
        <div style={{ paddingRight: 24, paddingTop: 20, borderRight: `1px solid #b0a08a` }}>

          {/* Awards / Certifications */}
          {!hiddenSections.includes('certifications') && certifications.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, color: '#2a2118' }}>Awards</div>
              {certifications.map((cert, i) => (
                <div key={cert.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <div style={{ width: 28, height: 18, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: 'white', borderRadius: 2 }}>
                      {cert.date ? cert.date.slice(0, 4) : '2023'}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{cert.name}</div>
                  </div>
                  <div style={{ fontSize: 9.5, color: '#6a5a48', fontStyle: 'italic', marginLeft: 36 }}>{cert.issuer}</div>
                  <div style={{ height: 1, background: '#c8bfb0', margin: '8px 0' }} />
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {!hiddenSections.includes('education') && education.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, color: '#2a2118' }}>Education</div>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 800, fontSize: 10.5 }}>{edu.degree}</div>
                  <div style={{ fontSize: 10, color: '#6a5a48', fontStyle: 'italic' }}>{edu.school}</div>
                  <div style={{ fontSize: 9.5, color: '#8a7a68' }}>{edu.startYear} – {edu.endYear}</div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {!hiddenSections.includes('languages') && languages.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, color: '#2a2118' }}>Languages</div>
              {languages.map(lang => (
                <div key={lang.id} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10.5, fontWeight: 600, minWidth: 60 }}>{lang.name}</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {['Native','Fluent','Professional','Conversational','Basic'].map((lvl, i) => (
                      <div key={i} style={{
                        width: 12, height: 12, borderRadius: '50%',
                        background: ['Native','Fluent','Professional','Conversational','Basic'].indexOf(lang.level) <= i ? '#c8bfb0' : accent,
                        border: `1px solid ${accent}`
                      }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {!hiddenSections.includes('skills') && (skills.technical.length > 0 || skills.soft.length > 0) && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, color: '#2a2118' }}>Skills</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {[...skills.technical, ...skills.soft].map((skill, i) => (
                  <span key={i} style={{
                    fontSize: 9.5, fontWeight: 600, padding: '3px 10px',
                    border: `1px solid ${accent}`, borderRadius: 2,
                    color: '#4a3b2a', letterSpacing: '0.04em', textTransform: 'uppercase'
                  }}>{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Work Experience */}
        <div style={{ paddingLeft: 24, paddingTop: 20 }}>
          {!hiddenSections.includes('experience') && experience.length > 0 && (
            <>
              <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, color: '#2a2118' }}>Work Experiences</div>
              {experience.map(exp => (
                <div key={exp.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 12, marginBottom: 16 }}>
                  <div style={{ paddingTop: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                      <div style={{ fontWeight: 800, fontSize: 10 }}>{exp.startDate || '2020'}</div>
                    </div>
                    <div style={{ width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: `8px solid ${accent}`, marginLeft: 8 }} />
                    <div style={{ fontSize: 10, color: '#6a5a48' }}>{exp.endDate || 'Present'}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 11 }}>{exp.title || 'Job Position'}</div>
                    <div style={{ fontSize: 10, color: '#6a5a48', fontStyle: 'italic', marginBottom: 4 }}>{exp.company || 'Company Name'}</div>
                    {exp.description && <p style={{ fontSize: 10, color: '#4a3b2a', lineHeight: 1.7, textAlign: 'justify' }}>{exp.description}</p>}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Projects if experience is empty */}
          {!hiddenSections.includes('projects') && projects.length > 0 && (
            <>
              <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, marginTop: 16, color: '#2a2118' }}>Projects</div>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 800, fontSize: 11 }}>{proj.name}</div>
                  {proj.description && <p style={{ fontSize: 10, color: '#4a3b2a', lineHeight: 1.65 }}>{proj.description}</p>}
                  {proj.url && <div style={{ color: accent, fontSize: 9.5, marginTop: 4, fontStyle: 'italic' }}>{proj.url}</div>}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
