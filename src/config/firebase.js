// ─────────────────────────────────────────────────────────────────────────────
// Firebase Configuration for PortFolyn
// ─────────────────────────────────────────────────────────────────────────────
// SETUP STEPS:
//  1. Go to https://console.firebase.google.com/
//  2. Create a new project (or use an existing one)
//  3. Go to Project Settings > General > Your apps > Add app > Web
//  4. Copy the firebaseConfig object values below
//  5. In Firebase Console > Authentication > Sign-in method:
//     - Enable "Google" provider
//     - Enable "GitHub" provider (needs GitHub OAuth App credentials)
//  6. For GitHub: Create an OAuth App at https://github.com/settings/developers
//     Homepage URL: http://localhost:5173
//     Callback URL:  (copy from Firebase GitHub provider setup page)
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || '',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || '',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || '',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID|| '',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || '',
}

// Check whether Firebase has been configured
export const isFirebaseConfigured = Object.values(firebaseConfig).every(v => v !== '')

let app, auth, googleProvider, githubProvider

if (isFirebaseConfigured) {
  app            = initializeApp(firebaseConfig)
  auth           = getAuth(app)
  googleProvider = new GoogleAuthProvider()
  githubProvider = new GithubAuthProvider()
  googleProvider.addScope('profile')
  googleProvider.addScope('email')
}

export { auth, googleProvider, githubProvider }
