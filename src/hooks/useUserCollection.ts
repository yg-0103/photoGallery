import firestore from '@react-native-firebase/firestore'

interface UserPayload {
  displayName: string
  photoUrl: string | null
  id?: string
}

export default function useUserCollection() {
  const usersCollection = firestore().collection('users')

  const createUser = ({ id, displayName, photoUrl }: UserPayload) => {
    return usersCollection.doc(id).set({
      id,
      displayName,
      photoUrl,
    })
  }

  const getUser = async (id: string) => {
    const doc = await usersCollection.doc(id).get()

    return doc.data()
  }

  return { usersCollection, createUser, getUser }
}
