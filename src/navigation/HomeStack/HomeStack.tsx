import FeedScreen from '@/screen/FeedScreen/FeedScreen'
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
    </Stack.Navigator>
  )
}
