import styled from 'styled-components'

export const FullscreenOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
`

export const CenteredAbsoluteImage = styled.img`
    margin-left: calc(50% - 128px);
    margin-top: calc(25% - 128px)
`