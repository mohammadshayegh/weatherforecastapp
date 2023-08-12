import config from "../../config";
import endpoints from "../endpoints";
import useQuery from "../hooks";
import { CityResponseType } from "../types/city";
import { QueryConfigType } from "../types/queyClientTypes";

export const useSearchCityByText = (
  city: string,
  queryConfig?: QueryConfigType<CityResponseType>
) => {
  return useQuery<CityResponseType>(
    [endpoints.searchCity, city],
    endpoints.searchCity,
    {
      params: {
        key: config.API_KEY,
        q: city,
      },
    },
    queryConfig
  );
};
