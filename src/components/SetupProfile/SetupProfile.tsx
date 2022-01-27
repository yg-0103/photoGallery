import useAuth from '@/hooks/useAuth'
import useUserCollection from '@/hooks/useUserCollection'
import { useSetUserState } from '@/modules/account/atoms'
import { RootStackParamList } from '@/navigation/RootStack/RootStack'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import BorderedInput from '../BorderedInput/BorderedInput'
import CustomButton from '../CustomButton/CustomButton'
import * as S from './SetupProfile.style'

export default function SetupProfile() {
  const [displayName, setDisplayName] = useState('')
  const { createUser } = useUserCollection()
  const setUser = useSetUserState()
  const { signOut } = useAuth()
  const navigation = useNavigation()

  const { params } = useRoute<RouteProp<RootStackParamList, 'Welcome'>>()

  const handleSubmit = () => {
    const user = {
      id: params?.uid,
      displayName,
      photoUrl: null,
    }

    createUser(user)
    setUser(user)
  }

  const handleCancel = () => {
    signOut()
    navigation.goBack()
  }

  return (
    <S.Container>
      <S.Circle />
      <S.Form>
        <BorderedInput placeholder='닉네임' value={displayName} onChangeText={setDisplayName} returnKeyType='next' />
        <S.ButtonWrapper>
          <CustomButton title='다음' onPress={handleSubmit} hasMarginBottom />
          <CustomButton title='취소' onPress={handleCancel} theme='secondary' />
        </S.ButtonWrapper>
      </S.Form>
    </S.Container>
  )
}
