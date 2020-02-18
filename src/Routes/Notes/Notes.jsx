import React, { useContext, useState } from 'react'
import { Redirect } from '@reach/router'
import AppContext from '../../AppContext'
import { APP_ACTIONS } from '../../appReducer'
import Popup from '../../library/components/Popup'

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
    // send update to db (usernme from context)
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
      <div key={key} data-key={key}>
        {/* note template -> lib comp */}
        <h3>{notes[key].title}</h3>
        <p>{notes[key].body}</p>
        <button onClick={editButtonCb}>Edit</button>
        <button onClick={deleteButtonCb}>Delete</button>
      </div>
    ))

  if (!userAuthorized) {
    return <Redirect to="/sign_in" noThrow/>
  }

  return (
    <>
      <button onClick={createButtonCb}>Create note</button>
      {!notesIds.length
        ? <div>You do not have any notes</div>
        : <NotesList />}
      <Popup
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        submitButtonCb={submitButtonCb}
        currentNote={{ ...notes[noteId], noteId }}
      />
    </>
  )
}
