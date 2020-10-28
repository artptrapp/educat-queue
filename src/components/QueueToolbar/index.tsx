import React from 'react'
import { ToolbarContainer } from './styles'

const QueueToolbar: React.FC = ({ children }) => {
  return (
    <ToolbarContainer>
      {children}
    </ToolbarContainer>
  )
}

export default QueueToolbar