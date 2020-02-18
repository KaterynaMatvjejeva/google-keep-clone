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
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={FB.uiConfig} firebaseAuth={ FB.auth() }/>
    </div>
  )
}
