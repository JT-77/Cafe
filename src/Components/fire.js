import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAC-mcZYGBbnZq5KY5xWjrrNvA_8XXB-GE",
    authDomain: "iplt20-cafe.firebaseapp.com",
    databaseURL: "https://iplt20-cafe.firebaseio.com",
    projectId: "iplt20-cafe",
    storageBucket: "iplt20-cafe.appspot.com",
    messagingSenderId: "675864745182",
    appId: "1:675864745182:web:1f86630e9eb562c856de4f",
    measurementId: "G-2Z9882DQT4"
  };
  // Initialize Firebase
  var fire = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default fire;