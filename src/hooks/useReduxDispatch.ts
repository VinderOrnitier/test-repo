import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { useDispatch } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as UserActionCreators from './'

// export const useAction = () => {
//   const dispatch = useDispatch()
//   return bindActionCreators(UserActionCreators, dispatch)
// }

export type ReduxDispatch = ThunkDispatch<any, {}, AnyAction>

export default function useReduxDispatch(): ReduxDispatch {
  return useDispatch<ReduxDispatch>();
}