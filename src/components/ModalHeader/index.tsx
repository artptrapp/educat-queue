import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { CloseButton, HeaderContainer } from './styles'

type ModalHeaderProps = {
  title: string,
  onCloseClick: () => void
}

const ModalHeader = ({ title, onCloseClick }: ModalHeaderProps) => {
  return (
    <HeaderContainer>
      <h2>
        {title}
      </h2>
      <CloseButton onClick={onCloseClick}>
        X
      </CloseButton>
    </HeaderContainer>
  )
}

export default ModalHeader