import React from 'react'
import Modal from 'react-modal'
import { BlockFieldContainer } from '../../pages/Login/styles'
import { IOcurrency } from '../../pages/Queue/types'
import Label from '../Label'
import ModalBody from '../ModalBody'
import ModalHeader from '../ModalHeader'
import { DisplayAttachment, FieldLabel } from './styles'

type SeeItemModalProps = {
  isOpen: boolean
  item?: IOcurrency
  onClose: () => void
}

const SeeItemModal = ({ item, isOpen, onClose }: SeeItemModalProps) => {
  if (!item) {
    return null
  }

  const formattedDate = new Date(item.when.seconds * 1000).toLocaleString('pt-BR')

  return (
    <Modal
      isOpen={isOpen}
    >
      <ModalHeader title={item.name} onCloseClick={onClose} />
      <ModalBody>
        <BlockFieldContainer style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <FieldLabel>Telefone: </FieldLabel>{item.phone}
        </BlockFieldContainer>
        <BlockFieldContainer style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <FieldLabel>Ambiente: </FieldLabel><Label environment={item.environment} />
        </BlockFieldContainer>
        <BlockFieldContainer style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <FieldLabel>Descrição: </FieldLabel><p style={{ margin: 0, wordBreak: 'break-all' }}>{item.description}</p>
        </BlockFieldContainer>
        <BlockFieldContainer style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <FieldLabel>Quando: </FieldLabel>{formattedDate}
        </BlockFieldContainer>
        <BlockFieldContainer style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <FieldLabel>Anexos</FieldLabel>
        </BlockFieldContainer>
        <DisplayAttachment src={item.fileName} />
      </ModalBody>
    </Modal>
  )
}

export default SeeItemModal