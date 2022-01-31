import firestore from '@react-native-firebase/firestore'
import { Post, PostForm } from '@/modules/post/atoms'
import { useCallback } from 'react'

export const PAGE_SIZE = 3

const postsCollection = firestore().collection('posts')

export default function usePostsCollection() {
  const createPost = useCallback(({ user, photoUrl, description }: PostForm) => {
    return postsCollection.add({
      user,
      photoUrl,
      description,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })
  }, [])

  const getPosts = useCallback(async () => {
    try {
      const snapshot = await postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE).get()
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      return posts as Post[]
    } catch (e) {
      console.error(e)
      return null
    }
  }, [])

  const getOlderPosts = useCallback(async (id: string) => {
    try {
      const cursorDoc = await postsCollection.doc(id).get()
      const snapshot = await postsCollection.orderBy('createdAt', 'desc').startAfter(cursorDoc).limit(PAGE_SIZE).get()

      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      return posts as Post[]
    } catch (e) {
      console.error(e)
      return null
    }
  }, [])

  return { createPost, getPosts, getOlderPosts }
}
