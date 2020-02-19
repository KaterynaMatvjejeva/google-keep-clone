import React, { useContext } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { Redirect } from '@reach/router'
import AppContext from '../../AppContext'

export default function SignIn (props) {
  const [{ userAuthorized, FB }] = useContext(AppContext)

  if (userAuthorized) {
    return (<Redirect to="/notes" noThrow/>)
  }

  return (
    <div>
      <h2>Please sign-in:</h2>
      <StyledFirebaseAuth uiConfig={FB.uiConfig} firebaseAuth={ FB.auth() }/>
    </div>
  )
}
