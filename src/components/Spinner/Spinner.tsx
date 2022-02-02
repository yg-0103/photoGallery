import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native'
import React from 'react'

interface Props {
  size?: number
  color?: string
  style?: StyleProp<ViewStyle>
}

export default function Spinner({ size = 32, color = '#6200ee', style }: Props) {
  return <ActivityIndicator size={size} color={color} style={style} />
}
