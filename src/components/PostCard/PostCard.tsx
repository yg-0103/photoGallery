import { User } from '@/modules/account/atoms'
import { ProfileScreenProps } from '@/navigation/RootStack/RootStack'
import { useNavigation } from '@react-navigation/native'
import React, { useMemo } from 'react'
import Avatar from '../Avatar'
import * as S from './PostCard.style'

interface Props {
  user?: User
  photoUrl?: string
  createdAt: any
  desc?: string
}

export default function PostCard({ user, photoUrl, desc, createdAt }: Props) {
  const date = useMemo(() => (createdAt ? new Date(createdAt.seconds * 1000) : new Date()), [createdAt])

  const navigation = useNavigation<ProfileScreenProps['navigation']>()
  const handleOpenProfile = () => {
    navigation.navigate('Profile', {
      userId: user?.id,
      displayName: user?.displayName,
    })
  }

  return (
    <S.Container>
      <S.Header>
        <S.Profile onPress={handleOpenProfile}>
          <Avatar source={user?.photoUrl} />
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
