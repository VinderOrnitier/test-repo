import React, { useState, useMemo, createContext } from 'react';

import { LOCAL_STORAGE_KEYS } from '../../constants';
import IChildrenProps from '../../interfaces/IChildren';

export const LoginContext = createContext<any>({});

const LoginContextProvider = ({ children }: IChildrenProps) => {
  const [user, setUser] = useState(null);

  const contextValues = useMemo(() => {
    if(!user) {
      const getInfo = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_INFO)
      const userInfo = getInfo ? JSON.parse(getInfo) : null
      
      return {
        user: userInfo,
        setUser
      }
    }

    return ({user, setUser})
  }, [user, setUser])
  
  return (
    <LoginContext.Provider value={contextValues}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
