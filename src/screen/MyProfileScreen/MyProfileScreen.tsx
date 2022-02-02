import Profile from '@/components/Profile'
import { useUserState } from '@/modules/account/atoms'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'

export default function MyProfileScreen() {
  const [user] = useUserState()
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ title: user?.displayName })
  }, [navigation, user])

  if (!user?.id) return null

  return <Profile userId={user?.id} />
}
