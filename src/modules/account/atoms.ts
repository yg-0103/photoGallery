import { atom, useRecoilState, useSetRecoilState } from 'recoil'

export interface User {
  displayName: string
  photoUrl: string | null
  id?: string
}

export const user = atom<User | null>({
  key: '@account/user',
  default: null,
})

export const useUserState = () => {
  return useRecoilState(user)
}

export const useSetUserState = () => {
  return useSetRecoilState(user)
}
