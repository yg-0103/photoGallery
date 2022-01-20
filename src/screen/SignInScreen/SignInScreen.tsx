import React, { useState } from 'react'
import { Keyboard, Platform } from 'react-native'
import { SignInScreenProps } from '@/navigation/RootStack/RootStack'
import * as S from './SignInScreen.style'
import SignForm from '@/components/SignForm/SignForm'
import SignButtons from '@/components/SignButtons/SignButtons'

export interface InputFormData {
  email: string
  password: string
  confirmPassword: string
}

export default function SignInScreen({ route }: SignInScreenProps) {
  const { isSignUp } = route.params ?? {}
  const [form, setForm] = useState<InputFormData>({
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

  return (
    <S.KeyboardAvoidingContainer behavior={Platform.select({ ios: 'padding' })}>
      <S.Container>
        <S.Title>Photo Gallery</S.Title>
        <SignForm
          isSignUp={isSignUp}
          form={form}
          handleSubmit={handleSubmit}
          createChangeTextHandler={createChangetextHandler}
        />
        <SignButtons isSignUp={isSignUp} handleSubmit={handleSubmit} />
      </S.Container>
    </S.KeyboardAvoidingContainer>
  )
}
