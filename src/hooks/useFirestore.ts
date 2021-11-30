import { useContext, useEffect, useReducer, useState } from 'react';
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
      return {...state, isLoading: true, onSuccess: false}
    case 'ADDED_DOCMENT':
        return {...state, isLoading: false, document: action.payload, onSuccess: true}
    case 'DELETED_DOCMENT':
        return {...state, isLoading: false, document: null, onSuccess: true}
    case 'ON_ERROR':
        return {isLoading: false, document: null, onSuccess: true, onError: action.payload}
    default:
      return state;
  }
};

const useFirestore = (collection: any) => {
  const { firestore, firebase } = useContext(AppContext);
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  
  const ref = firestore.collection(collection)
  const timestamp = firebase.firestore.Timestamp // firebase.firestore.FieldValue.serverTimestamp(),

  const dispatchNotCancelled = (action: any) => {
    if(!isCancelled) {
      dispatch(action)
    }
  }

  const addDocument = async (doc: any) => {
    dispatch({type: 'IS_LOADING'});

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({...doc, createdAt});
      dispatchNotCancelled({type: 'ADDED_DOCMENT', payload: addedDocument})
    } catch (error: any) {
      dispatchNotCancelled({type: 'ON_ERROR', payload: error.message})
    }
  };

  const deleteDocument = async (id: any) => {
    dispatch({type: 'IS_LOADING'});

    try {
      await ref.doc(id).delete()
      dispatchNotCancelled({type: 'DELETED_DOCMENT'})
    } catch(error: any) {
      dispatchNotCancelled({type: 'ON_ERROR', payload: error.message})
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { response, addDocument, deleteDocument };
};

export default useFirestore;
