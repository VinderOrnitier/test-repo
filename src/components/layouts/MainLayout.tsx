import React, { useContext } from 'react';
import { MENU_ITEMS, PATH } from '../../constants';
import IChildrenProps from '../../interfaces/IChildren';
import { VButton, VMenu } from '..';
import { LoginContext } from '../../modules/login';
import { logOut } from '../../helpers';

const MainLayout = ({ children }: IChildrenProps) => {
  const { user } = useContext(LoginContext);
  
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
      <VButton className="ml-auto block" onClick={logOut}>
        Log Out
      </VButton>
      <hr className="my-4" />
      {children}
    </div>
  );
};

export default MainLayout;
