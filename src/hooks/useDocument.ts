import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../modules/core/AppContextProvider';
import { onSnapshot, doc } from 'firebase/firestore'

interface IDocument {
  c: string,
  id: string,
}

const useDocument = ({c, id}:IDocument) => {
  const { firestore, firebase } = useContext(AppContext);
  const [document, setDocument] = useState();
  const [error, setError] = useState(null);

  // prevent infinite loop in useEffect with array on every call
  const docId = useRef(id).current;

  const timestamp = firebase.firestore.Timestamp;

  useEffect(() => {
    const ref = doc(firestore, c, docId);
    const createdAt = timestamp.fromDate(new Date());

    const unsub = onSnapshot(ref, (snapshot: any) => {
      setDocument({...snapshot.data(), createdAt});
      setError(null);
    }, (error: any) => {
      console.log(error);
      setError(error.massage);
    })

    return () => unsub()
  // eslint-disable-next-line
  }, [c, docId])

  return {document, error};
};

export default useDocument;