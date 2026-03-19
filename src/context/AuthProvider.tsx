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
    chapter_name,
  }: {
    data: any
    type: keyof typeof typePush
    chapter_name?: string
  }) => Promise<void>
  onDeleteData: ({
    data,
    type,
  }: {
    data: any
    type: keyof typeof typePush
  }) => Promise<void>
  onPushcontinueChapter: ({
    slug,
    chapter_name,
    data,
  }: {
    slug: string
    chapter_name: string
    data: any
  }) => Promise<void>
}

const AuthContext = createContext({} as TypeAuthContext)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const cookies = new Cookies()
  const [userId, setUserId] = useState(cookies.get('user-id') ?? '')
  const [user, setUser] = useState<User | null>(null)
  const userCollection = collection(db, 'users')
  console.log({ userId })

  useEffect(() => {
    const getUser = async () => {
      try {
        if (userId) {
          const docRef = doc(db, 'users', userId)
          const docSnap = await getDoc(docRef)
          const data = docSnap.data() as User
          setUser(data)
        }
      } catch (error) {
        console.error(error)
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
    chapter_name,
  }: {
    data: any
    type: keyof typeof typePush
    chapter_name?: string
  }) => {
    if (!user) return
    const userDoc = doc(db, 'users', userId)
    const findItem = user?.[type]?.find((item: any) => item._id === data._id)
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
            continueChapter: Number(chapter_name ?? 0),
          },
        ],
      }).then(() => {
        const textMessage = type === 'follow' ? 'Đã thêm vào danh sách theo dõi' : ''
        if (textMessage) toast.success(textMessage, {})
      })
    }
  }

  const handleDeletaData = async ({
    data,
    type,
  }: {
    data: any
    type: keyof typeof typePush
  }) => {
    if (!user) return
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
        toast.error(textMessage)
      })
      return
    }
  }

  const handlePushcontinueChapter = async ({
    chapter_name,
    slug,
  }: {
    chapter_name: string
    slug: string
  }) => {
    const userDoc = doc(db, 'users', userId)
    const updateChapter = user?.history.map((item: any) => {
      return {
        ...item,
        continueChapter: Number(item.slug === slug ? chapter_name : 0),
      }
    })
    setUser((prev: any) => {
      return {
        ...prev,
        history: prev.history.map((item: any) => {
          return {
            ...item,
            continueChapter: Number(item.slug === slug ? chapter_name : 0),
          }
        }),
      }
    })

    await updateDoc(userDoc, {
      history: updateChapter,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        isLogin: !!userId,
        user: user,
        signIn: handleLoginApp,
        signOut: handleSignOutApp,
        onPushData: handlePushData,
        onPushcontinueChapter: handlePushcontinueChapter,
        onDeleteData: handleDeletaData,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
