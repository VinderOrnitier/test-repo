import React from 'react';
import { MENU_ITEMS, PATH } from '../../../constants';
import IChildrenProps from '../../../interfaces/IChildren';
import { VMenu } from '../../../components';

const menuArray = [
  {
    path: PATH.LOGIN,
    name: MENU_ITEMS.LOGIN,
  },
  {
    path: PATH.TERMS,
    name: MENU_ITEMS.TERMS,
  },
];

const AuthLayout = ({ children }: IChildrenProps) => {

  return (
    <div className="auth h-screen px-4">
      <header className="flex items-center justify-between my-2">
        <h4 className="font-bold">Login Header Title</h4>
        <VMenu menuArray={menuArray} />
      </header>
      <hr className="my-4" />
      {children}
    </div>
  );
};

export default AuthLayout;
