import { GUARD, PATH } from "../constants";
import useAuthContext from "./useAuthContext";

export const useGuardsRouter = () => {
  const { user } = useAuthContext();
  const requireLogin = async (to: any, from: any, next: any) => {
  
    if (to.meta[GUARD.AUTH_ONLY] && !user) {
      next.redirect(PATH.LOGIN);
    }
  
    if (!to.meta[GUARD.AUTH_ONLY] && user) {
      next.redirect(PATH.ROOT)
    }
  
    next();
  }

  return { requireLogin }
}

export default useGuardsRouter;