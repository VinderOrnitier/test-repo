import React, { createContext } from 'react';
import IChildrenProps from '../../interfaces/IChildren';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { FIREBASE_OPTIONS } from '../../constants';

firebase.initializeApp(FIREBASE_OPTIONS);

const firestore = getFirestore();
const auth = getAuth();

export const AppContext = createContext<any>({});

const AppContextProvider = ({ children }: IChildrenProps) => {
  
  return (
    <AppContext.Provider value={{firebase, firestore, auth}}>
      {children}
    </AppContext.Provider>
    )
};

export default AppContextProvider;
