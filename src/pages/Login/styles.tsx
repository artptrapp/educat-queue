import styled from 'styled-components'

export const LoginContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Form = styled.div`
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.105);
  border-radius: 0.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 100%;
  }
`

export const FormLogo = styled.img`
  width: calc(100% / 1.5);
  margin-bottom: 1rem;
`

export const BlockFieldContainer = styled.div`
  width: 100%;
  display: grid;
`