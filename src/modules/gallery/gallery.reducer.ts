import IAction from '../../interfaces/IAction';
import * as CONSTANTS from './gallery.constants'
import { IUserState } from './gallery.types';

const initialState: IUserState = {
  users: [],
  loading: false,
  error: null,
}
// eslint-disable-next-line
export default (state = initialState, action: IAction): IUserState => {
  switch (action.type) {
    case CONSTANTS.GALLERY_REQUEST:
      return {
        users: [],
        loading: true,
        error: null,
      }
    case CONSTANTS.GALLERY_SUCCESS:
      return {
        users: action.payload,
        loading: false,
        error: null,
      }
    case CONSTANTS.GALLERY_FAILURE:
      return {
        users: [],
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}