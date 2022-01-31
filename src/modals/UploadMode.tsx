import { Modal } from 'react-native'
import React from 'react'
import styled from '@emotion/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface Props {
  visible: boolean
  onClose: () => void
  onLaunchCamera: () => void
  onLaunchImageLibrary: () => void
}

export default function UploadMode({ visible, onClose, onLaunchCamera, onLaunchImageLibrary }: Props) {
  return (
    <Modal visible={visible} transparent animationType='fade' onRequestClose={onClose}>
      <Overlay onPress={onClose}>
        <ButtonWrapper>
          <Button
            android_ripple={{ color: '#eee' }}
            onPress={() => {
              onClose()
              onLaunchCamera()
            }}
          >
            <ButtonIcon name='camera-alt' color='#757575' size={24} />
            <Label>카메라로 촬영하기</Label>
          </Button>
          <Button
            android_ripple={{ color: '#eee' }}
            onPress={() => {
              onClose()
              onLaunchImageLibrary()
            }}
          >
            <ButtonIcon name='photo' color='#757575' size={24} />
            <Label>사진 선택하기</Label>
          </Button>
        </ButtonWrapper>
      </Overlay>
    </Modal>
  )
}

const Overlay = styled.Pressable({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
})

const ButtonWrapper = styled.View({
  width: 300,
  elevation: 2,
  backgroundColor: '#fff',
  borderRadius: 4,
})

const Button = styled.Pressable({
  flexDirection: 'row',
  alignItems: 'center',
  padding: 16,
})

const ButtonIcon = styled(Icon)({
  marginRight: 8,
})

const Label = styled.Text({
  fontSize: 16,
})
