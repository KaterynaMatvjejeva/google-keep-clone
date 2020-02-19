import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 45px;
  & > * {
    margin-bottom: 15px;
    max-width: 300px;
  }

  & > button {
    margin-top: 25px;
  }
`
