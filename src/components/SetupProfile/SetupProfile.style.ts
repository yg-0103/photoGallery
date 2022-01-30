import styled from '@emotion/native'

export const Container = styled.View({
  alignItems: 'center',
  width: '100%',
  marginTop: 24,
  paddingHorizontal: 16,
})

export const ProfileImage = styled.Image({
  width: 128,
  height: 128,
  backgroundColor: '#cdcdcd',
  borderRadius: 64,
})

export const Form = styled.View({
  marginTop: 16,
  width: '100%',
})

export const ButtonWrapper = styled.View({
  marginTop: 48,
})

export const Spinner = styled.ActivityIndicator({
  flex: 1,
})
