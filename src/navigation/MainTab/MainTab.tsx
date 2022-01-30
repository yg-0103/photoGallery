import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeStack from '../HomeStack/HomeStack'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MyProfileStack from '../MyProfileStack/MyProfileStack'
import styled from '@emotion/native'
import CameraButton from '@/components/CameraButton/CameraButton'

const Tab = createBottomTabNavigator()

export default function MainTab() {
  return (
    <>
      <Container>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#6200ee',
          }}
        >
          <Tab.Screen
            name='HomeStack'
            component={HomeStack}
            options={{
              tabBarIcon: ({ color }) => <Icon name='home' size={24} color={color} />,
            }}
          />
          <Tab.Screen
            name='MyProfileStack'
            component={MyProfileStack}
            options={{
              tabBarIcon: ({ color }) => <Icon name='person' size={24} color={color} />,
            }}
          />
        </Tab.Navigator>
      </Container>
      <CameraButton />
    </>
  )
}

const Container = styled.View({
  flex: 1,
  zIndex: 0,
})
