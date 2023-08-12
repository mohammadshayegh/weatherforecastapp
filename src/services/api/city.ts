import config from "../../config";
import endpoints from "../endpoints";
import useQuery from "../hooks";
import { CityResponseType } from "../types/city";
import { QueryConfigType } from "../types/queyClientTypes";

export const useGetCities = (
  city: string,
  queryConfig?: QueryConfigType<CityResponseType>
) => {
  return useQuery<CityResponseType>(
    [endpoints.search, city],
    endpoints.search,
    {
      params: {
        key: config.API_KEY,
        q: city,
      },
    },
    queryConfig
  );
};
