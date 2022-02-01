import Profile from '@/components/Profile'
import { ProfileScreenProps } from '@/navigation/RootStack/RootStack'
import React, { useEffect } from 'react'

export default function ProfileScreen({ route, navigation }: ProfileScreenProps) {
  const { userId, displayName } = route.params || {}

  useEffect(() => {
    navigation.setOptions({
      title: displayName,
    })
  }, [displayName, navigation])

  return <Profile userId={userId!} />
}
