import { RootStackParamList } from '@/navigation/RootStack/RootStack'
import storage from '@react-native-firebase/storage'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { Platform } from 'react-native'
import { ImagePickerResponse } from 'react-native-image-picker'

export default function useUploadImage() {
  const [loading, setLoading] = useState(false)
  const { params } = useRoute<RouteProp<RootStackParamList, 'Welcome'>>()

  const upload = async (image: ImagePickerResponse | null) => {
    if (!image || !image.assets) return null
    setLoading(true)
    const asset = image.assets[0]
    const extension = asset.fileName?.split('.').pop()

    const referene = storage().ref(`/profile/${params?.uid}.${extension}`)

    try {
      Platform.OS === 'android'
        ? await referene.putString(asset.base64!, 'base64', {
            contentType: asset.type,
          })
        : await referene.putFile(asset.uri!)
      console.log('try', referene)
      return await referene.getDownloadURL()
    } catch (e) {
      console.log('error', referene)

      console.error(e)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { loading, upload }
}
