import UploadMode from '@/modals/UploadMode'
import { PostUploadScreenProps } from '@/navigation/RootStack/RootStack'
import styled from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ActionSheetIOS, Platform } from 'react-native'
import { ImagePickerResponse, launchCamera, ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'

const TABBAR_HEIGHT = 49

const imagePickerOption: ImageLibraryOptions = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
}

export default function CameraButton() {
  const [visible, setVisible] = useState(false)
  const navigation = useNavigation<PostUploadScreenProps['navigation']>()
  const insets = useSafeAreaInsets()

  const bottom = Platform.select({
    android: TABBAR_HEIGHT / 2,
    ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
  })

  const pickImage = (image: ImagePickerResponse) => {
    if (image.didCancel || !image) return
    navigation.push('Upload', { image })
  }

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, pickImage)
  }

  const onLaunchImageLabrary = () => {
    launchImageLibrary(imagePickerOption, pickImage)
  }

  const handlePress = () => {
    if (Platform.OS === 'android') {
      setVisible(true)
      return
    }

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['카메라로 촬영하기', '사진 선택하기', '취소'],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          onLaunchCamera()
        } else if (buttonIndex === 1) {
          onLaunchImageLabrary()
        }
      }
    )
  }

  return (
    <>
      <Container bottom={bottom}>
        <PressableCircle android_ripple={{ color: '#fff' }} onPress={handlePress}>
          <Icon name='camera-alt' color='#fff' size={24} />
        </PressableCircle>
      </Container>
      <UploadMode
        visible={visible}
        onClose={() => setVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLabrary}
      />
    </>
  )
}

const Container = styled.View(
  {
    position: 'absolute',
    left: '50%',
    zIndex: 5,
    width: 54,
    height: 54,
    borderRadius: 27,
    transform: [{ translateX: -27 }],
    ...Platform.select({
      ios: {
        shadowColor: '#4d4d4d',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
    }),
  },
  ({ bottom }: { bottom?: number }) => ({ bottom })
)

const PressableCircle = styled.Pressable({
  width: 54,
  height: 54,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 27,
  backgroundColor: '#6200ee',
})
