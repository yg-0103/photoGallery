import auth from '@react-native-firebase/auth'

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
  const signIn = ({ email, password }: AuthPayload) => {
    if (!email || !password) return null
    return auth().signInWithEmailAndPassword(email, password)
  }

  const signUp = ({ email, password }: AuthPayload) => {
    if (!email || !password) return null
    return auth().createUserWithEmailAndPassword(email, password)
  }

  const subscribeAuth = (callback: () => void) => {
    return auth().onAuthStateChanged(callback)
  }

  const signOut = () => {
    return auth().signOut()
  }

  return { signIn, signUp, signOut, subscribeAuth }
}
