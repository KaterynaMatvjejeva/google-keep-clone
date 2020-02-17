import firebase from 'firebase'

export default class FireBase {
  constructor () {
    this.uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ]
    }
  }

  setAuthEventLisener (cb) {
    firebase.auth().onAuthStateChanged(firebaseUser => cb(firebaseUser))
  }

  getCurrentUser () {
    return firebase.auth().currentUser
  }

  signOut () {
    firebase.auth().signOut()
  }

  auth () {
    return firebase.auth()
  }

  signUp (email, pass) {
    firebase.auth()
      .createUserWithEmailAndPassword(email, pass)
  }
}
