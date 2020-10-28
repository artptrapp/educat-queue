import React from 'react'
import { StatusChangeContainer } from './styles'
import Loader from 'react-loader-spinner'

type StatusChangeCheckboxProps = {
  checked?: boolean
  loading?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const StatusChangeCheckbox = ({ onChange, loading, checked }: StatusChangeCheckboxProps) => {

  if (loading) {
    return <Loader
      width={20}
      height={20}
      color="#000"
      type="ThreeDots"
    />
  }

  return (
    <StatusChangeContainer>
      <label htmlFor="statusChangeCheckbox">Resolvido: </label>
      <input onChange={onChange} type="checkbox" checked={checked}></input>
    </StatusChangeContainer>
  )
}

export default StatusChangeCheckbox