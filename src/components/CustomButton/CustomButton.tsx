import styled from '@emotion/native'
import React from 'react'
import { Platform, Pressable, StyleSheet } from 'react-native'

interface Props {
  onPress: () => void
  title: string
  hasMarginBottom?: boolean
  theme?: 'primary' | 'secondary'
}

export default function CustomButton({ onPress, title, hasMarginBottom, theme = 'primary' }: Props) {
  return (
    <Container hasMarginBottom={hasMarginBottom}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.base,
          styles[theme],
          {
            opacity: Platform.OS && pressed ? 0.5 : 1,
          },
        ]}
        android_ripple={{ color: '#fff' }}
      >
        <Title style={[styles[`${theme}Text`]]}>{title}</Title>
      </Pressable>
    </Container>
  )
}

const Container = styled.View(
  {
    width: '100%',
    borderRadius: 4,
  },
  ({ hasMarginBottom }: { hasMarginBottom?: boolean }) => {
    return hasMarginBottom && { marginBottom: 8 }
  }
)

const Title = styled.Text({
  fontSize: 14,
  fontWeight: 'bold',
})

const styles = StyleSheet.create({
  base: {
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#6200ee',
  },
  secondary: {
    backgroundColor: '#fff',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#6200ee',
  },
})
