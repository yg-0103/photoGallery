import styled from '@emotion/native'

export const Container = styled.View({
  paddingVertical: 16,
})

export const Header = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 16,
  paddingHorizontal: 16,
})

export const Profile = styled.Pressable({
  flexDirection: 'row',
  alignItems: 'center',
})

export const Image = styled.Image({
  width: '100%',
  aspectRatio: 1,
  marginBottom: 16,
  backgroundColor: '#bdbdbd',
})

export const DisplayName = styled.Text({
  marginLeft: 8,
  lineHeight: 16,
  fontSize: 16,
  fontWeight: 'bold',
})

export const Wrapper = styled.View({
  paddingHorizontal: 16,
})

export const Desc = styled.Text({
  marginBottom: 8,
  lineHeight: 24,
  fontSize: 16,
})

export const Date = styled.Text({
  fontSize: 12,
  lineHeight: 18,
  color: '#757575',
})
