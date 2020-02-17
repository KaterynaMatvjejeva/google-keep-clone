import React, { useContext } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import AppContext from '../../AppContext'

export default function SignIn (props) {
  const [{ FB }] = useContext(AppContext)
  return (
    <div>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={FB.uiConfig} firebaseAuth={FB.auth()}/>
    </div>
  )
}
