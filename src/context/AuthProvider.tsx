import { createContext, useContext, type ReactNode } from 'react'

type User = {
  uid: string
  email: string
  displayName: string
  photoURL: string
}

type TypeAuthContext = {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext({} as TypeAuthContext)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider
      value={{
        user: null,
        signIn: () => Promise.resolve(),
        signOut: () => Promise.resolve(),
      }}>
      {children}
    </AuthContext.Provider>
  )
}
const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
