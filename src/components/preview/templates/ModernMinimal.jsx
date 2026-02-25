import React from 'react'

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
        color, borderBottom: `2px solid ${color}`, paddingBottom: 3, marginBottom: 10,
      }}>{title}</div>
      {children}
    </div>
  )
}

export default function ModernMinimal({ cv, settings }) {
  const { personal, summary, experience, education, skills, certifications, projects, languages } = cv
  const { primaryColor = '#2563eb', font = 'Inter', hiddenSections = [], sectionOrder = [] } = settings

  return (
    <div style={{ fontFamily: `${font}, sans-serif`, color: '#1f2937', fontSize: 11, lineHeight: 1.5 }}>
      {/* Header */}
      <div style={{ background: primaryColor, color: 'white', padding: '28px 32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {personal.photo && (
            <img src={personal.photo} alt="" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)' }} />
          )}
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{personal.name || 'Your Name'}</div>
            <div style={{ opacity: 0.85, fontSize: 11, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {personal.email && <span>✉ {personal.email}</span>}
              {personal.phone && <span>📞 {personal.phone}</span>}
              {personal.linkedin && <span>in {personal.linkedin}</span>}
              {personal.address && <span>📍 {personal.address}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 32px' }}>
        {/* Summary */}
        {!hiddenSections.includes('summary') && summary && (
          <Section title="Professional Summary" color={primaryColor}>
            <p style={{ color: '#374151', lineHeight: 1.65 }}>{summary}</p>
          </Section>
        )}

        {/* Experience */}
        {!hiddenSections.includes('experience') && experience.length > 0 && (
          <Section title="Work Experience" color={primaryColor}>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 12, color: '#111827' }}>{exp.title}</div>
                    <div style={{ color: primaryColor, fontWeight: 600, fontSize: 11 }}>{exp.company}</div>
                  </div>
                  <div style={{ fontSize: 10, color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: 8 }}>
                    {exp.startDate} – {exp.endDate || 'Present'}
                  </div>
                </div>
                {exp.description && <p style={{ marginTop: 6, color: '#4b5563', lineHeight: 1.6 }}>{exp.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {/* Education */}
        {!hiddenSections.includes('education') && education.length > 0 && (
          <Section title="Education" color={primaryColor}>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 12, color: '#111827' }}>{edu.degree}</div>
                    <div style={{ color: primaryColor, fontWeight: 600 }}>{edu.school}</div>
                    {edu.gpa && <div style={{ color: '#6b7280', fontSize: 10 }}>GPA: {edu.gpa}</div>}
                  </div>
                  <div style={{ fontSize: 10, color: '#9ca3af' }}>{edu.startYear} – {edu.endYear}</div>
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* Skills */}
        {!hiddenSections.includes('skills') && (skills.technical.length > 0 || skills.soft.length > 0) && (
          <Section title="Skills" color={primaryColor}>
            {skills.technical.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 10.5, color: '#374151', marginBottom: 6 }}>Technical</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {skills.technical.map((s, i) => (
                    <span key={i} style={{ background: `${primaryColor}15`, color: primaryColor, padding: '2px 10px', borderRadius: 99, fontSize: 10, fontWeight: 500 }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
            {skills.soft.length > 0 && (
              <div>
                <div style={{ fontWeight: 600, fontSize: 10.5, color: '#374151', marginBottom: 6 }}>Soft Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {skills.soft.map((s, i) => (
                    <span key={i} style={{ background: '#f3f4f6', color: '#374151', padding: '2px 10px', borderRadius: 99, fontSize: 10, fontWeight: 500 }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
          </Section>
        )}

        {/* Certifications */}
        {!hiddenSections.includes('certifications') && certifications.length > 0 && (
          <Section title="Certifications" color={primaryColor}>
            {certifications.map(cert => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div>
                  <span style={{ fontWeight: 600, color: '#111827' }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#6b7280' }}> — {cert.issuer}</span>}
                </div>
                {cert.date && <span style={{ color: '#9ca3af', fontSize: 10 }}>{cert.date}</span>}
              </div>
            ))}
          </Section>
        )}

        {/* Projects */}
        {!hiddenSections.includes('projects') && projects.length > 0 && (
          <Section title="Projects" color={primaryColor}>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: '#111827' }}>{proj.name}</div>
                {proj.description && <p style={{ color: '#4b5563', lineHeight: 1.6, marginTop: 4 }}>{proj.description}</p>}
                {proj.url && <div style={{ color: primaryColor, fontSize: 10, marginTop: 4 }}>{proj.url}</div>}
              </div>
            ))}
          </Section>
        )}

        {/* Languages */}
        {!hiddenSections.includes('languages') && languages.length > 0 && (
          <Section title="Languages" color={primaryColor}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {languages.map(lang => (
                <span key={lang.id} style={{ fontSize: 11 }}>
                  <b style={{ color: '#111827' }}>{lang.name}</b>
                  {lang.level && <span style={{ color: '#6b7280' }}> ({lang.level})</span>}
                </span>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  )
}
