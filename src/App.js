import React, { useReducer, useEffect } from 'react'
import firebase from 'firebase'
import AppContext from './AppContext'
import appReducer, { initialState, APP_ACTIONS } from './appReducer'
import Routes from './Routes'

function App () {
  const [state, dispatch] = useReducer(appReducer, initialState)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      firebaseUser
        ? dispatch({
          type: APP_ACTIONS.USER_AUTHORIZED,
          payload: firebase.auth().currentUser
        })
        : dispatch({
          type: APP_ACTIONS.USER_LOGED_OUT
        })
    })
  }, [])

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <Routes />
    </AppContext.Provider>
  )
}

export default App
