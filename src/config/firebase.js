import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

// Debug: log which keys are missing (safe — just key names, not values)
const missingKeys = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k)

if (missingKeys.length > 0) {
  console.warn('[PortFolyn] Firebase env vars missing:', missingKeys)
  console.warn('[PortFolyn] Make sure .env.local is filled in and dev server was restarted.')
} else {
  console.log('[PortFolyn] Firebase config loaded ✓')
}

export const isFirebaseConfigured = missingKeys.length === 0

let app, auth, googleProvider, githubProvider

if (isFirebaseConfigured) {
  try {
    app            = initializeApp(firebaseConfig)
    auth           = getAuth(app)
    googleProvider = new GoogleAuthProvider()
    githubProvider = new GithubAuthProvider()
    googleProvider.addScope('profile')
    googleProvider.addScope('email')
    console.log('[PortFolyn] Firebase initialized ✓ auth domain:', firebaseConfig.authDomain)
  } catch (err) {
    console.error('[PortFolyn] Firebase init error:', err)
  }
}

export { auth, googleProvider, githubProvider }
