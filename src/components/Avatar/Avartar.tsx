import React from 'react'
import { Image, StyleProp, ImageStyle } from 'react-native'

interface Props {
  source?: string | null
  size?: number
  style?: StyleProp<ImageStyle>
}

export default function Avatar({ source, size = 32, style }: Props) {
  return (
    <Image
      source={source ? { uri: source } : require('@assets/default_user.png')}
      style={[style, { width: size, height: size, borderRadius: size / 2 }]}
    />
  )
}
