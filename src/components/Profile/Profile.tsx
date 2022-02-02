import usePosts from '@/hooks/usePosts'
import useUserCollection from '@/hooks/useUserCollection'
import { useUserState } from '@/modules/account/atoms'
import { Post } from '@/modules/post/atoms'
import React, { useEffect } from 'react'
import { RefreshControl } from 'react-native'
import Avatar from '../Avatar'
import PostGridItem from '../PostGridItem'
import Spinner from '../Spinner'
import * as S from './Profile.style'

interface Props {
  userId: string
}

export default function Profile({ userId }: Props) {
  const [user, setUser] = useUserState()
  const { getUser } = useUserCollection()
  const { posts, noMorePost, refreshing, handleRefresh, handleLoadMore } = usePosts(userId)

  useEffect(() => {
    getUser(userId).then(setUser)
  }, [userId])

  if (!user || !posts) {
    return <Spinner style={{ flex: 1, justifyContent: 'center' }} />
  }

  return (
    <S.Container
      data={posts}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={
        <S.UserInfo>
          <Avatar source={user.photoUrl} size={128} />
          <S.UserName>{user.displayName}</S.UserName>
        </S.UserInfo>
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.25}
      ListFooterComponent={!noMorePost ? <Spinner style={{ height: 128 }} /> : null}
      refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />}
    />
  )
}

const renderItem = ({ item }: { item: Post }) => <PostGridItem post={item} />
