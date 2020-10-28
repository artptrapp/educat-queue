import React, { ChangeEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { IOcurrency } from '../../pages/Queue/types'
import { FirebaseContext } from '../../states/FirebaseState'
import Label from '../Label'
import StatusChangeCheckbox from '../StatusChangeCheckbox'
import { CardContainer, CardContent, CardFooter, CardTitle, SeeDetailsLink } from './styles'

type OcurrencyCardProps = {
  item: IOcurrency,
  onItemOpen: (item: IOcurrency) => void
}

const OcurrencyCard = ({ item, onItemOpen }: OcurrencyCardProps) => {
  const { database } = useContext(FirebaseContext)
  const date = new Date(item.when.seconds * 1000)
  const formattedDate = `${date.toLocaleString('pt-BR')}`
  const [checked, setChecked] = useState(item.solved || false)
  const [loading, setLoading] = useState(false)

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const shouldCheck = e.target.checked

    try {
      database?.collection('ocurrencies').doc(item.key).set({
        solved: shouldCheck
      }, { merge: true }).then(() => {
        toast.success('Salvo com sucesso')
        setChecked(true)
      }).finally(() => {
        setLoading(false)
        setChecked(shouldCheck)
      })
    } catch (e) {
      toast.error('Houve um erro ao marcar este item como resolvido.')
    }
  }

  const handleSeeDetails = () => {
    onItemOpen(item)
  }

  const formattedDescription = item.description.length > 150 ? item.description.substr(0, 149) + '...' : item.description

  return (
    <CardContainer>
      <CardTitle>
        {item.name}
        <Label environment={item.environment} />
      </CardTitle>
      <CardContent>
        {formattedDescription}
      </CardContent>
      <CardFooter>
        {formattedDate}
        <SeeDetailsLink onClick={handleSeeDetails}>Ver detalhes</SeeDetailsLink>
        <StatusChangeCheckbox loading={loading} onChange={handleCheckChange} checked={checked} />
      </CardFooter>
    </CardContainer>
  )
}

export default OcurrencyCard