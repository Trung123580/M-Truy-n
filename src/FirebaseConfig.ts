import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyCjhFOgnZz6JipRf6zHIOqPiZ9AtthfYhA',
  authDomain: 'me-truyen-874da.firebaseapp.com',
  projectId: 'me-truyen-874da',
  storageBucket: 'me-truyen-874da.firebasestorage.app',
  messagingSenderId: '509648683133',
  appId: '1:509648683133:web:9db6a13d15a3e3eeb43114',
  measurementId: 'G-CHSFM75EDF',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const firebaseStorage = getStorage(app)
