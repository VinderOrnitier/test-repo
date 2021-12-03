import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../modules/core/AppContextProvider';

// interface IQuery {
//   collection: any,
//   _query?: any[],
//   _orderBy?: any,
// }
const useCollection = (collection: any, _query?: any, _orderBy?: any) => {
  const { firestore } = useContext(AppContext);
  const [documents, setDocuments] = useState<any>();
  const [error, setError] = useState<any>(null);

  // prevent infinite loop in useEffect with array on every call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = firestore.collection(collection)

    if(q) {
      ref = query(ref, where(...q))
    }

    if(orderBy) {
      ref = ref.orderBy(...orderBy)
    }

    const unsub = ref.onSnapshot((snapshot: any) => {
      let results: any[] = [];
      snapshot.docs.forEach((doc: any) => {
        results.push({ ...doc.data(), id: doc.id })
      });

      setDocuments(results);
      setError(null);
    }, (error: any) => {
      console.log(error);
      setError('could not featch the data');
    })

    return () => unsub()
  }, [collection, query, orderBy])

  return {documents, error};
};

export default useCollection;
