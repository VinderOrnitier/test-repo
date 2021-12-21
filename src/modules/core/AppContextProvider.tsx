import React, { createContext } from 'react';
import IChildrenProps from '../../interfaces/IChildren';

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

import { FIREBASE_OPTIONS } from '../../constants';

initializeApp(FIREBASE_OPTIONS);

const firestore = getFirestore();
const auth = getAuth();
const storage = getStorage();
const rtDB = getDatabase();

export const AppContext = createContext<any>({});

const AppContextProvider = ({ children }: IChildrenProps) => {
  
  return (
    <AppContext.Provider value={{firestore, storage, auth, rtDB}}>
      {children}
    </AppContext.Provider>
    )
};

export default AppContextProvider;
