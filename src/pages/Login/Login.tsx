import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import Logo from '../../assets/logo.png'
import Button from '../../components/Button'
import FullscreenLoader from '../../components/FullscreenLoader'
import Input from '../../components/Input'
import { AuthContext } from '../../states/AuthState'
import { BlockFieldContainer, Form, FormLogo, LoginContainer } from './styles'
import firebase from 'firebase'

const LoginPage = () => {

  const { authenticate, isCheckingAuth } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Digite um usuário e uma senha')
      return
    }

    setLoading(true)
    try {
      const result = await authenticate(username, password)
      if (!result) {
        toast.error('Usuário ou senha inválidos')
      }
    } catch (e) {
      toast.error('Houve um erro ao autenticar')
    } finally {
      setLoading(false)
    }
  }

  if (isCheckingAuth) {
    return (
      <FullscreenLoader></FullscreenLoader>
    )
  }

  return (
    <LoginContainer>
      <Form style={{ width: '300px' }}>
        <FormLogo src={Logo} alt="Educat Logo" title="Educat Logo" />
        <BlockFieldContainer>
          <label htmlFor="username">Usuário: </label>
          <Input value={username} name="username" onChange={(e) => setUsername(e.target.value)} />
        </BlockFieldContainer>
        <BlockFieldContainer>
          <label htmlFor="password">Senha: </label>
          <Input value={password} name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </BlockFieldContainer>
        <BlockFieldContainer>
          <Button isLoading={loading} type="button" label="Entrar" onClick={handleLogin} />
        </BlockFieldContainer>
      </Form>
    </LoginContainer>
  )
}

export default LoginPage