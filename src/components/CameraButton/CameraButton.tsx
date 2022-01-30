import styled from '@emotion/native'
import React from 'react'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'

const TABBAR_HEIGHT = 49

export default function CameraButton() {
  const insets = useSafeAreaInsets()

  const bottom = Platform.select({
    android: TABBAR_HEIGHT / 2,
    ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
  })

  return (
    <Container bottom={bottom}>
      <PressableCircle>
        <Icon name='camera-alt' color='#fff' size={24} />
      </PressableCircle>
    </Container>
  )
}

const Container = styled.View(
  {
    position: 'absolute',
    left: '50%',
    zIndex: 5,
    width: 54,
    height: 54,
    borderRadius: 27,
    transform: [{ translateX: -27 }],
    ...Platform.select({
      ios: {
        shadowColor: '#4d4d4d',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
    }),
  },
  ({ bottom }: { bottom?: number }) => ({ bottom })
)

const PressableCircle = styled.Pressable({
  width: 54,
  height: 54,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 27,
  backgroundColor: '#6200ee',
})
