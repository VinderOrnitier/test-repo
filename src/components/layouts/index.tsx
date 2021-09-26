import React, { useState, useEffect, useMemo } from 'react';

import { getIsLoggedIn } from '../../helpers';
import { LoginContext } from '../../modules/login';
import IChildrenProps from '../../interfaces/IChildren';

import AuthLayout from './AuthLayout';
import MainLayout from './MainLayout';

const Layout = ({ children }: IChildrenProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState({ email: '', name: '' });
  const contextValues = useMemo(() => ({user, setUser}), [user, setUser])
  
  useEffect(() => {
    getIsLoggedIn().then((res: boolean) => setIsAuthenticated(res));
  });

  return (
    <LoginContext.Provider value={contextValues}>
      {isAuthenticated ? <MainLayout>{children}</MainLayout> : <AuthLayout>{children}</AuthLayout>}
    </LoginContext.Provider>
    );
};

export default Layout;
