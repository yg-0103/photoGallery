import IconRightButton from '@/components/IconRightButton'
import usePostsCollection from '@/hooks/usePostsCollection'
import { EditScreenProps } from '@/navigation/RootStack/RootStack'
import styled from '@emotion/native'
import React, { useCallback, useEffect, useState } from 'react'
import { Platform } from 'react-native'

export default function EditScreen({ navigation, route }: EditScreenProps) {
  const { params } = route ?? {}
  const { updatePost } = usePostsCollection()
  const [desc, setDesc] = useState(params.desc)

  const handleSubmit = useCallback(async () => {
    try {
      await updatePost({
        id: params.id,
        description: desc,
      })
      navigation.pop()
    } catch (e) {
      console.error(e)
    }
  }, [navigation, desc])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={handleSubmit} iconName='check' />,
    })
  }, [handleSubmit, navigation])

  return (
    <Container behavior={Platform.select({ ios: 'height' })} keyboardVerticalOffset={Platform.select({ ios: 88 })}>
      <Input
        placeholder='사진에 대한 설명을 입력하세요.'
        multiline
        textAlignVertical='top'
        value={desc}
        onChangeText={setDesc}
      />
    </Container>
  )
}

const Container = styled.KeyboardAvoidingView({
  flex: 1,
})

const Input = styled.TextInput({
  flex: 1,
  padding: 16,
  fontSize: 16,
})
