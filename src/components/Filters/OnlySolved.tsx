import React from 'react'

type OnlySolvedProps = {
  checked?: boolean,
  onChange: (checked: boolean) => void
}

const OnlySolved = ({ checked, onChange }: OnlySolvedProps) => {
  return (
    <p style={{ margin: 0 }}>
      Apenas resolvidos:
      <input style={{ transform: 'scale(1.5)' }} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}></input>
    </p>
  )
}

export default OnlySolved