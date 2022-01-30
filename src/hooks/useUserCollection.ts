import { User } from '@/modules/account/atoms'
import firestore from '@react-native-firebase/firestore'
import { useCallback } from 'react'

export default function useUserCollection() {
  const usersCollection = firestore().collection('users')

  const createUser = useCallback(
    ({ id, displayName, photoUrl }: User) => {
      return usersCollection.doc(id).set({
        id,
        displayName,
        photoUrl,
      })
    },
    [usersCollection]
  )

  const getUser = useCallback(
    async (id: string) => {
      const doc = await usersCollection.doc(id).get()

      return doc.data() as User | null
    },
    [usersCollection]
  )
  return { usersCollection, createUser, getUser }
}
