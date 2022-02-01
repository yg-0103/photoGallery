import React, { useRef } from 'react'
import { TextInput } from 'react-native'
import BorderedInput from '../BorderedInput'
import { InputFormData } from '@/screen/SignInScreen/SignInScreen'
import styled from '@emotion/native'

interface Props {
  isSignUp?: boolean
  form: {
    email: string
    password: string
    confirmPassword: string
  }
  createChangeTextHandler: (name: keyof InputFormData) => (value: string) => void
  handleSubmit: () => void
}

export default function SignForm({ isSignUp, form, createChangeTextHandler, handleSubmit }: Props) {
  const { email, password, confirmPassword } = form
  const passwordRef = useRef<TextInput | null>(null)
  const confirmPasswordRef = useRef<TextInput | null>(null)
  return (
    <Wrapper>
      <BorderedInput
        autoCapitalize='none'
        autoCorrect={false}
        autoComplete='email'
        keyboardType='email-address'
        placeholder='이메일'
        returnKeyType='next'
        value={email}
        onChangeText={createChangeTextHandler('email')}
        onSubmitEditing={() => {
          console.log('hi')
          console.log(passwordRef.current)
          passwordRef.current?.focus()
        }}
        hasMarginBottom
      />
      <BorderedInput
        ref={passwordRef}
        placeholder='비밀번호'
        value={password}
        onChangeText={createChangeTextHandler('password')}
        hasMarginBottom={isSignUp}
        returnKeyType={isSignUp ? 'next' : 'done'}
        onSubmitEditing={() => (isSignUp ? confirmPasswordRef.current?.focus() : handleSubmit())}
        secureTextEntry
      />
      {isSignUp && (
        <BorderedInput
          ref={confirmPasswordRef}
          placeholder='비밀번호 확인'
          value={confirmPassword}
          returnKeyType='done'
          onChangeText={createChangeTextHandler('confirmPassword')}
          onSubmitEditing={handleSubmit}
          secureTextEntry
        />
      )}
    </Wrapper>
  )
}

export const Wrapper = styled.View({
  marginTop: 64,
  width: '100%',
  paddingHorizontal: 16,
})
