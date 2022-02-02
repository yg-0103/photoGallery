import PostCard from '@/components/PostCard'
import Spinner from '@/components/Spinner'
import usePost from '@/hooks/usePosts'
import { Post } from '@/modules/post/atoms'
import React from 'react'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'

export default function FeedScreen() {
  const { posts, handleLoadMore, handleRefresh, noMorePost, refreshing } = usePost()

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      contentContainerStyle={styles.container}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.75}
      ListFooterComponent={!noMorePost ? <Spinner style={{ height: 64 }} /> : null}
      refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />}
    />
  )
}

const renderItem = ({ item: { createdAt, description, photoUrl, user } }: { item: Post }) => (
  <PostCard createdAt={createdAt} desc={description} user={user} photoUrl={photoUrl} />
)

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
})
