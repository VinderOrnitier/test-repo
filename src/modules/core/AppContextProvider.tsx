import React, { createContext } from 'react';
import IChildrenProps from '../../interfaces/IChildren';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyA518STOPOKnaYAKhFbCMfbRFdzWJp1NLo",
  authDomain: "test-project-0-e390a.firebaseapp.com",
  projectId: "test-project-0-e390a",
  storageBucket: "test-project-0-e390a.appspot.com",
  messagingSenderId: "1036684960328",
  appId: "1:1036684960328:web:75ca678b7d3d6ca552ee7d",
  measurementId: "G-E93FD85P2M"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export const AppContext = createContext<any>({});

const AppContextProvider = ({ children }: IChildrenProps) => {
  
  return (
    <AppContext.Provider value={{firebase, firestore, auth}}>
      {children}
    </AppContext.Provider>
    )
};

export default AppContextProvider;
