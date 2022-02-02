import firestore from '@react-native-firebase/firestore'
import { Post, PostForm } from '@/modules/post/atoms'
import { useCallback } from 'react'

export const PAGE_SIZE = 12

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

  const getPosts = useCallback(async (props?: { id?: string; userId?: string; mode?: 'older' | 'newer' }) => {
    const { id, userId, mode } = props ?? {}

    try {
      let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE)

      if (userId) {
        query = query.where('user.id', '==', userId)
      }

      if (id) {
        const cursorDoc = await postsCollection.doc(id).get()
        query = mode === 'older' ? query.startAfter(cursorDoc) : query.endBefore(cursorDoc)
      }

      const snapshot = await query.get()
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      return posts as Post[]
    } catch (e) {
      console.error(e)
      return null
    }
  }, [])

  const getOlderPosts = useCallback(
    async (id: string, userId?: string) => getPosts({ id, userId, mode: 'older' }),
    [getPosts]
  )

  const getNewerPosts = useCallback(
    async (id: string, userId?: string) => getPosts({ id, userId, mode: 'newer' }),
    [getPosts]
  )

  return { createPost, getPosts, getOlderPosts, getNewerPosts }
}
