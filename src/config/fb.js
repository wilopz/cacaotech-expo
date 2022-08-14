import Constants from "expo-constants";
import firebase from 'firebase/app';
import "firebase/firestore"
import { initializeApp } from "firebase/app";
//import { firestore } from "react-native-firebase";
//import { getFirestore } from "@firebase/firestore";

export const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  databaseURL: Constants.manifest.extra.databaseURL
};

initializeApp(firebaseConfig);

const db = firebase.firestore();
export default {
  db
}


