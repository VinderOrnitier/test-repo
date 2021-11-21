import React, { useState, useMemo } from 'react';

import { LOCAL_STORAGE_KEYS } from '../../../constants';
import IChildrenProps from '../../../interfaces/IChildren';

import { LoginContext } from '../login.context';

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
