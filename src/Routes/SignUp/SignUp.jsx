import React, { useContext, useState, createRef } from 'react'
import firebase from 'firebase'
import { redirectTo } from '@reach/router'
import AppContext from '../../AppContext'

export default function SignUp (props) {
  const [{ userAuthorized }] = useContext(AppContext)
  const [error, setError] = useState(false)
  const [redirectToSignIn, setRedirectToSignIn] = useState(false)
  const email = createRef()
  const passwordOne = createRef()
  const passwordTwo = createRef()

  const isValid = () => {
    return (
      passwordOne.current.value === passwordTwo.current.value &&
      /[\w?!.,-_+=]{6,}/.test(passwordOne.current.value) &&
      /[\w@.]{6,}/.test(email.current.value)
    )
  }

  const onSubmitHandler = e => {
    e.preventDefault()
    if (isValid()) {
      setError(false)
      firebase.auth()
        .createUserWithEmailAndPassword(
          email.current.value,
          passwordOne.current.value)
        .then(authUser => {
          alert('User is created') // create user collection
          setRedirectToSignIn(true)
          console.log(authUser)
        })
        .catch(({ code, message }) => {
          if (code === 'auth/email-already-in-use') {
            alert('The email address is already in use by another account.')
            email.current.value = ''
          }
        })

      return
    }

    setError('Check your data')
  }

  if (redirectToSignIn) {
    return redirectTo('sign_up')
  }

  if (userAuthorized) {
    alert('You have already signed in')
    return redirectTo('my_notes')
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
