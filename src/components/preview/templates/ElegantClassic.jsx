import React from 'react'

function Divider({ color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 12px' }}>
      <div style={{ flex: 1, height: 1, background: color, opacity: 0.3 }} />
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: color, opacity: 0.6 }} />
      <div style={{ flex: 1, height: 1, background: color, opacity: 0.3 }} />
    </div>
  )
}

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.14em', textAlign: 'center', marginBottom: 2 }}>
        {title}
      </div>
      <Divider color={color} />
      {children}
    </div>
  )
}

export default function ElegantClassic({ cv, settings }) {
  const { personal, summary, experience, education, skills, certifications, projects, languages } = cv
  const { primaryColor = '#92702a', font = 'Playfair Display', hiddenSections = [] } = settings

  return (
    <div style={{ fontFamily: `${font}, Georgia, serif`, color: '#1a1a1a', fontSize: 10.5, lineHeight: 1.65, padding: '36px 42px' }}>
      {/* Decorative top border */}
      <div style={{ borderTop: `3px double ${primaryColor}`, borderBottom: `1px solid ${primaryColor}40`, paddingBottom: 20, marginBottom: 20, textAlign: 'center' }}>
        {/* Photo */}
        {personal.photo ? (
          <div style={{ marginBottom: 12 }}>
            <img
              src={personal.photo}
              alt=""
              style={{
                width: 80, height: 80, borderRadius: '50%', objectFit: 'cover',
                border: `3px solid ${primaryColor}`, boxShadow: `0 0 0 4px ${primaryColor}20`,
              }}
            />
          </div>
        ) : null}
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.04em', color: '#111', marginBottom: 6 }}>
          {personal.name || 'Your Name'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', fontSize: 10, color: '#555' }}>
          {personal.email   && <span>✉ {personal.email}</span>}
          {personal.phone   && <span>📞 {personal.phone}</span>}
          {personal.linkedin && <span>in {personal.linkedin}</span>}
          {personal.address  && <span>📍 {personal.address}</span>}
          {personal.website  && <span>🌐 {personal.website}</span>}
        </div>
      </div>

      {!hiddenSections.includes('summary') && summary && (
        <Section title="Profile" color={primaryColor}>
          <p style={{ color: '#374151', lineHeight: 1.75, fontStyle: 'italic', textAlign: 'center' }}>{summary}</p>
        </Section>
      )}

      {!hiddenSections.includes('experience') && experience.length > 0 && (
        <Section title="Professional Experience" color={primaryColor}>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontWeight: 700, fontSize: 11.5 }}>{exp.title}</div>
                <div style={{ fontSize: 10, color: '#888', fontStyle: 'italic' }}>{exp.startDate} – {exp.endDate || 'Present'}</div>
              </div>
              <div style={{ color: primaryColor, fontStyle: 'italic', marginBottom: 4 }}>{exp.company}</div>
              {exp.description && <p style={{ color: '#4b5563', lineHeight: 1.65 }}>{exp.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {!hiddenSections.includes('education') && education.length > 0 && (
        <Section title="Education" color={primaryColor}>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 11.5 }}>{edu.degree}</div>
                <div style={{ color: primaryColor, fontStyle: 'italic' }}>{edu.school}</div>
                {edu.gpa && <div style={{ color: '#777', fontSize: 10 }}>GPA: {edu.gpa}</div>}
              </div>
              <div style={{ fontSize: 10, color: '#888', fontStyle: 'italic', whiteSpace: 'nowrap' }}>{edu.startYear} – {edu.endYear}</div>
            </div>
          ))}
        </Section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {!hiddenSections.includes('skills') && (skills.technical.length > 0 || skills.soft.length > 0) && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.14em', textAlign: 'center', marginBottom: 2 }}>Skills</div>
            <Divider color={primaryColor} />
            {skills.technical.map((s, i) => <div key={i} style={{ fontSize: 10.5, color: '#374151', marginBottom: 4 }}>◆ {s}</div>)}
            {skills.soft.map((s, i) => <div key={i} style={{ fontSize: 10.5, color: '#374151', marginBottom: 4 }}>◇ {s}</div>)}
          </div>
        )}

        <div>
          {!hiddenSections.includes('certifications') && certifications.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.14em', textAlign: 'center', marginBottom: 2 }}>Certifications</div>
              <Divider color={primaryColor} />
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 600, fontSize: 10.5 }}>{cert.name}</div>
                  {cert.issuer && <div style={{ color: '#666', fontSize: 10, fontStyle: 'italic' }}>{cert.issuer} · {cert.date}</div>}
                </div>
              ))}
            </div>
          )}

          {!hiddenSections.includes('languages') && languages.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.14em', textAlign: 'center', marginBottom: 2 }}>Languages</div>
              <Divider color={primaryColor} />
              {languages.map(lang => (
                <div key={lang.id} style={{ fontSize: 10.5, marginBottom: 4 }}>
                  <b>{lang.name}</b>{lang.level && <span style={{ color: '#666' }}> · {lang.level}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!hiddenSections.includes('projects') && projects.length > 0 && (
        <Section title="Notable Projects" color={primaryColor}>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 11.5 }}>{proj.name}</div>
              {proj.description && <p style={{ color: '#4b5563', lineHeight: 1.65, marginTop: 4 }}>{proj.description}</p>}
              {proj.url && <div style={{ color: primaryColor, fontSize: 10, marginTop: 4 }}>{proj.url}</div>}
            </div>
          ))}
        </Section>
      )}

      {/* Decorative bottom border */}
      <div style={{ borderTop: `1px solid ${primaryColor}40`, borderBottom: `3px double ${primaryColor}`, marginTop: 24, paddingTop: 0 }} />
    </div>
  )
}
