import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator()

export default function RootStack() {
  return <Stack.Navigator></Stack.Navigator>
}
