import { useContext } from "react";
import { LoginContext } from "../modules/login";

export const useAuthContext = () => {
  const context = useContext(LoginContext);

  if(!context) {
    throw Error('useAuthContext must be inside an LoginContextProvider')
  }

  return context
}

export default useAuthContext;