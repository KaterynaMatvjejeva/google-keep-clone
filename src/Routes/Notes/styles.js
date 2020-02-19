import styled from 'styled-components'

export const TextContainer = styled.div`
  max-height: 250px;
  width: 200px;
  display: inline-block;
  border: 1px solid orange;
  border-radius: 7px;
  overflow: auto;
  padding: 10px;
`
export const NoteContainer = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding: 20px;
  & > * {
    margin-bottom: 10px;
  }
`
export const NotesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
