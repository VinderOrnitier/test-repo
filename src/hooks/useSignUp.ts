import { useContext, useState } from 'react';
import { LoginContext } from '../modules/login';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import useAuthContext from './useAuthContext';

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useContext(LoginContext);
  const { auth, firestore } = useAuthContext();

  const signup = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res: any) => {
        dispatch({ type: 'LOGIN', payload: res.user });
      })
      .catch((err: any) => {
        setError(err.message);
      });
    // try {
    //   const { user } = await auth.createUserWithEmailAndPassword(email, password);
    //   dispatch({ type: 'LOGIN', payload: user });
    // } catch (err: any) {
    //   console.log(err?.message);
    // }
  };

  return { signup, error };
};

export default useSignUp;
