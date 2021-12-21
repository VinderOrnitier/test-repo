import React, { useContext, useEffect, useRef, useState } from 'react';
import { ref, onDisconnect, serverTimestamp, onValue, set } from 'firebase/database';
import { doc, updateDoc, serverTimestamp as fsTimestamp } from 'firebase/firestore';

import { COLLECTION, MENU_ITEMS, PATH } from '../../../constants';
import IChildrenProps from '../../../interfaces/IChildren';
import { VButton, VMenu, UserItem } from '../../../components';
import { useAuthContext, useCollection, useLogOut, useUsersStatus } from '../../../hooks';
import IUserCollection from '../../../interfaces/IUserCollection';
import { AppContext } from '../AppContextProvider';

const menuArray = [
  {
    path: PATH.ROOT,
    name: MENU_ITEMS.MAIN,
  },
  {
    path: PATH.TRANSACTIONS,
    name: MENU_ITEMS.TRANSACTIONS,
  },
  // {
  //   path: PATH.GALLERY,
  //   name: MENU_ITEMS.GALLERY,
  // },
  // {
  //   path: PATH.POSTS,
  //   name: MENU_ITEMS.POSTS,
  //   exact: true,
  // },
];

const MainLayout = ({ children }: IChildrenProps) => {
  const { user } = useAuthContext();
  const { rtDB, firestore } = useContext(AppContext);
  const { logout, error: logoutError } = useLogOut();
  const { documents, error: documentsError } = useCollection(COLLECTION.USERS);
  const { usersOnline, error: usersError } = useUsersStatus();
  const [users, setUsers] = useState<any>();

  //TODO: need refactoring
  const sorted = () => {
    let result: any[] = [];
  
    if (!documents?.length) {
      return;
    }
    
    documents?.map((item: any) => {
      let currentObj = usersOnline[item.id];
  
      if (currentObj && currentObj.state === 'online') {
        result.push(item);
      }
    });
  
    return result;
  };

  useEffect(() => {
    const uid = user.uid;

    // Realtime DB
    const userStatusDatabaseRef = ref(rtDB, `/status/${uid}`);
    const isOfflineForDatabase = {
        state: 'offline',
        last_changed: serverTimestamp(),
    };
    const isOnlineForDatabase = {
        state: 'online',
        last_changed: serverTimestamp(),
    };

    // Firestore
    const userStatusFirestoreRef  = doc(firestore, COLLECTION.USERS, uid);
    const isOfflineForFirestore = {
        online: false,
        last_changed: fsTimestamp(),
    };
    const isOnlineForFirestore = {
        online: true,
        last_changed: fsTimestamp(),
    };

    const connectedRef = ref(rtDB, '.info/connected');
    onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === false) {
        updateDoc(userStatusFirestoreRef, isOfflineForFirestore);
      };
      
      onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
        set(userStatusDatabaseRef, isOnlineForDatabase);
        updateDoc(userStatusFirestoreRef, isOnlineForFirestore);
      });
    });

    setUsers(sorted());
    // eslint-disable-next-line
  }, [usersOnline]);

  return (
    <div className="main flex w-full min-h-screen">
      <aside className="w-1/4 border-r">
        <div className="flex items-center justify-center">
          {user && (
            <UserItem
              srcUrl={user.photoURL}
              className="w-full flex-col justify-center py-2 px-4 py-11 border-b"
              userName={user?.displayName || user?.email}
              online={user.uid}
            />
          )}
        </div>
        <div className="flex flex-col overflow-y-auto py-2" style={{height: 'calc(100vh - 153px)'}}>
          {(documentsError || usersError) && <p>{documentsError || usersError}</p>}
          <h4 className="text-white font-bold text-center mb-2">All users</h4>
          {users?.map((doc: IUserCollection) => {
            if (doc.id === user.uid || !doc.online) return true
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
          {documents?.map((doc: IUserCollection) => {
            if (doc.id === user.uid || doc.online) return true
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
