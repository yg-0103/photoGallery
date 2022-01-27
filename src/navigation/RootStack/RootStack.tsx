import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import SignInScreen from '@/screen/SignInScreen/SignInScreen'
import WelcomeScreen from '@/screen/WelcomeScreen/WelcomeScreen'
import { useUserState } from '@/modules/account/atoms'
import Main from '@/screen/Main/Main'

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
  const [user] = useUserState()

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name='SignIn' component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  )
}
