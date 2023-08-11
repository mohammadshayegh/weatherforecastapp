import config from "../../config";
import endpoints from "../endpoints";
import useQuery from "../hooks";
import { ForecastResponseType } from "../types/forecast";
import { QueryConfigType } from "../types/queyClientTypes";

type UseGetCityForecastInputType = { lat: number; lon: number; days?: number };

export const useGetCityForecast = (
  params: UseGetCityForecastInputType,
  queryConfig?: QueryConfigType
) => {
  return useQuery<ForecastResponseType>(
    endpoints.forecast,
    {
      params: {
        key: config.API_KEY,
        q: `${params.lat},${params.lon}`,
        days: params.days || 5,
      },
    },
    queryConfig
  );
};
