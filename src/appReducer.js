import FireBase from './firebase'

export const initialState = {
  FB: new FireBase(),
  userAuthorized: false,
  notes: {}
}
// create firebasewrapper, store into context
// onlogin fetch notes data, store into context, set notes action
export const APP_ACTIONS = {
  USER_AUTHORIZED: 'USER_AUTHORIZED',
  USER_LOGED_OUT: 'USER_LOGED_OUT',
  SET_NOTES: 'SET_NOTES',
  DELETE_NOTE: 'DELETE_NOTE',
  UPDATE_NOTE: 'UPDATE_NOTE'
}

const appReducer = (prevState, action) => {
  let notes = {}
  switch (action.type) {
    case APP_ACTIONS.USER_AUTHORIZED:
      initialState.FB.setUid(action.payload.uid)
      return {
        ...prevState,
        uid: action.payload.uid,
        email: action.payload.email,
        userAuthorized: true
      }
    case APP_ACTIONS.USER_LOGED_OUT:
      return {
        ...initialState
      }
    case APP_ACTIONS.SET_NOTES:
      console.log('set', action.payload)
      action.payload.forEach(({noteId, ...rest}) => notes[noteId] = rest)
      return {
        ...prevState,
        notes
      }
    case APP_ACTIONS.UPDATE_NOTE:
      notes = {
        ...prevState.notes,
        ...action.payload
      }
      return {
        ...prevState,
        notes
      }
    case APP_ACTIONS.DELETE_NOTE:
      notes = { ...prevState.notes }
      delete notes[action.payload]
      return {
        ...prevState,
        notes
      }
    default:
      return prevState
  }
}

export default appReducer
