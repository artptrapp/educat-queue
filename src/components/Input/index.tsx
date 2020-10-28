import React from 'react'

import { SInput } from './styles'

interface InputProps {
  name: string
  type?: any
  id?: string
  defaultValue?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  ref?: any
}

const Input: React.FC<InputProps> = ({ name, type = 'text', id = name, value, defaultValue, onChange, ref }) => {
  return <SInput onChange={onChange} ref={ref} value={value} id={id} type={type} defaultValue={defaultValue} />
}

export default Input
