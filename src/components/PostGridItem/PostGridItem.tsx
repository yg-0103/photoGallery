import { Post } from '@/modules/post/atoms'
import { Pressable, useWindowDimensions } from 'react-native'
import React from 'react'
import styled from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { PostScreenProps } from '@/navigation/RootStack/RootStack'

interface Props {
  post: Post
}

export default function PostGridItem({ post }: Props) {
  const dimensions = useWindowDimensions()
  const size = (dimensions.width - 3) / 3
  const navigation = useNavigation<PostScreenProps['navigation']>()

  const handlePress = () => {
    navigation.navigate('Post', { post })
  }

  return (
    <Pressable
      style={({ pressed }) => [{ margin: 0.5 }, { opacity: pressed ? 0.6 : 1, width: size, height: size }]}
      onPress={handlePress}
    >
      <PostImage source={{ uri: post.photoUrl }} resizeMethod='resize' resizeMode='cover' />
    </Pressable>
  )
}

const PostImage = styled.Image({
  width: '100%',
  height: '100%',
  backgroundColor: '#bdbdbd',
})
