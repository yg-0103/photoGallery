import styled from '@emotion/native'
import { FlatList } from 'react-native'

export const Spinner = styled.ActivityIndicator({
  flex: 1,
  justifyContent: 'center',
})

export const Container = styled.FlatList({
  flex: 1,
}) as unknown as typeof FlatList

export const UserInfo = styled.View({
  paddingTop: 80,
  paddingBottom: 64,
  alignItems: 'center',
})

export const UserName = styled.Text({
  marginTop: 8,
  fontSize: 24,
  color: '#424242',
})
