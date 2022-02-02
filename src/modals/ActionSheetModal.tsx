import { Modal } from 'react-native'
import React from 'react'
import styled from '@emotion/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface Actions {
  icon: string
  text: string
  onPress: () => void
}

interface Props {
  visible: boolean
  onClose: () => void
  actions: Actions[]
}

export default function ActionSheetModal({ visible, onClose, actions }: Props) {
  return (
    <Modal visible={visible} transparent animationType='fade' onRequestClose={onClose}>
      <Overlay onPress={onClose}>
        <Container>
          {actions.map((action) => (
            <ActionButton
              key={action.text}
              android_ripple={{ color: '#eee' }}
              onPress={() => {
                action.onPress()
                onClose()
              }}
            >
              <ButtonIcon name={action.icon} size={24} color='#757575' />
              <ButtonText>{action.text}</ButtonText>
            </ActionButton>
          ))}
        </Container>
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

const Container = styled.View({
  width: 300,
  elevation: 2,
  backgroundColor: '#fff',
  borderRadius: 4,
})

const ActionButton = styled.Pressable({
  flexDirection: 'row',
  alignItems: 'center',
  padding: 16,
})

const ButtonIcon = styled(Icon)({
  marginRight: 8,
})

const ButtonText = styled.Text({
  fontSize: 16,
})
