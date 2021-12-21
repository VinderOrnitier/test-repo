import { useContext, useEffect, useState } from 'react';
import { ref, child, get } from "firebase/database";
import { AppContext } from '../modules/core/AppContextProvider';

const useUsersStatus = () => {
  const { rtDB } = useContext(AppContext);
  const [usersOnline, setUsersOnline] = useState<any>();
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const dbRef = ref(rtDB);

    get(child(dbRef, `status`)).then((snapshot) => {
      if (snapshot.exists()) {
        setUsersOnline(snapshot.val())
      } else {
        console.log("No data available");
        setError(error);
      }
    }).catch((error) => {
      setError(error);
    });
    
    // eslint-disable-next-line
  }, []);

  return { usersOnline, error };
};

export default useUsersStatus;

  //TODO: future base implementation "online status" with firestore + realtime DB sync
  // const checkPresence = () => {
  //   const uid = user.uid;

  //   // Realtime DB
  //   const userStatusDatabaseRef = ref(rtDB, `/status/${uid}`);
  //   const isOfflineForDatabase = {
  //       state: 'offline',
  //       last_changed: serverTimestamp(),
  //   };
  //   const isOnlineForDatabase = {
  //       state: 'online',
  //       last_changed: serverTimestamp(),
  //   };

  //   // Firestore
  //   const userStatusFirestoreRef  = doc(firestore, COLLECTION.USERS, uid);
  //   const isOfflineForFirestore = {
  //       online: false,
  //       last_changed: fsTimestamp(),
  //   };
  //   const isOnlineForFirestore = {
  //       online: true,
  //       last_changed: fsTimestamp(),
  //   };

  //   const connectedRef = ref(rtDB, '.info/connected');
  //   onValue(connectedRef, (snapshot) => {
  //       if (snapshot.val() === false) {
  //         updateDoc(userStatusFirestoreRef, isOfflineForFirestore);
  //       };
        
  //       onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
  //         set(userStatusDatabaseRef, isOnlineForDatabase);
  //         updateDoc(userStatusFirestoreRef, isOnlineForFirestore);
  //       });
  //   });
  // }