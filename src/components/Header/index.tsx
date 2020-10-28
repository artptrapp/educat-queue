import React, { useContext, useEffect, useState } from 'react'
import { HeaderBlock, SHeader } from './styles'
import Logo from '../../assets/logo.png'
import { AuthContext } from '../../states/AuthState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'

const Header = () => {

  const [authed, setAuthed] = useState(false)
  const { isAuthenticated, logout } = useContext(AuthContext)

  useEffect(() => {
    setAuthed(isAuthenticated())
  })

  if (!authed) {
    return null
  }

  return (
    <SHeader>
      <HeaderBlock>
        <img width={200} style={{ width: '100px' }} src={Logo} />
      </HeaderBlock>
      <HeaderBlock style={{ float: 'right', cursor: 'pointer' }} onClick={() => logout()}>
        <h2>
          <FontAwesomeIcon icon={faDoorOpen} />
        </h2>
      </HeaderBlock>
    </SHeader>
  )
}

export default Header
