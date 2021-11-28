import { useContext } from 'react';
import { AppContext } from '../modules/core/AppContextProvider';
import { LoginContext } from '../modules/login';

export const useLogIn = () => {
  const { dispatch } = useContext(LoginContext);
  const { auth } = useContext(AppContext);

  const login = async (email: string, password: string) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      dispatch({ type: 'LOGIN', payload: user });
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  return { login };
};

export default useLogIn;
