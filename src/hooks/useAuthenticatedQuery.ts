import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";


interface IAuthenticatedQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}

const useAuthenticatedQuery = ({queryKey, url, config}: IAuthenticatedQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const {data} = await AxiosInstance.get(url, config);
      return data;
    }
  });
}


export default useAuthenticatedQuery;