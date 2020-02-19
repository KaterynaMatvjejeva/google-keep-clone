import React, { useContext, useState } from 'react'
import { Link } from '@reach/router'
import AppContext from '../../AppContext'
import { APP_ACTIONS } from '../../appReducer'
import Popup from '../../library/components/Popup'
import Home from '../Home'
import { TextContainer, NoteContainer, NotesContainer } from './styles'

export default function Notes (props) {
  const [{ notes, userAuthorized, FB }, dispatch] = useContext(AppContext)
  const [noteId, setNoteId] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  const notesIds = Object.keys(notes)

  const createButtonCb = e => {
    e.preventDefault()
    setNoteId('')
    setShowPopup(true)
  }

  const submitButtonCb = payload => {
    dispatch({
      type: APP_ACTIONS.UPDATE_NOTE,
      payload
    })
    FB.updateNote(payload)
  }

  const editButtonCb = e => {
    e.preventDefault()
    const noteId = e.target.parentNode.getAttribute('data-key')
    setNoteId(noteId)
    setShowPopup(true)
  }

  const deleteButtonCb = e => {
    // send update to db (usernme from context)
    e.preventDefault()
    const uuid = e.target.parentNode.getAttribute('data-key')
    dispatch({
      type: APP_ACTIONS.DELETE_NOTE,
      payload: uuid
    })
    FB.deleteNote(uuid)
  }

  const NotesList = () =>
    notesIds.map(key => (
      <NoteContainer key={key} data-key={key}>
        <TextContainer>
          <h3>{notes[key].title}</h3>
          <p>{notes[key].body}</p>
        </TextContainer>
        <button onClick={editButtonCb}>Edit</button>
        <button onClick={deleteButtonCb}>Delete</button>
      </NoteContainer>
    ))

  if (!userAuthorized) {
    return <Home />
  }

  return (
    <>
      <h1>Your notes</h1>
      <button onClick={createButtonCb}>Create note</button>
      <button><Link to='/'>Go Back to Homepage</Link></button>
      <button onClick={() => FB.signOut()}>Sign-out</button>
      {!notesIds.length
        ? <div>You do not have any notes</div>
        : (
          <NotesContainer>
            <NotesList />
          </NotesContainer>
        )}
      <Popup
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        submitButtonCb={submitButtonCb}
        currentNote={{ ...notes[noteId], noteId }}
      />
    </>
  )
}
