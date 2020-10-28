import React from 'react'
import { ModalBodyContainer, ModalBodyWrapper } from './styles'

const ModalBody: React.FC = ({ children }) => {
  return (
    <ModalBodyContainer>
      <ModalBodyWrapper>
        {children}
      </ModalBodyWrapper>
    </ModalBodyContainer>
  )
}

export default ModalBody