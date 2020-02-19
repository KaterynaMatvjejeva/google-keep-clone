import React, { useContext, useState, createRef } from 'react'
import { Redirect, Link } from '@reach/router'
import AppContext from '../../AppContext'
import { Form } from './styles'

export default function SignUp (props) {
  const [{ userAuthorized, FB }] = useContext(AppContext)
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
    setError(null)

    if (isValid()) {
      try {
        setError(false)
        FB.signUp(
          email.current.value,
          passwordOne.current.value)

        alert('User is created')
      } catch ({ code, message }) {
        if (code === 'auth/email-already-in-use') {
          alert(message)
          email.current.value = ''
        }
      }
    } else {
      setError('Check is your data correct')
    }
  }

  if (userAuthorized) {
    alert('You was signed in')
    return <Redirect to="/notes" noThrow/>
  }

  return (
    <>
      <h2>Fill your details for Sign Up</h2>
      <button><Link to='/'>Go to Homepage</Link></button>
      <Form onSubmit={onSubmitHandler}>
        <p>Email:</p>
        <input
          name="email"
          ref={email}
          type="text"
          placeholder="Email Address"
        />
        <p>Password (should be at least 6 symbols):</p>
        <input
          name="passwordOne"
          ref={passwordOne}
          type="password"
          placeholder="Password"
        />
        <p>Confirm your password:</p>
        <input
          name="passwordTwo"
          ref={passwordTwo}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit">Sign Up</button>
        {error && <p>{error}</p>}
      </Form>
    </>
  )
}
