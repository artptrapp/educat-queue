import React from 'react'
import { QueueListContainer, QueueListWrapper } from './styles'


const QueueList: React.FC = ({ children }) => {
  const fixedHeight = document.body.clientHeight - 145

  return (
    <QueueListWrapper style={{ height: `${fixedHeight}px` }}>
      <QueueListContainer>
        {children}
      </QueueListContainer>
    </QueueListWrapper>
  )
}

export default QueueList