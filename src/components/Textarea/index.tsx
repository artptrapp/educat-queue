import React, { TextareaHTMLAttributes } from 'react'
import { STextArea } from './styles'

type TextAreaProps = {
    rows: number,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea = ({ rows, onChange }: TextAreaProps) => {
    return <STextArea rows={rows} onChange={onChange}></STextArea>
}

export default TextArea