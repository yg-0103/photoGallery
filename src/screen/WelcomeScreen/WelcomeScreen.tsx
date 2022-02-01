import SetupProfile from '@/components/SetupProfile'
import React from 'react'
import { Platform } from 'react-native'
import * as S from './WelcomeScreen.style'

export default function WelcomeScreen() {
  return (
    <S.KeyboardAvoidingContainer behavior={Platform.select({ ios: 'padding' })}>
      <S.Container>
        <S.Title>환영합니다</S.Title>
        <S.Desc>프로필을 설정하세요.</S.Desc>
        <SetupProfile />
      </S.Container>
    </S.KeyboardAvoidingContainer>
  )
}
