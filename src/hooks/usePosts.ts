import { usePostsState } from '@/modules/post/atoms'
import { useCallback, useEffect, useState } from 'react'
import usePostsCollection, { PAGE_SIZE } from './usePostsCollection'

export default function usePosts(userId?: string) {
  const [posts, setPosts] = usePostsState()
  const [noMorePost, setNoMorePost] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const { getPosts, getOlderPosts, getNewerPosts } = usePostsCollection()

  const handleLoadMore = useCallback(async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) return

    const lastPost = posts[posts.length - 1]
    const olderPosts = await getOlderPosts(lastPost.id, userId)

    if (olderPosts && olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true)
    }

    setPosts([...posts, ...(olderPosts ?? [])])
  }, [posts, noMorePost])

  const handleRefresh = useCallback(async () => {
    if (!posts || posts.length === 0 || refreshing) return

    const firstPost = posts[0]
    setRefreshing(true)
    const newerPosts = await getNewerPosts(firstPost.id, userId)
    setRefreshing(false)

    if (!newerPosts || newerPosts.length === 0) return
    setPosts([...newerPosts, ...posts])
  }, [posts, refreshing, userId])

  useEffect(() => {
    getPosts({ userId }).then((posts) => {
      setPosts(posts)

      if (!posts || posts.length < PAGE_SIZE) {
        setNoMorePost(true)
      }
    })
  }, [userId])

  return {
    posts,
    noMorePost,
    refreshing,
    handleLoadMore,
    handleRefresh,
  }
}
