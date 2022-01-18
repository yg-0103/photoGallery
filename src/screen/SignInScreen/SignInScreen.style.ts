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
  fontSize: 32,
  fontWeight: 'bold',
})

export const Wrapper = styled.View({
  marginTop: 64,
  width: '100%',
  paddingHorizontal: 16,
})

export const ButtonWrapper = styled.View({
  marginTop: 64,
  width: '100%',
  paddingHorizontal: 16,
})
