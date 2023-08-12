import config from "../../config";
import { FORECAST_DAYS } from "../constants";
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
        days: params.days || FORECAST_DAYS,
      },
    },
    queryConfig
  );
};
