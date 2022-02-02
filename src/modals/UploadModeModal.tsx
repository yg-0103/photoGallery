import React from 'react'
import ActionSheetModal from './ActionSheetModal'

interface Props {
  visible: boolean
  onClose: () => void
  onLaunchCamera: () => void
  onLaunchImageLibrary: () => void
}

export default function UploadModeModal({ visible, onClose, onLaunchCamera, onLaunchImageLibrary }: Props) {
  return (
    <ActionSheetModal
      visible={visible}
      onClose={onClose}
      actions={[
        {
          icon: 'camera-alt',
          text: '카메라로 촬영하기',
          onPress: onLaunchCamera,
        },
        {
          icon: 'photo',
          text: '사진 선택하기',
          onPress: onLaunchImageLibrary,
        },
      ]}
    />
  )
}
