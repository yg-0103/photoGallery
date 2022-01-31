import styled from '@emotion/native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface Props {
  iconName: string
  color?: string
  onPress: () => void
}

export default function IconRightButton({ iconName, color = '#6200ee', onPress }: Props) {
  return (
    <Container>
      <Button onPress={onPress}>
        <Icon name={iconName} color={color} size={24} />
      </Button>
    </Container>
  )
}

const Container = styled.View({
  marginRight: -8,
  borderRadius: 24,
  overflow: 'hidden',
})

const Button = styled.TouchableOpacity({
  height: 48,
  width: 48,
  alignItems: 'center',
  justifyContent: 'center',
})
