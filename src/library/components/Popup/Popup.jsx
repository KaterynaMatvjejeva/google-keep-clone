import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import { uuid } from 'uuidv4'
import {
  PopupWrapper,
  PopupContainer,
  PopupHeader,
  CancelButton,
  PopupBody
} from './styles'

export default function Popup (props) {
  const {
    currentNote,
    showPopup,
    setShowPopup,
    submitButtonCb
  } = props
  const {
    title,
    body,
    noteId
  } = currentNote

  const input = createRef()
  const textarea = createRef()

  const cancelCb = e => {
    e.stopPropagation()
    setShowPopup(false)
  }

  const onSubmitHandler = e => {
    e.preventDefault()
    submitButtonCb({
      [noteId || uuid()]: {
        title: input.current.value,
        body: textarea.current.value
      }
    })
    setShowPopup(false)
  }

  if (!showPopup) return null

  return (
    <PopupWrapper onClick={cancelCb}>
      <PopupContainer onClick={e => e.stopPropagation()}>
        <PopupHeader>
          {!noteId ? 'Create note' : 'Edit note'}
          <CancelButton onClick={cancelCb} />
        </PopupHeader>
        <PopupBody>
          <form onSubmit={onSubmitHandler}>
            <input
              name="noteTitle"
              defaultValue={title}
              ref={input}
              type="text"
              placeholder="Note title"
            />
            <textarea
              name="noteBody"
              defaultValue={body}
              ref={textarea}
              placeholder="Note text"
            />
            <button type="submit">Confirm</button>
          </form>
        </PopupBody>
      </PopupContainer>
    </PopupWrapper>
  )
}

Popup.propTypes = {
  showPopup: PropTypes.bool.isRequired,
  setShowPopup: PropTypes.func.isRequired,
  currentNote: PropTypes.object.isRequired,
  submitButtonCb: PropTypes.func.isRequired
}
