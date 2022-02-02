import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import SignInScreen from '@/screen/SignInScreen'
import WelcomeScreen from '@/screen/WelcomeScreen'
import { useUserState } from '@/modules/account/atoms'
import MainTab from '../MainTab'
import useAuth from '@/hooks/useAuth'
import useUserCollection from '@/hooks/useUserCollection'
import PostUploadScreen from '@/screen/PostUploadScreen'
import { ImagePickerResponse } from 'react-native-image-picker'
import { Post } from '@/modules/post/atoms'

export type RootStackParamList = {
  SignIn: {
    isSignUp?: boolean
  }
  Welcome: {
    uid?: string
  }
  Upload: {
    image?: ImagePickerResponse
  }
  Profile: {
    userId?: string
    displayName?: string
  }
  Post: {
    post: Post
  }
  MyProfile: undefined
}

export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>
export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>
export type PostUploadScreenProps = NativeStackScreenProps<RootStackParamList, 'Upload'>
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>
export type PostScreenProps = NativeStackScreenProps<RootStackParamList, 'Post'>
export type MyProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'MyProfile'>

const Stack = createNativeStackNavigator()

export default function RootStack() {
  const [user, setUser] = useUserState()
  const { getUser } = useUserCollection()
  const { subscribeAuth } = useAuth()

  useEffect(() => {
    const unsubscribe = subscribeAuth(async (currentUser) => {
      unsubscribe?.()

      if (!currentUser) return

      try {
        const profile = await getUser(currentUser.uid)
        if (!profile) return

        setUser(profile)
      } catch (e) {
        console.error(e)
      }
    })
  }, [getUser, setUser, subscribeAuth])

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      {user ? (
        <>
          <Stack.Screen name='Main' component={MainTab} options={{ headerShown: false }} />
          <Stack.Screen
            name='Upload'
            component={PostUploadScreen}
            options={{ title: '새 게시물', headerBackTitle: '뒤로가기' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name='SignIn' component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  )
}
