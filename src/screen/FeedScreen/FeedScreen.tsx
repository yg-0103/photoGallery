import PostCard from '@/components/PostCard'
import usePostsCollection, { PAGE_SIZE } from '@/hooks/usePostsCollection'
import { Post, usePostsState } from '@/modules/post/atoms'
import styled from '@emotion/native'
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'

export default function FeedScreen() {
  const [posts, setPosts] = usePostsState()
  const { getPosts, getOlderPosts, getNewerPosts } = usePostsCollection()
  const [noMorePost, setNoMorePost] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const handleLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) return

    const lastPost = posts[posts.length - 1]
    const olderPosts = await getOlderPosts(lastPost.id)
    if (olderPosts && olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true)
    }

    setPosts([...posts, ...(olderPosts ?? [])])
  }

  const handleRefresh = async () => {
    if (refreshing || !posts || posts.length === 0) return

    const firstPost = posts[0]
    setRefreshing(true)
    const newerPosts = await getNewerPosts(firstPost.id)
    setRefreshing(false)
    if (!newerPosts || newerPosts.length === 0) return

    setPosts([...newerPosts, ...posts])
  }

  useEffect(() => {
    getPosts().then(setPosts)
  }, [])

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      contentContainerStyle={styles.container}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.75}
      ListFooterComponent={!noMorePost ? <Spinner size={32} color='#6200ee' /> : null}
      refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />}
    />
  )
}

const renderItem = ({ item: { createdAt, description, photoUrl, user } }: { item: Post }) => (
  <PostCard createdAt={createdAt} desc={description} user={user} photoUrl={photoUrl} />
)

const Spinner = styled.ActivityIndicator({
  height: 64,
})

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
})
