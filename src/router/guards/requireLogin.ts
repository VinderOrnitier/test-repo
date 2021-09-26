import { GUARD, PATH } from '../../constants';
import { getIsLoggedIn } from '../../helpers';

const requireLogin = async (to: any, from: any, next: any) => {
  const isAuth = await getIsLoggedIn();

  if (to.meta[GUARD.AUTH_ONLY] && !isAuth) {
    next.redirect(PATH.LOGIN);
  }

  if (!to.meta[GUARD.AUTH_ONLY] && isAuth) {
    next.redirect(PATH.ROOT)
  }

  next();
}

export default requireLogin;