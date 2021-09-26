import { LOCAL_STORAGE_KEYS, PATH } from '../constants';
import { history } from '../utils';

const logOut = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  sessionStorage.clear();
  history.push(PATH.LOGIN);
};

export default logOut;