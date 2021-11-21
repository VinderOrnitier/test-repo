import React, { useState, useEffect } from 'react';

import { getIsLoggedIn } from '../../helpers';
import IChildrenProps from '../../interfaces/IChildren';

import AuthLayout from './AuthLayout';
import MainLayout from './MainLayout';
import LoginContextProvider from '../../modules/login/components/LoginContextProvider';

const Layout = ({ children }: IChildrenProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    getIsLoggedIn().then((res: boolean) => setIsAuthenticated(res));
  });

  return (
    <LoginContextProvider>
      {isAuthenticated ? <MainLayout>{children}</MainLayout> : <AuthLayout>{children}</AuthLayout>}
    </LoginContextProvider>
    );
};

export default Layout;
