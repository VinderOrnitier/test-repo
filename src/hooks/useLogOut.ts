import { useContext, useState } from 'react';
import { AppContext } from '../modules/core/AppContextProvider';
import { LoginContext } from '../modules/login';
import { signOut } from 'firebase/auth';

const useLogOut = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useContext(LoginContext);
  const { auth } = useContext(AppContext);

  const logout = async () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: 'LOGOUT' });
        sessionStorage.clear();
      })
      .catch((err: any) => {
        setError(err.message);
      });
    // try {
    //   await auth.signOut();
    //   dispatch({ type: 'LOGOUT' });
    //   sessionStorage.clear();
    // } catch (err: any) {
    //   console.log(err?.message);
    // }
  };

  return { logout, error };
};

export default useLogOut;