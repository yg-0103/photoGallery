import useAuth from '@/hooks/useAuth'
import useUserCollection from '@/hooks/useUserCollection'
import { useSetUserState } from '@/modules/account/atoms'
import { RootStackParamList } from '@/navigation/RootStack/RootStack'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import BorderedInput from '../BorderedInput/BorderedInput'
import CustomButton from '../CustomButton/CustomButton'
import * as S from './SetupProfile.style'
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker'
import { Platform, Pressable } from 'react-native'
import useUploadImage from '@/hooks/useUploadImage'

export default function SetupProfile() {
  const [displayName, setDisplayName] = useState('')
  const { createUser } = useUserCollection()
  const setUser = useSetUserState()
  const { signOut } = useAuth()
  const navigation = useNavigation()
  const [imgUrl, setImgUrl] = useState<ImagePickerResponse | null>(null)
  const { params } = useRoute<RouteProp<RootStackParamList, 'Welcome'>>()
  const { upload, loading } = useUploadImage()

  const handleSubmit = async () => {
    const photoUrl = await upload(imgUrl)

    const user = {
      id: params?.uid,
      displayName,
      photoUrl: photoUrl,
    }

    createUser(user)
    setUser(user)
  }

  const handleCancel = () => {
    signOut()
    navigation.goBack()
  }

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      (res) => {
        if (res.didCancel) return
        setImgUrl(res)
      }
    )
  }

  return (
    <S.Container>
      <Pressable onPress={handleSelectImage}>
        <S.ProfileImage source={imgUrl ? { uri: imgUrl?.assets?.[0].uri } : require('@assets/default_user.png')} />
      </Pressable>
      <S.Form>
        <BorderedInput placeholder='닉네임' value={displayName} onChangeText={setDisplayName} returnKeyType='next' />
        {loading ? (
          <S.Spinner size={32} color='#6200ee' />
        ) : (
          <S.ButtonWrapper>
            <CustomButton title='다음' onPress={handleSubmit} hasMarginBottom />
            <CustomButton title='취소' onPress={handleCancel} theme='secondary' />
          </S.ButtonWrapper>
        )}
      </S.Form>
    </S.Container>
  )
}
