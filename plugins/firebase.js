import Vue from 'vue';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzb3u-hxaCPf-Td3jRLGwdQN90WXc-NV4",
  authDomain: "todolist-f4e1f.firebaseapp.com",
  databaseURL: "https://todolist-f4e1f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todolist-f4e1f",
  storageBucket: "todolist-f4e1f.appspot.com",
  messagingSenderId: "419061936933",
  appId: "1:419061936933:web:dccc27e865f508d3d260cc",
  measurementId: "G-PXSVRK74HB"
};
Vue.use(firebase)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    Vue.prototype.$fb = firebase
}