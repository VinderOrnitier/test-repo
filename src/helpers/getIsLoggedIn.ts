// @ts-ignore
import localStorage from 'redux-persist/es/storage';
import { LOCAL_STORAGE_KEYS } from '../constants';

const getIsLoggedIn = async () => {
  const token = await localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  return !!token;
}

export default getIsLoggedIn;