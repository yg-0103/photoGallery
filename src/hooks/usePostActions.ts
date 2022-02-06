import { useSetPostsState } from '@/modules/post/atoms'
import { RootStackParamList } from '@/navigation/RootStack/RootStack'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { ActionSheetIOS, Platform } from 'react-native'
import usePostsCollection from './usePostsCollection'

interface Props {
  id: string
  desc: string
}

export default function usePostActions({ id, desc }: Props) {
  const [isSelecting, setIsSelecting] = useState(false)
  const setPosts = useSetPostsState()
  const { removePost, getPosts } = usePostsCollection()
  const route = useRoute()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const edit = () => {
    navigation.navigate('Edit', {
      id,
      desc,
    })
  }

  const remove = async () => {
    await removePost(id)
    const posts = await getPosts()
    setPosts(posts)

    if (route.name === 'Post') {
      navigation.goBack()
    }
  }

  const handlePress = () => {
    if (Platform.OS === 'android') {
      return setIsSelecting(true)
    }

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['게시물 수정', '게시물 삭제', '취소'],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          edit()
        } else if (buttonIndex === 1) {
          remove()
        }
      }
    )
  }

  const actions = [
    {
      icon: 'edit',
      text: '게시물 수정',
      onPress: edit,
    },
    {
      icon: 'delete',
      text: '게시물 삭제',
      onPress: remove,
    },
  ]

  const onClose = () => {
    setIsSelecting(false)
  }

  return {
    isSelecting,
    handlePress,
    onClose,
    actions,
  }
}
