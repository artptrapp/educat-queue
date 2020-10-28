import React from 'react'

import { SButton } from './styles'
import Loader from 'react-loader-spinner'

type TButtonTypes = 'button' | 'reset' | 'submit'

interface ButtonProps {
  type: TButtonTypes
  label: string
  onClick?: () => unknown
  isLoading?: boolean
  className?: string
  width?: number
}

const Button: React.FC<ButtonProps> = ({ type, label, isLoading, onClick, width, className }: ButtonProps) => {
  return (
    <SButton className={className} style={{ width: `${width}px` }} disabled={isLoading} onClick={onClick} type={type}>
      {!isLoading && label}
      {isLoading && (
        <Loader
          width={15}
          height={15}
          color="#000"
          type="Oval"
        />
      )}
    </SButton>
  )
}

export default Button
