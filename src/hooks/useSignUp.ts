import { useContext } from 'react';
import { AppContext } from '../modules/core/AppContextProvider';
import { LoginContext } from '../modules/login';

export const useSignUp = () => {
  const { dispatch } = useContext(LoginContext);
  const { auth } = useContext(AppContext);

  const signup = async (email: string, password: string) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      dispatch({ type: 'LOGIN', payload: user });
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  return { signup };
};

export default useSignUp;
