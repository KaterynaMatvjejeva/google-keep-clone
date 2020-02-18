import React, { useContext } from 'react'
import { Link } from '@reach/router'
import AppContext from '../../AppContext'

const Home = () => {
  const [{ userAuthorized, email, FB }] = useContext(AppContext)

  if (!userAuthorized) {
    return (
      <div>
        <h1>Notes Keep App</h1>
        <p>To continue:</p>
        <button><Link to='/sign_in'>Go to Sign in</Link></button>
        <button><Link to='/sign_up'>Go to Create Account</Link></button>
      </div>
    )
  }
  return (
    <div>
      <h1>Notes Keep App</h1>
      <button><Link to='/notes'>Go to your notes</Link></button>
      <button onClick={() => FB.signOut()}>Sign-out</button>
      <p>Welcome {email}! You are now signed-in!</p>
    </div>
  )
}

export default Home
