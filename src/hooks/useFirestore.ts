import { useContext, useEffect, useReducer, useState } from 'react';
import { collection, addDoc, doc, deleteDoc, setDoc, FirestoreError, DocumentData, Timestamp } from 'firebase/firestore';

import IAction from '../interfaces/IAction';
import { AppContext } from '../modules/core/AppContextProvider';

let initialState = {
  document: null,
  isLoading: false,
  onSuccess: null,
  onError: null,
};

const firestoreReducer = (state: any, action: IAction) => {
  switch (action.type) {
    case 'IS_LOADING':
      return { ...state, isLoading: true, onSuccess: false };
    case 'ADDED_DOCMENT':
      return { ...state, isLoading: false, document: action.payload, onSuccess: true };
    case 'UPDATED_DOCMENT':
      return { ...state, isLoading: false, document: action.payload, onSuccess: true };
    case 'DELETED_DOCMENT':
      return { ...state, isLoading: false, document: null, onSuccess: true };
    case 'ON_ERROR':
      return { isLoading: false, document: null, onSuccess: true, onError: action.payload };
    default:
      return state;
  }
};

const useFirestore = (col: string) => {
  const { firestore } = useContext(AppContext);
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = collection(firestore, col);

  const dispatchNotCancelled = (action: IAction) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (doc: DocumentData) => {
    dispatch({ type: 'IS_LOADING' });
    const createdAt = Timestamp.fromDate(new Date());
    await addDoc(ref, { ...doc, createdAt })
      .then((res: DocumentData) => {
        dispatchNotCancelled({ type: 'ADDED_DOCMENT', payload: res.docs });
      })
      .catch((error: DocumentData) => {
        dispatchNotCancelled({ type: 'ON_ERROR', payload: error.message });
      });
  };

  const deleteDocument = async (id: string) => {
    const ref = doc(firestore, col, id);
    dispatch({ type: 'IS_LOADING' });
    await deleteDoc(ref)
      .then(() => {
        dispatchNotCancelled({ type: 'DELETED_DOCMENT' });
      })
      .catch((error: FirestoreError) => {
        dispatchNotCancelled({ type: 'ON_ERROR', payload: error.message });
      });
  };

  const updateDocument = async (id: string, updates: any) => {
    const ref = doc(firestore, col, id);
    dispatch({ type: 'IS_LOADING' });
    await setDoc(ref, { ...updates }, { merge: true })
      .then((res: any) => {
        dispatchNotCancelled({ type: 'UPDATED_DOCMENT', payload: res });
      })
      .catch((error: FirestoreError) => {
        dispatchNotCancelled({ type: 'ON_ERROR', payload: error.message });
      });
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, addDocument, deleteDocument, updateDocument };
};

export default useFirestore;
