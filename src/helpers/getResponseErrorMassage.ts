import { AxiosResponse } from "axios";

const getResponseErrorMessage = (response: AxiosResponse): string => {

  if (response.data?.message) {
    return response.data.message
  }

  return 'Something get wrong :('
}

export default getResponseErrorMessage;