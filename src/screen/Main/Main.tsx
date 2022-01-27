import { useUserState } from '@/modules/account/atoms'
import styled from '@emotion/native'
import React from 'react'

export default function Main() {
  const [user] = useUserState()

  return (
    <Container>
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
