import { useAuthContext } from '../../../hooks';
import IChildrenProps from '../../../interfaces/IChildren';

import AuthLayout from './AuthLayout';
import MainLayout from './MainLayout';

const Layout = ({ children }: IChildrenProps) => {
  const { user } = useAuthContext();
  return user ? <MainLayout>{children}</MainLayout> : <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
