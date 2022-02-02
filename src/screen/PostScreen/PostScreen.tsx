import PostCard from '@/components/PostCard'
import { PostScreenProps } from '@/navigation/RootStack/RootStack'
import styled from '@emotion/native'
import React from 'react'

export default function PostScreen({ route }: PostScreenProps) {
  const { post } = route.params ?? {}

  return (
    <Container>
      <PostCard
        user={post.user}
        photoUrl={post.photoUrl}
        desc={post.description}
        createdAt={post.createdAt}
        id={post.id}
      />
    </Container>
  )
}

const Container = styled.ScrollView({
  flex: 1,
  paddingBottom: 40,
})
