import styled from '@emotion/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const KeyboardAvoidingContainer = styled.KeyboardAvoidingView({
  flex: 1,
})

export const Container = styled(SafeAreaView)({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
})

export const Title = styled.Text({
  fontSize: 48,
})

export const Desc = styled.Text({
  marginTop: 16,
  fontSize: 21,
  color: '#757575',
})
