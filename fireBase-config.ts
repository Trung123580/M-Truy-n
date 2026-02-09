import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDwijAFVY470dWnW1ejlVFOXFd808-btXk',
  authDomain: 'test-mobi-marathon.firebaseapp.com',
  projectId: 'test-mobi-marathon',
  storageBucket: 'test-mobi-marathon.firebasestorage.app',
  messagingSenderId: '768971903837',
  appId: '1:768971903837:web:9aeabba4077eaf31b70eb4',
  measurementId: 'G-ECYWKEEPH1',
}
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const firebaseStorage = getStorage(app)
