import React from 'react';

import { MENU_ITEMS, PATH } from '../../../constants';
import IChildrenProps from '../../../interfaces/IChildren';
import { VButton, VMenu } from '../../../components';
import { useAuthContext, useLogOut } from '../../../hooks';

const MainLayout = ({ children }: IChildrenProps) => {
  const { user } = useAuthContext();
  const { logout, error: logoutError } = useLogOut()
  
  const menuArray = [
    {
      path: PATH.ROOT,
      name: MENU_ITEMS.MAIN,
    },
    {
      path: PATH.GALLERY,
      name: MENU_ITEMS.GALLERY,
    },
    {
      path: PATH.POSTS,
      name: MENU_ITEMS.POSTS,
      exact: true,
    },
  ];
  
  return (
    <div className="main">
      <header className="flex items-center justify-between my-2">
        <h4 className="font-bold">
          Hello {user?.email}
        </h4>
        <VMenu menuArray={menuArray} />
      </header>
      <hr className="mb-4" />
      <VButton className="ml-auto block" onClick={logout}>
        Log Out
      </VButton>
      <hr className="my-4" />
      {logoutError && <p className="mb-4 text-red-900">{logoutError}</p>}
      {children}
    </div>
  );
};

export default MainLayout;
