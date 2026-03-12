import React from 'react';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

const SectionHeader = ({ title }) => (
  <div className="flex items-center w-full mb-4 mt-8 first:mt-0">
    <h3 className="uppercase tracking-[0.2em] font-bold text-gray-900 pr-4 whitespace-nowrap">
      {title}
    </h3>
    <div className="flex-grow h-px bg-gray-400"></div>
  </div>
);

const GoldenPro = ({ cv, settings }) => {
  const { personal, summary, experience, education, skills, certifications, projects, languages } = cv;
  const { primaryColor = '#2B2B2B', font = 'Inter', hiddenSections = [] } = settings;

  return (
    <div 
      className="w-full h-full flex flex-row bg-white font-sans" 
      style={{ fontFamily: `${font}, sans-serif`, minHeight: '297mm' }}
    >
      
      {/* LEFT COLUMN */}
      <div className="w-[35%] bg-[#E8E8E8] px-8 py-12 flex flex-col flex-shrink-0">
        {/* Profile Image */}
        {personal.photo ? (
          <div className="w-44 h-44 mx-auto rounded-full overflow-hidden border-[6px] border-[#F5F5F5] mb-8 bg-gray-300 flex-shrink-0">
            <img
              src={personal.photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-44 h-44 mx-auto rounded-full overflow-hidden border-[6px] border-[#F5F5F5] mb-8 flex items-center justify-center text-5xl font-bold text-gray-400 bg-gray-200 flex-shrink-0">
            {(personal.name || 'Y').charAt(0)}
          </div>
        )}

        {/* About Me */}
        {!hiddenSections.includes('summary') && summary && (
          <>
            <SectionHeader title="About Me" />
            <p className="text-sm text-gray-600 leading-relaxed text-justify mb-8">
              {summary}
            </p>
          </>
        )}

        {/* Education */}
        {!hiddenSections.includes('education') && education.length > 0 && (
          <>
            <SectionHeader title="Education" />
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className={idx === education.length - 1 ? "mb-8" : "mb-4"}>
                <h4 className="font-bold text-gray-800 text-sm">{edu.degree || 'Degree'}</h4>
                <p className="text-gray-600 text-sm">{edu.school || 'University Name'}</p>
                <p className={`text-gray-500 text-sm ${idx !== education.length - 1 ? 'mb-4' : ''}`}>
                  {edu.startYear || '2016'} - {edu.endYear || 'Present'}
                </p>
              </div>
            ))}
          </>
        )}

        {/* Skills */}
        {!hiddenSections.includes('skills') && (skills.technical.length > 0 || skills.soft.length > 0) && (
          <>
            <SectionHeader title="Skills" />
            <div className="flex flex-col gap-3 mb-8">
              {[...skills.technical, ...skills.soft].slice(0, 8).map((skill, index) => {
                const level = Math.max(40, 95 - index * 8);
                return (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 w-1/2 pr-2 leading-tight">{skill}</span>
                    <div className="w-1/2 h-1.5 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                      <div className="h-full bg-gray-800" style={{ width: `${level}%`, backgroundColor: primaryColor }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Language */}
        {!hiddenSections.includes('languages') && languages.length > 0 && (
          <>
            <SectionHeader title="Language" />
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 mb-8">
              {languages.map((lang, idx) => (
                <li key={lang.id || idx}>
                  {lang.name} <span className="text-xs text-gray-500">({lang.level})</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-[65%] flex flex-col bg-white">
        
        {/* Top Header */}
        <div 
          className="px-10 py-16 text-white h-[280px] flex flex-col justify-center flex-shrink-0"
          style={{ backgroundColor: primaryColor }}
        >
          <h1 className="text-4xl font-bold tracking-[0.15em] mb-3 uppercase leading-tight">
            {personal.name || 'YOUR NAME'}
          </h1>
          <h2 className="text-xl font-light tracking-[0.2em] uppercase">
            {personal.title || 'Professional Title'}
          </h2>
        </div>

        <div className="px-10 py-8 flex-grow">
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10 pb-8 border-b border-gray-200">
            {personal.phone && (
              <div className="flex items-center gap-3 text-sm text-gray-700 break-all">
                <div className="p-1.5 rounded-sm flex-shrink-0" style={{ backgroundColor: primaryColor }}><Phone size={14} className="text-white" /></div>
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-3 text-sm text-gray-700 break-all">
                <div className="p-1.5 rounded-sm flex-shrink-0" style={{ backgroundColor: primaryColor }}><Globe size={14} className="text-white" /></div>
                <span>{personal.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
            {personal.email && (
              <div className="flex items-center gap-3 text-sm text-gray-700 break-all">
                <div className="p-1.5 rounded-sm flex-shrink-0" style={{ backgroundColor: primaryColor }}><Mail size={14} className="text-white" /></div>
                <span>{personal.email}</span>
              </div>
            )}
            {personal.address && (
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <div className="p-1.5 rounded-sm mt-0.5 flex-shrink-0" style={{ backgroundColor: primaryColor }}><MapPin size={14} className="text-white" /></div>
                <span className="leading-tight">{personal.address}</span>
              </div>
            )}
          </div>

          {/* Experience */}
          {!hiddenSections.includes('experience') && experience.length > 0 && (
            <>
              <SectionHeader title="Experience" />
              <div className="relative border-l ml-2 mt-6 mb-10" style={{ borderColor: primaryColor }}>
                {experience.map((job, index) => (
                  <div key={job.id || index} className="mb-8 pl-6 relative">
                    <div className="absolute w-3 h-3 bg-white border-2 rounded-full -left-[6.5px] top-1.5" style={{ borderColor: primaryColor }}></div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-800 text-lg leading-tight">{job.title || 'Job Title'}</h4>
                      <span className="text-sm text-gray-600 italic flex-shrink-0 ml-4">
                        {job.startDate || '2020'} - {job.endDate || 'Present'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{job.company || 'Company Name'}</p>
                    {job.description && (
                      <ul className="list-disc list-inside text-sm text-gray-600 text-justify space-y-1">
                        {job.description.split(/[\n•]/).filter(Boolean).map((line, i) => (
                          <li key={i} className="leading-relaxed">{line.trim()}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* References & Other Sections (Grid) */}
          <div className="grid grid-cols-2 gap-8">
            {!hiddenSections.includes('certifications') && certifications.length > 0 && (
              <div>
                <SectionHeader title="Certifications" />
                <div className="mt-4">
                  {certifications.map(cert => (
                    <div key={cert.id} className="mb-4">
                      <h4 className="font-bold text-gray-800 text-base mb-1">{cert.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">{cert.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!hiddenSections.includes('projects') && projects.length > 0 && (
              <div>
                <SectionHeader title="Projects" />
                <div className="mt-4">
                  {projects.map(proj => (
                    <div key={proj.id} className="mb-4">
                      <h4 className="font-bold text-gray-800 text-base mb-1">{proj.name}</h4>
                      {proj.description && (
                        <p className="text-sm text-gray-600 leading-relaxed text-justify line-clamp-3">
                          {proj.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {experience.length > 0 && (!certifications.length || !projects.length) && (
              <div className="col-span-2">
                 <SectionHeader title="References" />
                 <div className="grid grid-cols-2 gap-8 mt-4">
                    {experience.slice(0, 2).map((exp, i) => (
                      <div key={i}>
                        <h4 className="font-bold text-gray-800 text-base mb-1">{exp.title} Colleague</h4>
                        <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
                        <p className="text-sm text-gray-700">Available upon request</p>
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default GoldenPro;
