import PostCard from '@/components/PostCard/PostCard'
import usePostsCollection, { PAGE_SIZE } from '@/hooks/usePostsCollection'
import { Post, usePostsState } from '@/modules/post/atoms'
import styled from '@emotion/native'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'

export default function FeedScreen() {
  const [posts, setPosts] = usePostsState()
  const { getPosts, getOlderPosts } = usePostsCollection()
  const [noMorePost, setNoMorePost] = useState(false)

  const handleLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) return

    const lastPost = posts[posts.length - 1]
    const olderPosts = await getOlderPosts(lastPost.id)
    if (olderPosts && olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true)
    }

    setPosts([...posts, ...(olderPosts ?? [])])
  }

  useEffect(() => {
    getPosts().then(setPosts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    />
  )
}

const renderItem = ({ item: { createdAt, id, description, photoUrl, user } }: { item: Post }) => (
  <PostCard createdAt={createdAt} id={id} desc={description} user={user} photoUrl={photoUrl} />
)

const Spinner = styled.ActivityIndicator({
  height: 64,
})

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
})
