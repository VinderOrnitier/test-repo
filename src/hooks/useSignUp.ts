import { useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

import { AppContext } from '../modules/core/AppContextProvider';
import { LoginContext } from '../modules/login';
import { COLLECTION } from '../constants';

const IMG_PLACEHOLDER = 'https://via.placeholder.com/80'

interface IUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useContext(LoginContext);
  const { auth, firestore } = useContext(AppContext);

  const dispatchNotCancelled = (action: any) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const setDocument = async (user: IUser) => {
    setIsLoading(true)
    try {
      const docRef = doc(firestore, COLLECTION.USERS, user.uid);
      const document = await setDoc(docRef, {
        online: true,
        displayName: user.displayName || user.email,
        photoURL: user.photoURL || IMG_PLACEHOLDER,
        timestamp: serverTimestamp(),
      }, { merge: true });
      dispatchNotCancelled({ type: 'ADDED_DOCMENT', payload: document });
      setIsLoading(false);
    } catch (err: any) {
      dispatchNotCancelled({ type: 'ON_ERROR', payload: err.message });
      setError(err?.message);
      setIsLoading(false);
    }
  };


  const signup = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      dispatchNotCancelled({ type: 'LOGIN', payload: user });
      setDocument(user);
      setIsLoading(false)
    } catch (err: any) {
      dispatchNotCancelled({ type: 'ON_ERROR', payload: err.message });
      setError(err?.message);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      dispatchNotCancelled({ type: 'LOGIN', payload: user });
      setDocument(user);
    } catch (err: any) {
      dispatchNotCancelled({ type: 'ON_ERROR', payload: err.message });
      setError(err?.message);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, signUpWithGoogle, isLoading, error };
};

export default useSignUp;
