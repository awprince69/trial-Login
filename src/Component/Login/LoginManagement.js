import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
export const initializeApp = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}
export const handleGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            const { email, displayName } = result.user;
            const signInGoogle = { email, displayName }
            return signInGoogle
        }).catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            return newUserInfo;
        });
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const newUserInfo = userCredential.user;
            newUserInfo.error = ''
            updateUserName(name)
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const newUserInfo = userCredential.user
            newUserInfo.error = ''
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            return newUserInfo;
        });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
    }).catch(function (error) {
    });
}