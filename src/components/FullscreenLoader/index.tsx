import React from 'react'
import { CenteredAbsoluteImage, FullscreenOverlay } from './styles'
import loadingGif from '../../assets/educat-loading.gif'

const FullscreenLoader = () => {
  return (
    <FullscreenOverlay>
      <CenteredAbsoluteImage src={loadingGif}></CenteredAbsoluteImage>
    </FullscreenOverlay>
  )
}

export default FullscreenLoader