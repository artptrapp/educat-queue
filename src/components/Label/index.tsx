import React from 'react'
import { LabelContainer } from './styles'

type LabelProps = {
    environment: string
}

const colorMapping: any = {
    'abneuro': {
        'bg': '#bbb',
        'font': '#fff'
    },
    'aborl': {
        'bg': 'blue',
        'font': '#fff'
    },
    'dic': {
        'bg': '#ddd',
        'font': 'red'
    },
    'febrasgo': {
        'bg': '#34AEC8',
        'font': '#E4356F'
    },
    'sbacv': {
        'bg': '#1D3980',
        'font': '#D21024'
    },
    'sbmt': {
        'bg': '#fff',
        'font': '#47B69C'
    },
    'sbn': {
        'bg': '#fff',
        'font': '#1B8BC3'
    },
    'sbp': {
        'bg': '#020066',
        'font': 'white'
    }
}

const Label = ({ environment }: LabelProps) => {
    const style = colorMapping[environment.toLowerCase()]
    return (
        <LabelContainer style={{ backgroundColor: style.bg, color: style.font }}>
            {environment}
        </LabelContainer>
    )
}

export default Label