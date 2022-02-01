import MyProfileScreen from '@/screen/MyProfileScreen'
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
    </Stack.Navigator>
  )
}
