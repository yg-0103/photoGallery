import { User } from '@/modules/account/atoms'
import firestore from '@react-native-firebase/firestore'

export default function useUserCollection() {
  const usersCollection = firestore().collection('users')

  const createUser = ({ id, displayName, photoUrl }: User) => {
    return usersCollection.doc(id).set({
      id,
      displayName,
      photoUrl,
    })
  }

  const getUser = async (id: string) => {
    const doc = await usersCollection.doc(id).get()

    return doc.data() as User | null
  }
  return { usersCollection, createUser, getUser }
}
