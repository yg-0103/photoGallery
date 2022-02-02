import FeedScreen from '@/screen/FeedScreen'
import PostScreen from '@/screen/PostScreen'
import ProfileScreen from '@/screen/ProfileScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name='Feed' component={FeedScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='Post' component={PostScreen} options={{ title: '게시물' }} />
    </Stack.Navigator>
  )
}
