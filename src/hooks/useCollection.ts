import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../modules/core/AppContextProvider';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'

// interface ICollection {
//   c: string,
//   _q?: string[],
//   _o?: string[],
// }

const useCollection = (c: string, _q?: string[], _o?: string[]) => {
  const { firestore } = useContext(AppContext);
  const [documents, setDocuments] = useState<any>();
  const [error, setError] = useState<any>(null);

  // prevent infinite loop in useEffect with array on every call
  const q = useRef(_q).current;
  const o = useRef(_o).current;
  

  useEffect(() => {
    let ref = collection(firestore, c)

    if(q) {
      //@ts-ignore
      ref = query(ref, where(...q));
    }

    if(o) {
      //@ts-ignore
      ref = query(ref, orderBy(...o));
    }

    const unsub = onSnapshot(ref, (snapshot: any) => {
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
  // eslint-disable-next-line
  }, [c, q, o])

  return {documents, error};
};

export default useCollection;
