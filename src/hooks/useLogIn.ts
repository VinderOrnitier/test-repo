import { useContext, useState } from 'react';
import { AppContext } from '../modules/core/AppContextProvider';
import { LoginContext } from '../modules/login';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useLogIn = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useContext(LoginContext);
  const { auth } = useContext(AppContext);

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res: any) => {
        dispatch({ type: 'LOGIN', payload: res.user });
      })
      .catch((err: any) => {
        setError(err.message);
      });
  };

  return { login, error };
};

export default useLogIn;
