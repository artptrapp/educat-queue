import React from 'react'
import Button from '../Button'
import { ModalFooterContainer } from './styles'

type ModalFooterProps = {
  onConfirm: () => void
  onCancel: () => void
  submitting?: boolean
}

const ModalFooter = ({ onConfirm, onCancel, submitting }: ModalFooterProps) => {
  return (
    <ModalFooterContainer>
      <Button isLoading={submitting} onClick={onConfirm} width={80} type="submit" label="Salvar" />
      <Button isLoading={submitting} onClick={onCancel} width={80} type="submit" label="Cancelar" />
    </ModalFooterContainer>
  )
}

export default ModalFooter