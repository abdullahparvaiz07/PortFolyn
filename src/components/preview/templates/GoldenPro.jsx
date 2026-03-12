import React from 'react'

export default function GoldenPro({ cv, settings }) {
  const { personal, summary, experience, education, skills, certifications, projects, languages } = cv
  const { primaryColor = '#d4a017', font = 'Inter', hiddenSections = [] } = settings
  const accent = primaryColor

  const SkillBar = ({ level = 70 }) => (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{
          width: 14, height: 7, borderRadius: 1,
          background: i < Math.round(level / 10) ? accent : '#e0e0e0',
        }} />
      ))}
    </div>
  )

  return (
    <div style={{ fontFamily: `${font}, sans-serif`, color: '#1a1a1a', fontSize: 11, lineHeight: 1.5, background: 'white', minHeight: '297mm' }}>
      {/* TOP HEADER */}
      <div style={{ padding: '28px 32px 20px', display: 'flex', alignItems: 'flex-start', gap: 24, borderBottom: `3px solid #1a1a1a` }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-0.02em', color: '#1a1a1a', textTransform: 'uppercase', lineHeight: 1 }}>
            {personal.name || 'Your Name'}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#555', textTransform: 'uppercase', marginTop: 6, marginBottom: 14 }}>
            {personal.title || 'Professional Title'}
          </div>
          {/* About / Summary */}
          {!hiddenSections.includes('summary') && summary && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: accent }}>●</span>
              <div style={{ fontSize: 11, color: '#374151', fontWeight: 700, marginTop: 1 }}>ABOUT ME</div>
            </div>
          )}
          {!hiddenSections.includes('summary') && summary && (
            <p style={{ color: '#555', fontSize: 10.5, lineHeight: 1.7, marginLeft: 21, marginTop: 4 }}>{summary}</p>
          )}
        </div>
        {/* Photo top-right */}
        <div style={{ flexShrink: 0 }}>
          {personal.photo ? (
            <div style={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', border: `4px solid ${accent}`, position: 'relative' }}>
              <img src={personal.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#f0f0f0', border: `4px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, color: '#999' }}>
              {(personal.name || 'Y').charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* THICK BLACK LINE */}
      <div style={{ height: 4, background: '#1a1a1a' }} />
      <div style={{ height: 2, background: accent, marginBottom: 0 }} />

      {/* MAIN 3-COLUMN SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, borderBottom: '2px solid #1a1a1a' }}>
        {/* Column 1: Job Experience */}
        <div style={{ padding: '18px 18px', borderRight: '1.5px solid #1a1a1a' }}>
          {!hiddenSections.includes('experience') && experience.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, border: '1.5px solid #1a1a1a', padding: '5px 10px' }}>
                <span style={{ fontSize: 13 }}>💼</span>
                <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Job Experience</span>
              </div>
              {experience.map((exp, i) => (
                <div key={exp.id} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 800, fontSize: 11, color: '#111' }}>{exp.title || 'Job Title'}</div>
                  <div style={{ fontSize: 10, color: '#555', fontStyle: 'italic', marginBottom: 3 }}>{exp.company || 'Company Name'}</div>
                  {exp.description && <p style={{ color: '#555', fontSize: 9.5, lineHeight: 1.55 }}>{exp.description}</p>}
                  <div style={{ fontSize: 9, color: '#888', marginTop: 3 }}>
                    {exp.startDate || '2018'} — {exp.endDate || 'Present'}
                  </div>
                  {i < experience.length - 1 && <div style={{ height: 1, background: '#e0e0e0', margin: '10px 0' }} />}
                </div>
              ))}
            </>
          )}
          {/* References */}
          {certifications.length > 0 && !hiddenSections.includes('certifications') && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, marginTop: 16, border: '1.5px solid #1a1a1a', padding: '5px 10px' }}>
                <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Certifications</span>
              </div>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 10.5 }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: 9.5, color: '#888' }}>{cert.issuer} · {cert.date}</div>}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Column 2: Education */}
        <div style={{ padding: '18px 18px', borderRight: '1.5px solid #1a1a1a' }}>
          {!hiddenSections.includes('education') && education.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, border: '1.5px solid #1a1a1a', padding: '5px 10px' }}>
                <span style={{ fontSize: 13 }}>🎓</span>
                <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Education</span>
              </div>
              {education.map((edu, i) => (
                <div key={edu.id} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 800, fontSize: 11 }}>{edu.degree || 'Degree'}</div>
                  <div style={{ fontSize: 10, color: '#555', fontStyle: 'italic', marginBottom: 3 }}>{edu.school || 'University Name'}</div>
                  <div style={{ fontSize: 9, color: '#888' }}>{edu.startYear || '2018'} — {edu.endYear || 'Present'}</div>
                  {i < education.length - 1 && <div style={{ height: 1, background: '#e0e0e0', margin: '10px 0' }} />}
                </div>
              ))}
            </>
          )}
          {/* Projects if any */}
          {!hiddenSections.includes('projects') && projects.length > 0 && (
            <>
              <div style={{ marginTop: 16, marginBottom: 10, fontWeight: 800, fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1.5px solid #1a1a1a', padding: '5px 10px' }}>Projects</div>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 10.5 }}>{proj.name}</div>
                  {proj.description && <p style={{ fontSize: 9.5, color: '#555', lineHeight: 1.5, marginTop: 2 }}>{proj.description}</p>}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Column 3: Contact + Awards */}
        <div style={{ padding: '18px 18px' }}>
          <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>Contact Me</div>
          {personal.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ color: accent, fontSize: 12 }}>📞</span>
              <span style={{ fontSize: 10 }}>{personal.phone}</span>
            </div>
          )}
          {personal.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ color: accent, fontSize: 12 }}>🌐</span>
              <span style={{ fontSize: 10 }}>{personal.website}</span>
            </div>
          )}
          {personal.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ color: accent, fontSize: 12 }}>✉</span>
              <span style={{ fontSize: 10 }}>{personal.email}</span>
            </div>
          )}
          {personal.address && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
              <span style={{ color: accent, fontSize: 12 }}>📍</span>
              <span style={{ fontSize: 10 }}>{personal.address}</span>
            </div>
          )}

          {/* Skills as skill bars */}
          {!hiddenSections.includes('skills') && (skills.technical.length > 0 || skills.soft.length > 0) && (
            <>
              <div style={{ marginTop: 14, marginBottom: 8, border: '1.5px solid #1a1a1a', padding: '5px 10px' }}>
                <span style={{ fontWeight: 800, fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>⚡ Skills</span>
              </div>
              {[...skills.technical, ...skills.soft].slice(0, 6).map((skill, i) => (
                <div key={i} style={{ marginBottom: 7 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, marginBottom: 3 }}>{skill}</div>
                  <SkillBar level={Math.max(50, 90 - i * 8)} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* BOTTOM ROW: References | Languages | Skills / Hobbies */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
        {/* References (use experience companies as refs or show hobbies) */}
        <div style={{ padding: '14px 18px', borderRight: '1.5px solid #e0e0e0' }}>
          <div style={{ fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10, color: '#1a1a1a' }}>References</div>
          {experience.slice(0, 2).map((exp, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 800, fontSize: 10.5, textTransform: 'uppercase' }}>{exp.company || 'Company Name'}</div>
              <div style={{ fontSize: 9.5, color: '#666' }}>{exp.title || 'Position'}</div>
            </div>
          ))}
          {experience.length === 0 && (
            <>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 10.5, textTransform: 'uppercase' }}>Available on</div>
                <div style={{ fontSize: 9.5, color: '#666' }}>Request</div>
              </div>
            </>
          )}
        </div>

        {/* Languages */}
        <div style={{ padding: '14px 18px', borderRight: '1.5px solid #e0e0e0' }}>
          <div style={{ fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10, color: '#1a1a1a' }}>Languages</div>
          {languages.length > 0 ? languages.map(lang => (
            <div key={lang.id} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase' }}>{lang.name}</span>
                <span style={{ fontSize: 9, color: '#888' }}>{lang.level}</span>
              </div>
              <div style={{ height: 5, background: '#e0e0e0', borderRadius: 2 }}>
                <div style={{ height: '100%', borderRadius: 2, width: lang.level === 'Native' ? '100%' : lang.level === 'Fluent' ? '85%' : lang.level === 'Professional' ? '70%' : lang.level === 'Conversational' ? '50%' : '30%', background: accent }} />
              </div>
            </div>
          )) : (
            ['English', 'Spanish', 'French'].map((l, i) => (
              <div key={l} style={{ marginBottom: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase' }}>{l}</span>
                </div>
                <div style={{ height: 5, background: '#e0e0e0', borderRadius: 2 }}>
                  <div style={{ height: '100%', borderRadius: 2, width: ['85%','65%','40%'][i], background: accent }} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Hobbies / extras */}
        <div style={{ padding: '14px 18px' }}>
          <div style={{ fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10, color: '#1a1a1a' }}>Hobbies</div>
          {(skills.soft.length > 0 ? skills.soft : ['Reading', 'Photography', 'Traveling', 'Writing', 'Sports']).slice(0, 5).map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 8, height: 8, background: accent, flexShrink: 0 }} />
              <span style={{ fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
