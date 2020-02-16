import React, { useContext } from 'react'
import { Link } from '@reach/router'
import firebase from 'firebase'
import AppContext from '../../AppContext'

const Home = () => {
  const [{ userAuthorized }] = useContext(AppContext)

  return !userAuthorized
    ? (
      <div>
        <h1>You are on homepage of Note App</h1>
        <Link to='/sign_in'>Go to Sign in</Link>
        <Link to='/sign_up'>Go to Create Account</Link>
      </div>
    )
    : (
      <div>
        <div>Go to your notes and logout button</div>
        <p>Welcome {firebase.auth().currentUser.email}! You are now signed-in!</p>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
    )
}

export default Home
