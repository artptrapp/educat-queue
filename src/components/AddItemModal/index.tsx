import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import useProviders from '../../hooks/useProviders'
import { BlockFieldContainer } from '../../pages/Login/styles'
import { FirebaseContext } from '../../states/FirebaseState'
import Input from '../Input'
import ModalBody from '../ModalBody'
import ModalFooter from '../ModalFooter'
import ModalHeader from '../ModalHeader'
import Select from '../Select'
import TextArea from '../Textarea'

type AddItemModalProps = {
  open: boolean,
  onClose: () => void
}

const AddItemModal = ({ open, onClose }: AddItemModalProps) => {

  const { database, sendNotification, uploadFile } = useContext(FirebaseContext)
  const [name, setName] = useState('')
  const [environment, setEnvironment] = useState('')
  const [phone, setPhone] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setFile(e.target.files[0])
    }
  }

  const handleConfirm = async () => {
    if (!name || !environment || !phone || !description) {
      toast.error('Preencha os campos corretamente. Os campos obrigatórios são nome, ambiente, telefone e descrição.')
      return
    }

    if (!database) {
      return
    }

    setLoading(true)
    try {
      const payload = {
        name,
        environment,
        phone,
        description,
        fileName: '',
        when: new Date()
      }
      if (file) {
        const resultFile = await uploadFile(file)
        payload.fileName = resultFile
      }

      await database.collection('ocurrencies').add(payload)

      sendNotification(`Médico ${name} da ${environment.toUpperCase()}. ${description}`)
      toast.success('Salvo com sucesso')
      onClose()
    } catch (e) {
      console.error(e)
      toast.error('Ocorreu um erro ao salvar.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    onClose()
  }

  const providers = useProviders()
  return (
    <Modal
      isOpen={open}
      onRequestClose={() => onClose()}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <ModalHeader title="Adicionar ocorrência" onCloseClick={onClose} />
      <ModalBody>
        <BlockFieldContainer>
          <label htmlFor="doctorName">Nome do médico: </label>
          <Input onChange={(e) => setName(e.target.value)} name="doctorName"></Input>
        </BlockFieldContainer>
        <BlockFieldContainer>
          <label htmlFor="provider">Ambiente: </label>
          <Select onChange={(e) => setEnvironment(e.target.value)} name="provider">
            <option value="" selected>Selecione</option>
            {providers.map((provider) => {
              return <option key={provider.value} value={provider.value}>{provider.name}</option>
            })}
          </Select>
        </BlockFieldContainer>
        <BlockFieldContainer>
          <label htmlFor="doctorPhone">Telefone do médico: </label>
          <Input onChange={(e) => setPhone(e.target.value)} name="doctorPhone"></Input>
        </BlockFieldContainer>
        <BlockFieldContainer>
          <label htmlFor="problemDescription">Descrição do problema: </label>
          <TextArea rows={5} onChange={(e) => setDescription(e.target.value)}></TextArea>
        </BlockFieldContainer>
        <BlockFieldContainer>
          <label htmlFor="attachment">Anexo: </label>
          <input onChange={handleInputFile} type="file" name="attachment"></input>
        </BlockFieldContainer>
      <ModalFooter submitting={loading} onConfirm={handleConfirm} onCancel={handleCancel} />
      </ModalBody>
    </Modal>
  )
}

export default AddItemModal