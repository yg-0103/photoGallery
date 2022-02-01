import IconRightButton from '@/components/IconRightButton'
import usePostsCollection from '@/hooks/usePostsCollection'
import useUploadImage from '@/hooks/useUploadImage'
import { useUserState } from '@/modules/account/atoms'
import { usePostFormState } from '@/modules/post/atoms'
import { PostUploadScreenProps } from '@/navigation/RootStack/RootStack'
import styled from '@emotion/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Keyboard, Platform, StyleSheet, useWindowDimensions } from 'react-native'
import { v4 } from 'uuid'

export default function PostUploadScreen({ route, navigation }: PostUploadScreenProps) {
  const { image } = route.params || {}
  const { width } = useWindowDimensions()
  const { upload, loading } = useUploadImage()
  const animation = useRef(new Animated.Value(width)).current
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [post, setPost] = usePostFormState()
  const [user] = useUserState()
  const { createPost } = usePostsCollection()

  const handleSubmit = useCallback(async () => {
    if (!image || !post?.description || !user) return

    try {
      const photoUrl = await upload(image, `/photo/${user?.id}/${v4()}`)
      console.log('upload', photoUrl)
      await createPost({
        user,
        photoUrl: photoUrl || '',
        description: post.description,
      })
      setPost({ ...post, description: '' })
      navigation.pop()
    } catch (e) {
      console.error(e)
    }
  }, [image, user, navigation, upload, createPost, setPost, post])

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardOpen(true))
    const didHide = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardOpen(false))

    return () => {
      didShow.remove()
      didHide.remove()
    }
  }, [])

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyboardOpen ? 0 : width,
      useNativeDriver: false,
      duration: 150,
      delay: 100,
    }).start()
  }, [isKeyboardOpen, width, animation])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={handleSubmit} iconName='send' />,
    })
  }, [navigation, handleSubmit])

  return (
    <Container behavior={Platform.select({ ios: 'height' })} keyboardVerticalOffset={Platform.select({ ios: 180 })}>
      {loading ? (
        <Spinner size={42} color='#6200ee' />
      ) : (
        <>
          <Animated.Image
            source={{ uri: image?.assets?.[0].uri }}
            style={[styles.image, { height: animation }]}
            resizeMode='cover'
          />
          <Input
            multiline
            placeholder='사진에 대한 설명을 입력하세요.'
            textAlignVertical='top'
            value={post?.description}
            onChangeText={(description) => setPost({ ...post, description })}
          />
        </>
      )}
    </Container>
  )
}

const Container = styled.KeyboardAvoidingView({
  flex: 1,
})

const Input = styled.TextInput({
  flex: 1,
  padding: 12,
  fontSize: 16,
})

const Spinner = styled.ActivityIndicator({
  flex: 1,
})

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
})
