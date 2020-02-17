import React from 'react'
import { Router } from '@reach/router'

import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Notes from './Notes'
import NotFound from './NotFound'

const Routes = () => (
  <Router style={{ height: '100%' }}>
    <Home path='/' />
    <SignIn path='/sign_in' />
    <SignUp path='/sign_up' />
    <Notes path='notes' />
    <NotFound default />
  </Router>
)

export default Routes
