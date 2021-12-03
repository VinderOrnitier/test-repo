import React, { createContext, useReducer, useContext, useEffect } from 'react';
import IAction from '../../interfaces/IAction';
import IChildrenProps from '../../interfaces/IChildren';
import { AppContext } from '../core/AppContextProvider';
import { onAuthStateChanged } from 'firebase/auth'

export const LoginContext = createContext<any>({});

export const authRedcer = (state: any, action: IAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action?.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { ...state, user: action?.payload, authIsReady: true };
    default:
      return state;
  }
};

const LoginContextProvider = ({ children }: IChildrenProps) => {
  const { auth } = useContext(AppContext);
  const [state, dispatch] = useReducer(authRedcer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: any) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
      unsub();
    });
  }, []); // eslint-disable-line

  return <LoginContext.Provider value={{ ...state, dispatch }}>{children}</LoginContext.Provider>;
};

export default LoginContextProvider;
