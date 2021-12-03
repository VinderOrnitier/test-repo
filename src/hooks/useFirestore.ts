import { useContext, useEffect, useReducer, useState } from 'react';
import IAction from '../interfaces/IAction';
import { AppContext } from '../modules/core/AppContextProvider';
import { collection, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore'

let initialState = {
  document: null,
  isLoading: false,
  onSuccess: null,
  onError: null,
};

const firestoreReducer = (state: any, action: IAction) => {
  switch (action.type) {
    case 'IS_LOADING':
      return {...state, isLoading: true, onSuccess: false}
    case 'ADDED_DOCMENT':
        return {...state, isLoading: false, document: action.payload, onSuccess: true}
    case 'UPDATED_DOCMENT':
        return {...state, isLoading: false, document: action.payload, onSuccess: true}
    case 'DELETED_DOCMENT':
        return {...state, isLoading: false, document: null, onSuccess: true}
    case 'ON_ERROR':
        return {isLoading: false, document: null, onSuccess: true, onError: action.payload}
    default:
      return state;
  }
};

const useFirestore = (col: any) => {
  const { firestore, firebase } = useContext(AppContext);
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  
  const ref = collection(firestore, col)
  const timestamp = firebase.firestore.Timestamp // firebase.firestore.FieldValue.serverTimestamp(),

  const dispatchNotCancelled = (action: any) => {
    if(!isCancelled) {
      dispatch(action)
    }
  }

  const addDocument = async (doc: any) => {
    dispatch({type: 'IS_LOADING'});
    const createdAt = timestamp.fromDate(new Date())
    await addDoc(ref, {...doc, createdAt})
    .then((res: any) => {
      dispatchNotCancelled({type: 'ADDED_DOCMENT', payload: res.docs});
    })
    .catch((error: any) => {
      dispatchNotCancelled({type: 'ON_ERROR', payload: error.message})
    });
  };

  const deleteDocument = async (id: any) => {
    const ref = doc(firestore, col, id);
    dispatch({type: 'IS_LOADING'});
    await deleteDoc(ref)
      .then((res: any) => {
        dispatchNotCancelled({type: 'DELETED_DOCMENT'})
      })
      .catch((error: any) => {
        dispatchNotCancelled({type: 'ON_ERROR', payload: error.message})
      });
  };

  const updateDocument = async (id: any, updates: any) => {
    const ref = doc(firestore, col, id);
    dispatch({type: 'IS_LOADING'});
    await setDoc(ref, {...updates}, { merge: true })
      .then((res: any) => {
        dispatchNotCancelled({type: 'UPDATED_DOCMENT', payload: res.data()})
        console.log('data error ---', res.data());
      })
      .catch((error: any) => {
        dispatchNotCancelled({type: 'ON_ERROR', payload: error.message})
      });
  };

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { response, addDocument, deleteDocument, updateDocument };
};

export default useFirestore;
