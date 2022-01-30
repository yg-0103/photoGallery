import auth from '@react-native-firebase/auth'
import { useCallback } from 'react'

interface AuthPayload {
  email: string
  password: string
}

// eslint-disable-next-line no-shadow
export enum AuthErrorType {
  ALREADY_USE_EMAIL = 'auth/email-already-in-use',
  WRONG_PW = 'auth/wrong-password',
  USER_NOT_FOUND = 'auth/user-not-found',
  INVALID_EMAIL = 'auth/invalid-email',
}

export default function useAuth() {
  const signIn = useCallback(({ email, password }: AuthPayload) => {
    if (!email || !password) return null
    return auth().signInWithEmailAndPassword(email, password)
  }, [])

  const signUp = useCallback(({ email, password }: AuthPayload) => {
    if (!email || !password) return null
    return auth().createUserWithEmailAndPassword(email, password)
  }, [])

  const subscribeAuth = useCallback((callback: (currentUser: any) => Promise<void>) => {
    return auth().onAuthStateChanged(callback)
  }, [])

  const signOut = useCallback(() => {
    return auth().signOut()
  }, [])

  return { signIn, signUp, signOut, subscribeAuth }
}
