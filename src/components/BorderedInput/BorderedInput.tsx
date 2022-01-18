import styled from '@emotion/native'
import React from 'react'
import { TextInputProps } from 'react-native'

interface Props extends TextInputProps {
  hasMarginBottom?: boolean
}

export default function BorderedInput(props: Props) {
  return <Input {...props} />
}

const Input = styled.TextInput(
  {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: '#fff',
  },
  ({ hasMarginBottom }: { hasMarginBottom?: boolean }) => {
    return hasMarginBottom && { marginBottom: 16 }
  }
)
