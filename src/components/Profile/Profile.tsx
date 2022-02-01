import usePostsCollection from '@/hooks/usePostsCollection'
import useUserCollection from '@/hooks/useUserCollection'
import { useUserState } from '@/modules/account/atoms'
import { usePostsState } from '@/modules/post/atoms'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import Avatar from '../Avatar'
import * as S from './Profile.style'

interface Props {
  userId: string
}

export default function Profile({ userId }: Props) {
  const [user, setUser] = useUserState()
  const [posts, setPosts] = usePostsState()
  const { getUser } = useUserCollection()
  const { getPosts } = usePostsCollection()
  useEffect(() => {
    getUser(userId).then(setUser)
    getPosts({ userId }).then(setPosts)
  }, [userId])

  if (!user || !posts) {
    return <S.Spinner size={32} color='#6200ee' />
  }

  return (
    <S.Container
      data={[]}
      renderItem={() => <View />}
      ListHeaderComponent={
        <S.UserInfo>
          <Avatar source={user.photoUrl} size={128} />
          <S.UserName>{user.displayName}</S.UserName>
        </S.UserInfo>
      }
    />
  )
}
