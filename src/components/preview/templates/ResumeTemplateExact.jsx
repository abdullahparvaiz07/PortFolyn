import React from 'react';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

const SectionHeader = ({ title }) => (
  <div className="flex items-center w-full mb-4 mt-8 first:mt-0">
    <h3 className="uppercase tracking-[0.2em] font-bold text-[#2b2b2b] text-[13px] pr-4 whitespace-nowrap">
      {title}
    </h3>
    <div className="flex-grow h-[1.5px] bg-[#2b2b2b]"></div>
  </div>
);

const ResumeTemplateExact = ({ cv, settings }) => {
  const { personal, summary, experience, education, skills, certifications, projects, languages } = cv;
  const { primaryColor = '#242424', font = 'Montserrat', hiddenSections = [] } = settings;

  // Derive level width for skills (approximate mapping)
  const getSkillWidth = (index) => {
    const levels = ['w-[90%]', 'w-[85%]', 'w-[80%]', 'w-[75%]', 'w-[70%]', 'w-[65%]'];
    return levels[index % levels.length];
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
        `}
      </style>

      <div 
        className="max-w-[1000px] w-full mx-auto bg-white shadow-2xl flex text-[#2b2b2b] overflow-hidden min-h-[1414px]"
        style={{ fontFamily: font === 'Montserrat' ? "'Montserrat', sans-serif" : `${font}, sans-serif` }}
      >
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="w-[35%] bg-[#e6e6e6] relative flex flex-col items-center pb-12 z-10 flex-shrink-0">
          
          {/* Profile Picture overlapping the black banner */}
          <div className="w-[180px] h-[180px] rounded-full border-[6px] border-white overflow-hidden absolute top-[70px] z-20 shadow-sm bg-gray-200 flex items-center justify-center">
            {personal.photo ? (
              <img
                src={personal.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl font-bold text-gray-400">
                {(personal.name || 'Y').charAt(0)}
              </span>
            )}
          </div>

          {/* Spacer to push content down below the absolute image */}
          <div className="w-full h-[280px]"></div>

          <div className="w-full px-10">
            {/* ABOUT ME */}
            {!hiddenSections.includes('summary') && summary && (
              <>
                <SectionHeader title="ABOUT ME" />
                <p className="text-[11px] leading-[1.8] text-justify mb-10 text-gray-800">
                  {summary}
                </p>
              </>
            )}

            {/* EDUCATION */}
            {!hiddenSections.includes('education') && education.length > 0 && (
              <>
                <SectionHeader title="EDUCATION" />
                {education.map((edu, idx) => (
                  <div key={edu.id || idx} className={idx === education.length - 1 ? "mb-10" : "mb-5"}>
                    <h4 className="font-bold text-[12px] mb-0.5 max-w-full truncate">{edu.degree || 'Degree'}</h4>
                    <p className="text-[11px] text-gray-800 mb-0.5">{edu.school || 'University'}</p>
                    <p className="text-[11px] text-gray-500">{edu.startYear || '2016'} - {edu.endYear || 'Present'}</p>
                  </div>
                ))}
              </>
            )}

            {/* SKILLS */}
            {!hiddenSections.includes('skills') && (skills.technical.length > 0 || skills.soft.length > 0) && (
              <>
                <SectionHeader title="SKILLS" />
                <div className="flex flex-col gap-3.5 mb-10">
                  {[...skills.technical, ...skills.soft].slice(0, 8).map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-[12px] text-gray-800 max-w-[50%] truncate pr-2">{skill}</span>
                      <div className={`h-[4px] bg-[#2b2b2b] ${getSkillWidth(index)} max-w-[50%]`}></div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* LANGUAGE */}
            {!hiddenSections.includes('languages') && languages.length > 0 && (
              <>
                <SectionHeader title="LANGUAGE" />
                <ul className="list-disc list-inside text-[12px] text-gray-800 space-y-2 mb-10">
                  {languages.map((lang, idx) => (
                    <li key={lang.id || idx}>
                      {lang.name} {lang.level && <span className="text-gray-500 text-[10px]">({lang.level})</span>}
                    </li>
                  ))}
                </ul>
              </>
            )}
            
            {/* CERTIFICATIONS */}
            {!hiddenSections.includes('certifications') && certifications.length > 0 && (
              <>
                <SectionHeader title="CERTIFICATIONS" />
                <div className="flex flex-col gap-3 mb-10">
                  {certifications.map(cert => (
                    <div key={cert.id}>
                      <h4 className="font-bold text-[12px] mb-0.5">{cert.name}</h4>
                      {cert.issuer && <p className="text-[11px] text-gray-600">{cert.issuer} • {cert.date}</p>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="w-[65%] bg-white flex flex-col relative z-0 flex-shrink-0">
          
          {/* Top whitespace before banner */}
          <div className="h-[80px] w-full bg-white"></div>

          {/* Black Banner overlapping behind left profile pic */}
          <div 
            className="h-[160px] w-full relative" 
            style={{ backgroundColor: primaryColor }}
          >
            {/* This piece extends the black bar into the left column perfectly */}
            <div 
              className="absolute top-0 bottom-0 right-full w-[150px]"
              style={{ backgroundColor: primaryColor }}
            ></div>
            
            <div className="flex flex-col justify-center h-full pl-8 pr-6">
              <h1 className="text-white text-[32px] tracking-[0.15em] font-bold leading-[1.1] mb-2 uppercase truncate">
                {personal.name || 'YOUR NAME'}
              </h1>
              <h2 className="text-white text-[15px] tracking-[0.25em] font-light uppercase truncate">
                {personal.title || 'Professional Title'}
              </h2>
            </div>
          </div>

          <div className="px-10 pt-10 pb-12 flex-grow">
            
            {/* Contact Information Grid */}
            <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-10">
              {personal.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-[22px] h-[22px] rounded-[3px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: primaryColor }}>
                    <Phone className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[12px] text-gray-700 tracking-wide truncate">{personal.phone}</span>
                </div>
              )}
              {personal.website && (
                <div className="flex items-center gap-3">
                  <div className="w-[22px] h-[22px] rounded-[3px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: primaryColor }}>
                    <Globe className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[12px] text-gray-700 tracking-wide truncate">{personal.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
              {personal.email && (
                <div className="flex items-center gap-3">
                  <div className="w-[22px] h-[22px] rounded-[3px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: primaryColor }}>
                    <Mail className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[12px] text-gray-700 tracking-wide truncate">{personal.email}</span>
                </div>
              )}
              {personal.address && (
                <div className="flex items-center gap-3">
                  <div className="w-[22px] h-[22px] rounded-[3px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: primaryColor }}>
                    <MapPin className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[12px] text-gray-700 leading-tight tracking-wide line-clamp-2">{personal.address}</span>
                </div>
              )}
            </div>

            {/* EXPERIENCE */}
            {!hiddenSections.includes('experience') && experience.length > 0 && (
              <>
                <SectionHeader title="EXPERIENCE" />

                <div className="relative border-l-[1.5px] border-[#2b2b2b] ml-1.5 mb-10 pb-2 mt-6">
                  {experience.map((job, idx) => (
                    <div key={job.id || idx} className="mb-8 pl-6 relative">
                      {/* Timeline Dot */}
                      <div className="absolute w-[11px] h-[11px] bg-white border-[2px] border-[#2b2b2b] rounded-full left-[calc(-6.5px)] top-[4px]"></div>
                      
                      <div className="flex justify-between items-start mb-0.5">
                        <h4 className="font-bold text-[14px] text-[#2b2b2b] leading-[1.2] pb-1 pr-2">{job.title || 'Job Title'}</h4>
                        <span className="text-[11px] text-gray-500 italic mt-0.5 whitespace-nowrap">{job.startDate || '2020'} - {job.endDate || 'Present'}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mb-2">{job.company || 'Company Name'}</p>
                      
                      {job.description && (
                        <ul className="list-disc list-outside ml-3 text-[11px] text-gray-600 leading-[1.7] text-justify space-y-1">
                          {job.description.split(/[\n•]/).filter(Boolean).map((line, i) => (
                            <li key={i}>{line.trim()}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {/* PROJECTS */}
            {!hiddenSections.includes('projects') && projects.length > 0 && (
              <>
                <SectionHeader title="PROJECTS" />
                <div className="mb-10">
                  {projects.map(proj => (
                    <div key={proj.id} className="mb-5 last:mb-0">
                      <h4 className="font-bold text-[13px] text-[#2b2b2b] mb-1">{proj.name}</h4>
                      {proj.description && (
                        <p className="text-[11px] text-gray-600 leading-[1.7] text-justify">
                          {proj.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* REFERENCES */}
            <SectionHeader title="REFERENCES" />
            <div className="grid grid-cols-2 gap-8 mt-2">
              {experience.length > 0 ? experience.slice(0, 2).map((exp, idx) => (
                <div key={idx}>
                  <h4 className="font-bold text-[13px] text-[#2b2b2b] mb-0.5">{exp.title} Colleague</h4>
                  <p className="text-[11px] text-gray-600 mb-2">{exp.company}</p>
                  <p className="text-[10px] text-gray-700 italic">Available upon request</p>
                </div>
              )) : (
                <div>
                  <h4 className="font-bold text-[13px] text-[#2b2b2b] mb-0.5">Available on request</h4>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeTemplateExact;
