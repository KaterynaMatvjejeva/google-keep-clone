import React, { useContext, useState, createRef } from 'react'
import firebase from 'firebase'
import { Redirect } from '@reach/router'
import AppContext from '../../AppContext'

export default function SignUp (props) {
  const [{ userAuthorized }] = useContext(AppContext)
  const [error, setError] = useState(false)
  const email = createRef()
  const passwordOne = createRef()
  const passwordTwo = createRef()

  const isValid = () => {
    return (
      passwordOne.current.value === passwordTwo.current.value &&
      /[\w?!.,-_+=]{6,15}/.test(passwordOne.current.value) &&
      /[\w@.]{6,15}/.test(email.current.value)
    )
  }

  const onSubmitHandler = e => {
    e.preventDefault()
    if (isValid()) {
      try {
        setError(false)
        firebase.auth()
          .createUserWithEmailAndPassword(
            email.current.value,
            passwordOne.current.value)
        alert('User is created')
        // firebase.database().push().push().set({ [newUser]: { notes: {firstnote: 'firstnote'} }});
        // create user collection
      } catch ({ code, message }) {
        if (code === 'auth/email-already-in-use') {
          alert(message)
          email.current.value = ''
        }
      }
    } else {
      setError('Check your data')
    }
  }

  if (userAuthorized) {
    alert('You was signed in')
    return <Redirect to="/notes" noThrow/>
  }

  return (
    // place in separate component ?
    // simplify this file
    <form onSubmit={onSubmitHandler}>
      <input
        name="email"
        ref={email}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        ref={passwordOne}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        ref={passwordTwo}
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
    </form>
  )
}
