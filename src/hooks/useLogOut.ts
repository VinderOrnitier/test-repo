import { useContext } from 'react';
import { AppContext } from '../modules/core/AppContextProvider';
import { LoginContext } from '../modules/login';

const useLogOut = () => {
  const { dispatch } = useContext(LoginContext);
  const { auth } = useContext(AppContext);

  const logout = async () => {
    try {
      await auth.signOut();
      dispatch({ type: 'LOGOUT' });
      sessionStorage.clear();
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  return { logout };
};

export default useLogOut;