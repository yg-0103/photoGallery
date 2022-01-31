import { User } from '@/modules/account/atoms'
import firestore from '@react-native-firebase/firestore'
import { useCallback } from 'react'

const usersCollection = firestore().collection('users')

export default function useUserCollection() {
  const createUser = useCallback(({ id, displayName, photoUrl }: User) => {
    return usersCollection.doc(id).set({
      id,
      displayName,
      photoUrl,
    })
  }, [])

  const getUser = useCallback(async (id: string) => {
    try {
      const doc = await usersCollection.doc(id).get()
      return doc.data() as User
    } catch (e) {
      console.error(e)
      return null
    }
  }, [])
  return { usersCollection, createUser, getUser }
}
