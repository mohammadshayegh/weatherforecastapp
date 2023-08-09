import config from "../../config";
import endpoints from "../endpoints";
import useQuery from "../hooks";
import { CityResponseType } from "../types/city";

export const useGetCities = (city: string) => {
  return useQuery<CityResponseType>(endpoints.search, {
    params: {
      key: config.API_KEY,
      q: city,
    },
  });
};
