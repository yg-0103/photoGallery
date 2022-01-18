import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import SignInScreen from './SignInScreen/SignInScreen'

type RootStackParamList = {
  SignIn: {
    isSignUp?: boolean
  }
}

export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>

const Stack = createNativeStackNavigator()

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='SignIn' component={SignInScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
