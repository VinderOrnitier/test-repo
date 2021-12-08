import { useContext, useState } from 'react';
import { AppContext } from '../modules/core/AppContextProvider';
import { LoginContext } from '../modules/login';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { COLLECTION } from '../constants';

const useLogOut = () => {
  const [error, setError] = useState(null);
  const { dispatch, user } = useContext(LoginContext);
  const { auth, firestore } = useContext(AppContext);

  const logout = async () => {
    try {
      const ref = doc(firestore, COLLECTION.USERS, user.uid);
      await updateDoc(ref, { online: false });
      sessionStorage.clear();
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
    } catch (err: any) {
      setError(err?.message);
    }

    // signOut(auth)
    //   .then(() => {
    //     dispatch({ type: 'LOGOUT' });
    //     sessionStorage.clear();
    //   })
    //   .catch((err: any) => {
    //     setError(err.message);
    //   });
  };

  return { logout, error };
};

export default useLogOut;