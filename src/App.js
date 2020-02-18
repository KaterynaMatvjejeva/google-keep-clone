import React, { useReducer, useEffect } from 'react'
import AppContext from './AppContext'
import appReducer, { initialState, APP_ACTIONS } from './appReducer'
import Routes from './Routes'

const { FB } = initialState

function App () {
  const [state, dispatch] = useReducer(appReducer, initialState)
  useEffect(() => {
    FB.setAuthEventLisener(async firebaseUser => {
      if (firebaseUser){
        dispatch({
          type: APP_ACTIONS.USER_AUTHORIZED,
          payload: FB.getCurrentUser()
        })
       const notes = await FB.getAllNotes()
       dispatch({
        type: APP_ACTIONS.SET_NOTES,
        payload: notes
      })
      return
      }
      dispatch({
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
