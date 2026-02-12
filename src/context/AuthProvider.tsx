import { auth, db, googleProvider } from '@/FirebaseConfig'
import { signInWithPopup, signOut } from 'firebase/auth'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Cookies from 'universal-cookie'
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { typePush } from '@/utils/constant'
import { toast } from 'sonner'

type User = {
  avatar: string
  email: string
  follow: []
  history: []
  userName: string
}

type TypeAuthContext = {
  isLogin: boolean
  user: User | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  onPushData: ({
    data,
    type,
    unType,
  }: {
    data: any
    type: keyof typeof typePush
    unType?: boolean
  }) => Promise<void>
}

const AuthContext = createContext({} as TypeAuthContext)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const cookies = new Cookies()
  const [userId, setUserId] = useState(cookies.get('user-id') ?? '')
  const [user, setUser] = useState<User | null>(null)
  const userCollection = collection(db, 'users')
  // console.log({ isAuth })
  useEffect(() => {
    const getUser = async () => {
      try {
        if (userId) {
          const docRef = doc(db, 'users', userId)
          const docSnap = await getDoc(docRef)
          const data = docSnap.data() as User
          console.log({ data })
          setUser(data)
          // dispatch(dataUser(data)) // user
        }
      } catch (error) {
        console.error(error)
        console.log('loi')
      }
    }
    getUser()
  }, [userId])
  const handleLoginApp = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider)
      cookies.set('user-id', response.user.uid, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      })
      const data = await getDocs(userCollection)
      const userData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      const isUser = userData.some((user) => user.id === auth.currentUser?.uid)
      setUserId(auth.currentUser?.uid ?? '')
      if (!isUser) {
        if (!auth.currentUser?.uid) return
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          userName: auth.currentUser?.displayName,
          email: auth.currentUser?.email,
          avatar: auth.currentUser?.photoURL,
          follow: [],
          history: [], // { slug: truyen, chapter: số }
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSignOutApp = async () => {
    setUserId('')
    cookies.remove('user-id')
    await signOut(auth)
  }

  const handlePushData = async ({
    data,
    type,
  }: {
    data: any
    type: keyof typeof typePush
  }) => {
    const userDoc = doc(db, 'users', userId)
    const findItem = user?.[type]?.find((item: any) => item._id === data._id)
    if (findItem) {
      setUser((prev: any) => {
        return {
          ...prev,
          [type]: prev?.[type]?.filter((item: any) => item._id !== data._id),
        }
      })
      await updateDoc(userDoc, {
        [type]: user?.[type]?.filter((item: any) => item._id !== data._id),
      }).then(() => {
        const textMessage = type === 'follow' ? 'Đã xóa khỏi danh sách theo dõi' : ''
        toast.success(textMessage)
      })
      return
    }
    if (!findItem) {
      setUser((prev: any) => {
        return {
          ...prev,
          [type]: [...(prev?.[type] ?? []), data],
        }
      })
      await updateDoc(userDoc, {
        [type]: [
          ...(user?.[type] ?? []),
          {
            _id: data._id,
            slug: data.slug,
            thumb_url: data.thumb_url,
            name: data.name,
            updatedAt: data.updatedAt,
            category: data.category,
          },
        ],
      }).then(() => {
        const textMessage = type === 'follow' ? 'Đã thêm vào danh sách theo dõi' : ''
        if (textMessage) toast.success(textMessage, {})
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLogin: !!userId,
        user: user,
        signIn: handleLoginApp,
        signOut: handleSignOutApp,
        onPushData: handlePushData,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
