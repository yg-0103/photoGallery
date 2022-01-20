import { NavigationContainer } from '@react-navigation/native'
import RootStack from './navigation/RootStack/RootStack'
import React from 'react'

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
}
