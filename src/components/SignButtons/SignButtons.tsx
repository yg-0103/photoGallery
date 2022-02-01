import { SignInScreenProps } from '@/navigation/RootStack/RootStack'
import styled from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import CustomButton from '../CustomButton'

interface Props {
  handleSubmit: () => void
  loading: boolean
  isSignUp?: boolean
}

export default function SignButtons({ isSignUp, loading, handleSubmit }: Props) {
  const navigation = useNavigation<SignInScreenProps['navigation']>()

  const primaryText = isSignUp ? '회원가입' : '로그인'
  const secondaryText = isSignUp ? '로그인' : '회원가입'

  const onSecondaryButtonPress = () => (isSignUp ? navigation.goBack() : navigation.push('SignIn', { isSignUp: true }))

  if (loading) {
    return (
      <SpinnerWrapper>
        <ActivityIndicator size={32} color='#6200ee' />
      </SpinnerWrapper>
    )
  }

  return (
    <ButtonWrapper>
      <CustomButton title={primaryText} hasMarginBottom onPress={handleSubmit} />
      <CustomButton title={secondaryText} theme='secondary' onPress={onSecondaryButtonPress} />
    </ButtonWrapper>
  )
}

export const ButtonWrapper = styled.View({
  marginTop: 64,
  width: '100%',
  paddingHorizontal: 16,
})

export const SpinnerWrapper = styled.View({
  marginTop: 64,
  height: 104,
  justifyContent: 'center',
  alignItems: 'center',
})
