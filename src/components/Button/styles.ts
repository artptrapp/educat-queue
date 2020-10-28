import styled from 'styled-components'

export const SButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #212121;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  background: none;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;

  &:not(:last-of-type) {
    margin-right: 1rem;
  }
`
