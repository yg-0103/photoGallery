import { User } from '@/modules/account/atoms'
import React, { useMemo } from 'react'
import * as S from './PostCard.style'

interface Props {
  user?: User
  photoUrl?: string
  createdAt: any
  id: string
  desc?: string
}

export default function PostCard({ user, photoUrl, desc, createdAt, id }: Props) {
  const date = useMemo(() => (createdAt ? new Date(createdAt.seconds * 1000) : new Date()), [createdAt])

  const handleOpenProfile = () => {
    console.log(id)
  }

  return (
    <S.Container>
      <S.Header>
        <S.Profile onPress={handleOpenProfile}>
          <S.Avatar
            source={user?.photoUrl ? { uri: user.photoUrl } : require('@assets/default_user.png')}
            resizeMode='cover'
          />
          <S.DisplayName>{user?.displayName}</S.DisplayName>
        </S.Profile>
      </S.Header>
      <S.Image source={{ uri: photoUrl || '' }} resizeMethod='resize' resizeMode='cover' />
      <S.Wrapper>
        <S.Desc>{desc}</S.Desc>
        <S.Date>{date.toLocaleString()}</S.Date>
      </S.Wrapper>
    </S.Container>
  )
}
