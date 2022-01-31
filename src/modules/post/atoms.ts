import { atom, useRecoilState, useSetRecoilState } from 'recoil'
import { User } from '../account/atoms'

export interface PostForm {
  user?: User
  photoUrl?: string
  description?: string
}

export interface Post extends PostForm {
  id: string
  createdAt: any
}

const postForm = atom<PostForm | null>({
  key: '@post/postForm',
  default: null,
})

export const usePostFormState = () => {
  return useRecoilState(postForm)
}

export const useSetPostFormState = () => {
  return useSetRecoilState(postForm)
}

const posts = atom<Post[] | null>({
  key: '@post/posts',
  default: null,
})

export const usePostsState = () => {
  return useRecoilState(posts)
}

export const useSetPostsState = () => {
  return useSetRecoilState(posts)
}
