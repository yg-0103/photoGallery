import { NavigationContainer } from '@react-navigation/native'
import RootStack from './navigation/RootStack/RootStack'
import React from 'react'
import { RecoilRoot } from 'recoil'

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </RecoilRoot>
  )
}
