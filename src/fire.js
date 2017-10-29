import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyDkAtthd2FixiunTKiDDpczNueT76d26nk",
    authDomain: "boardboxjam.firebaseapp.com",
    databaseURL: "https://boardboxjam.firebaseio.com",
    projectId: "boardboxjam",
    storageBucket: "boardboxjam.appspot.com",
    messagingSenderId: "408519923384"
  };
var fire = firebase.initializeApp(config);
export default fire;
