import MyProfileScreen from '@/screen/MyProfileScreen'
import PostScreen from '@/screen/PostScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator()

export default function MyProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name='MyProfile' component={MyProfileScreen} />
      <Stack.Screen name='Post' component={PostScreen} options={{ title: '게시물' }} />
    </Stack.Navigator>
  )
}
