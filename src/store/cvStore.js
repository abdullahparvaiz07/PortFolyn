import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const defaultCV = {
  personal: {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    address: '',
    website: '',
    photo: null,
  },
  summary: '',
  education: [],
  experience: [],
  skills: { technical: [], soft: [] },
  certifications: [],
  projects: [],
  languages: [],
}

const defaultSettings = {
  template: 'modern-minimal',
  primaryColor: '#2563eb',
  font: 'Inter',
  sectionOrder: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages'],
  hiddenSections: [],
}

export const useCVStore = create(
  persist(
    (set, get) => ({
      // Current CV being edited
      cv: defaultCV,
      settings: defaultSettings,
      savedCVs: [],
      currentCVId: null,

      // CV data setters
      setPersonal: (personal) => set((s) => ({ cv: { ...s.cv, personal: { ...s.cv.personal, ...personal } } })),
      setSummary: (summary) => set((s) => ({ cv: { ...s.cv, summary } })),
      setEntireCV: (data) => set({ cv: data }),

      addEducation: (edu) => set((s) => ({ cv: { ...s.cv, education: [...s.cv.education, { id: Date.now(), ...edu }] } })),
      updateEducation: (id, edu) => set((s) => ({ cv: { ...s.cv, education: s.cv.education.map(e => e.id === id ? { ...e, ...edu } : e) } })),
      removeEducation: (id) => set((s) => ({ cv: { ...s.cv, education: s.cv.education.filter(e => e.id !== id) } })),

      addExperience: (exp) => set((s) => ({ cv: { ...s.cv, experience: [...s.cv.experience, { id: Date.now(), ...exp }] } })),
      updateExperience: (id, exp) => set((s) => ({ cv: { ...s.cv, experience: s.cv.experience.map(e => e.id === id ? { ...e, ...exp } : e) } })),
      removeExperience: (id) => set((s) => ({ cv: { ...s.cv, experience: s.cv.experience.filter(e => e.id !== id) } })),

      setSkills: (skills) => set((s) => ({ cv: { ...s.cv, skills: { ...s.cv.skills, ...skills } } })),

      addCertification: (cert) => set((s) => ({ cv: { ...s.cv, certifications: [...s.cv.certifications, { id: Date.now(), ...cert }] } })),
      updateCertification: (id, cert) => set((s) => ({ cv: { ...s.cv, certifications: s.cv.certifications.map(c => c.id === id ? { ...c, ...cert } : c) } })),
      removeCertification: (id) => set((s) => ({ cv: { ...s.cv, certifications: s.cv.certifications.filter(c => c.id !== id) } })),

      addProject: (proj) => set((s) => ({ cv: { ...s.cv, projects: [...s.cv.projects, { id: Date.now(), ...proj }] } })),
      updateProject: (id, proj) => set((s) => ({ cv: { ...s.cv, projects: s.cv.projects.map(p => p.id === id ? { ...p, ...proj } : p) } })),
      removeProject: (id) => set((s) => ({ cv: { ...s.cv, projects: s.cv.projects.filter(p => p.id !== id) } })),

      addLanguage: (lang) => set((s) => ({ cv: { ...s.cv, languages: [...s.cv.languages, { id: Date.now(), ...lang }] } })),
      removeLanguage: (id) => set((s) => ({ cv: { ...s.cv, languages: s.cv.languages.filter(l => l.id !== id) } })),

      // Settings
      setTemplate: (template) => set((s) => ({ settings: { ...s.settings, template } })),
      setPrimaryColor: (primaryColor) => set((s) => ({ settings: { ...s.settings, primaryColor } })),
      setFont: (font) => set((s) => ({ settings: { ...s.settings, font } })),
      setSectionOrder: (sectionOrder) => set((s) => ({ settings: { ...s.settings, sectionOrder } })),
      toggleSection: (section) => set((s) => {
        const hidden = s.settings.hiddenSections
        const isHidden = hidden.includes(section)
        return { settings: { ...s.settings, hiddenSections: isHidden ? hidden.filter(h => h !== section) : [...hidden, section] } }
      }),

      // Dashboard / saved CVs
      saveCurrentCV: (title) => {
        const state = get()
        const id = state.currentCVId || Date.now().toString()
        const entry = {
          id,
          title: title || state.cv.personal.name || 'Untitled CV',
          cv: state.cv,
          settings: state.settings,
          lastEdited: new Date().toISOString(),
          downloads: state.savedCVs.find(s => s.id === id)?.downloads || 0,
        }
        set((s) => ({
          currentCVId: id,
          savedCVs: s.savedCVs.find(c => c.id === id)
            ? s.savedCVs.map(c => c.id === id ? entry : c)
            : [...s.savedCVs, entry],
        }))
        return id
      },
      loadCV: (id) => {
        const state = get()
        const saved = state.savedCVs.find(c => c.id === id)
        if (saved) {
          set({ cv: saved.cv, settings: saved.settings, currentCVId: id })
        }
      },
      deleteCV: (id) => set((s) => ({
        savedCVs: s.savedCVs.filter(c => c.id !== id),
        currentCVId: s.currentCVId === id ? null : s.currentCVId,
      })),
      trackDownload: (id) => set((s) => ({
        savedCVs: s.savedCVs.map(c => c.id === id ? { ...c, downloads: (c.downloads || 0) + 1 } : c),
      })),
      newCV: () => set({ cv: defaultCV, settings: defaultSettings, currentCVId: null }),
    }),
    { name: 'smartcv-store' }
  )
)
