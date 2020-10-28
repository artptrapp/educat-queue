import React from 'react'
import { SDropDown } from './styles'

interface SelectProps {
  children?: any
  name?: string
  width?: number
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FC<SelectProps> = ({ children, name, width, onChange }) => {
  return (
    <SDropDown style={{ width: `${width}px` }} onChange={onChange} name={name}>
      {children}
    </SDropDown>
  )
}

export default Select
