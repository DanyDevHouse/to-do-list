import Vue from 'vue';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: ",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
Vue.use(firebase)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    Vue.prototype.$fb = firebase
}
