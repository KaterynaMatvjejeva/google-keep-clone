import firebase from 'firebase'

export default class FireBase {
  constructor () {
    this.uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
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

  setUid (uid) {
    this.uid = uid
  }

  updateNote (note) {
    const noteId = Object.keys(note)[0]
    firebase.firestore().collection(this.uid).doc(noteId).set({ ...note[noteId], noteId }, { merge: true })
  }

  deleteNote (noteId) {
    firebase.firestore().collection(this.uid).doc(noteId).delete()
  }

  async getAllNotes () {
    const snapshot = await firebase.firestore().collection(this.uid).get()
    return snapshot.docs.map(doc => doc.data())
  }
}
