import firebase from "firebase/app";
import config from "./config.json";
import "firebase/auth"

firebase.initializeApp(config);

let provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();

export const signInWithGoogle = ()=>{
    auth.signInWithPopup(provider);
};

export default firebase;