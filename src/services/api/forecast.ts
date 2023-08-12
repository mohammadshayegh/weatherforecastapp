import config from "../../config";
import endpoints from "../endpoints";
import useQuery from "../hooks";
import { ForecastResponseType } from "../types/forecast";
import { QueryConfigType } from "../types/queyClientTypes";

type UseGetCityForecastInputType = { query: string; days?: number };

export const useGetCityForecast = (
  params: UseGetCityForecastInputType,
  queryConfig?: QueryConfigType<ForecastResponseType>
) => {
  return useQuery<ForecastResponseType>(
    [endpoints.forecast, params.query],
    endpoints.forecast,
    {
      params: {
        key: config.API_KEY,
        q: params.query,
        days: params.days || 5,
      },
    },
    queryConfig
  );
};
