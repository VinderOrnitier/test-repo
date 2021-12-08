import { useContext, useState } from 'react';
import { AppContext } from '../modules/core/AppContextProvider';
import { LoginContext } from '../modules/login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { COLLECTION } from '../constants';

export const useLogIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useContext(LoginContext);
  const { auth, firestore } = useContext(AppContext);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const ref = doc(firestore, COLLECTION.USERS, user.uid);
      await updateDoc(ref, { online: true });
      dispatch({ type: 'LOGIN', payload: user });
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { login, isLoading, error };
};

export default useLogIn;
