import { useUserState } from '@/modules/account/atoms'
import styled from '@emotion/native'
import React from 'react'
import { Image } from 'react-native'

export default function Main() {
  const [user] = useUserState()

  return (
    <Container>
      {user?.photoUrl && (
        <Image
          source={{ uri: user.photoUrl }}
          style={{ width: 128, height: 128, marginBottom: 16 }}
          resizeMode='cover'
        />
      )}
      <Title>Hello, {user?.displayName}</Title>
    </Container>
  )
}

const Container = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
})

const Title = styled.Text({
  fontSize: 24,
})
