import styled from '@emotion/native'
import React, { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'

interface Props extends TextInputProps {
  hasMarginBottom?: boolean
}

export default forwardRef(function BorderedInput(props: Props, ref: React.ForwardedRef<TextInput>) {
  return <Input ref={ref} {...props} />
})

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
