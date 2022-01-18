import BorderedInput from '@/components/BorderedInput/BorderedInput'
import CustomButton from '@/components/CustomButton/CustomButton'
import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { SignInScreenProps } from '../RootStack'
import * as S from './SignInScreen.style'

export default function SignInScreen({ navigation, route }: SignInScreenProps) {
  const { isSignUp } = route.params ?? {}
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const createChangetextHandler = (name: keyof typeof form) => (value: string) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = () => {
    Keyboard.dismiss()
    console.log(form)
  }

  const { email, password, confirmPassword } = form
  return (
    <S.KeyboardAvoidingContainer behavior={Platform.select({ ios: 'padding' })}>
      <S.Container>
        <S.Title>Photo Gallery</S.Title>
        <S.Wrapper>
          <BorderedInput
            autoCapitalize='none'
            autoCorrect={false}
            autoComplete='email'
            keyboardType='email-address'
            placeholder='이메일'
            value={email}
            onChangeText={createChangetextHandler('email')}
            hasMarginBottom
          />
          <BorderedInput
            placeholder='비밀번호'
            value={password}
            onChangeText={createChangetextHandler('password')}
            hasMarginBottom={isSignUp}
            secureTextEntry
          />
          {isSignUp && (
            <BorderedInput
              placeholder='비밀번호 확인'
              value={confirmPassword}
              onChangeText={createChangetextHandler('confirmPassword')}
              secureTextEntry
            />
          )}
        </S.Wrapper>
        <S.ButtonWrapper>
          {isSignUp ? (
            <>
              <CustomButton title='회원가입' theme='secondary' onPress={handleSubmit} hasMarginBottom />
              <CustomButton title='로그인' onPress={() => navigation.goBack()} />
            </>
          ) : (
            <>
              <CustomButton title='로그인' hasMarginBottom onPress={handleSubmit} />
              <CustomButton
                title='회원가입'
                theme='secondary'
                onPress={() => navigation.push('SignIn', { isSignUp: true })}
              />
            </>
          )}
        </S.ButtonWrapper>
      </S.Container>
    </S.KeyboardAvoidingContainer>
  )
}
