import React, { useState } from 'react'
import { Alert, Keyboard, Platform } from 'react-native'
import { SignInScreenProps } from '@/navigation/RootStack/RootStack'
import * as S from './SignInScreen.style'
import SignForm from '@/components/SignForm/SignForm'
import SignButtons from '@/components/SignButtons/SignButtons'
import useAuth, { AuthErrorType } from '@/hooks/useAuth'

export interface InputFormData {
  email: string
  password: string
  confirmPassword: string
}

const messages = {
  [AuthErrorType.ALREADY_USE_EMAIL]: '이미 가입된 이메일입니다',
  [AuthErrorType.WRONG_PW]: '잘못된 비밀번호 입니다.',
  [AuthErrorType.USER_NOT_FOUND]: '존재하지 않는 계정입니다.',
  [AuthErrorType.INVALID_EMAIL]: '유효하지 않은 이메일 주소입니다.',
}

export default function SignInScreen({ route }: SignInScreenProps) {
  const { isSignUp } = route.params ?? {}
  const [form, setForm] = useState<InputFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [loading, setLoading] = useState(false)
  const { signUp, signIn } = useAuth()

  const createChangetextHandler = (name: keyof typeof form) => (value: string) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async () => {
    Keyboard.dismiss()
    const { email, password, confirmPassword } = form

    if (isSignUp && password !== confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다.')
      return
    }

    setLoading(true)

    try {
      const { user } = isSignUp ? await signUp({ email, password }) : await signIn({ email, password })
      console.log(user)
    } catch (e) {
      const msg = messages[(e as any).code as AuthErrorType] || `${isSignUp ? '가입' : '로그인'} 실패`
      Alert.alert('실패', msg)
      console.log(e)
    } finally {
      setLoading(false)
    }
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
        <SignButtons isSignUp={isSignUp} handleSubmit={handleSubmit} loading={loading} />
      </S.Container>
    </S.KeyboardAvoidingContainer>
  )
}
