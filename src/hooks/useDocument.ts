import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../modules/core/AppContextProvider';
import { onSnapshot, doc, Timestamp, DocumentData, FirestoreError  } from 'firebase/firestore';

interface IDocument {
  c: string;
  id: string;
}

const useDocument = ({ c, id }: IDocument) => {
  const { firestore } = useContext(AppContext);
  const [document, setDocument] = useState();
  const [error, setError] = useState<string | null>(null);

  // prevent infinite loop in useEffect with array on every call
  const docId = useRef(id).current;

  useEffect(() => {
    const ref = doc(firestore, c, docId);
    const createdAt = Timestamp.fromDate(new Date());

    const unsub = onSnapshot(
      ref,
      (snapshot: DocumentData) => {
        if(snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id, createdAt });
          setError(null);
        } else {
          setError('Not such document exist');
        }
      },
      (error: FirestoreError ) => {
        console.log(error);
        setError(error.message);
      }
    );

    return () => unsub();
    // eslint-disable-next-line
  }, [c, docId]);

  return { document, error };
};

export default useDocument;
