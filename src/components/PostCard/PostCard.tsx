import usePostActions from '@/hooks/usePostActions'
import ActionSheetModal from '@/modals/ActionSheetModal'
import { User, useUserState } from '@/modules/account/atoms'
import { ProfileScreenProps } from '@/navigation/RootStack/RootStack'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import React, { useMemo } from 'react'
import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Avatar from '../Avatar'
import * as S from './PostCard.style'

interface Props {
  user?: User
  photoUrl?: string
  createdAt: any
  desc?: string
  id: string
}

export default function PostCard({ user, photoUrl, desc, createdAt, id }: Props) {
  const date = useMemo(() => (createdAt ? new Date(createdAt.seconds * 1000) : new Date()), [createdAt])
  const navigation = useNavigation<ProfileScreenProps['navigation']>()
  const routeNames = useNavigationState((state) => state.routeNames)
  const [me] = useUserState()
  const { isSelecting, handlePress, onClose, actions } = usePostActions({ id, desc: desc || '' })

  const isMyPost = me?.id === user?.id

  const handleOpenProfile = () => {
    if (routeNames.includes('MyProfile')) {
      return navigation.navigate('MyProfile')
    }
    navigation.navigate('Profile', {
      userId: user?.id,
      displayName: user?.displayName,
    })
  }

  return (
    <>
      <S.Container>
        <S.Header>
          <S.Profile onPress={handleOpenProfile}>
            <Avatar source={user?.photoUrl} />
            <S.DisplayName>{user?.displayName}</S.DisplayName>
          </S.Profile>
          {isMyPost && (
            <Pressable hitSlop={8} onPress={handlePress}>
              <Icon name='more-vert' size={20} />
            </Pressable>
          )}
        </S.Header>
        <S.Image source={{ uri: photoUrl || '' }} resizeMethod='resize' resizeMode='cover' />
        <S.Wrapper>
          <S.Desc>{desc}</S.Desc>
          <S.Date>{date.toLocaleString()}</S.Date>
        </S.Wrapper>
      </S.Container>
      <ActionSheetModal visible={isSelecting} onClose={onClose} actions={actions} />
    </>
  )
}
