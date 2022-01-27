import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import SignInScreen from '@/screen/SignInScreen/SignInScreen'
import WelcomeScreen from '@/screen/WelcomeScreen/WelcomeScreen'

export type RootStackParamList = {
  SignIn: {
    isSignUp?: boolean
  }
  Welcome: {
    uid?: string
  }
}

export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>
export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>

const Stack = createNativeStackNavigator()

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='SignIn' component={SignInScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
