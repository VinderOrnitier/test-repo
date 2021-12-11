import React from 'react';

import { COLLECTION, MENU_ITEMS, PATH } from '../../../constants';
import IChildrenProps from '../../../interfaces/IChildren';
import { VButton, VMenu, UserItem } from '../../../components';
import { useAuthContext, useCollection, useLogOut } from '../../../hooks';
import IUserCollection from '../../../interfaces/IUserCollection';

const MainLayout = ({ children }: IChildrenProps) => {
  const { user } = useAuthContext();
  const { logout, error: logoutError } = useLogOut();
  const { documents, error: documentsError } = useCollection(COLLECTION.USERS);

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
      path: PATH.TRANSACTIONS,
      name: MENU_ITEMS.TRANSACTIONS,
    },
    {
      path: PATH.POSTS,
      name: MENU_ITEMS.POSTS,
      exact: true,
    },
  ];
  
  return (
    <div className="main flex w-full min-h-screen">
      <aside className="w-1/4 border-r">
        <div className="flex items-center justify-center">
          <UserItem
            srcUrl={user?.photoURL}
            className="w-full flex-col justify-center py-2 px-4 py-11 border-b"
            userName={user?.displayName || user?.email}
            online={user.uid}
          />
        </div>
        <div className="flex flex-col overflow-y-auto py-2" style={{height: 'calc(100vh - 153px)'}}>
          {documentsError && <p>{documentsError}</p>}
          <h4 className="text-white font-bold text-center mb-2">All users</h4>
          {documents?.map((doc: IUserCollection) => {
            if (doc.id === user.uid ) return true
            return (
              <UserItem
                key={doc.id}
                srcUrl={doc.photoURL}
                className={'w-full py-2 px-4'}
                userName={doc.displayName || doc.email}
                online={doc.online}
              />
            )
          })}
        </div>
      </aside>
      <main className="w-full">
        <header className="flex items-center justify-between border-b h-14">
          <VMenu menuArray={menuArray} />
          <VButton className="ml-auto block mr-4" onClick={logout}>Log Out</VButton>
        </header>
        {logoutError && <p className="mb-4 text-red-900">{logoutError}</p>}
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
