import config from "../../config";
import endpoints from "../endpoints";
import useQuery from "../hooks";
import { QueryConfigType } from "../types/queyClientTypes";
import { WeatherResponseType } from "../types/weather";

export const useGetCurrentWeather = (
  cityUrl: string,
  queryConfig?: QueryConfigType<WeatherResponseType>
) => {
  return useQuery<WeatherResponseType>(
    [endpoints.currentWeather, cityUrl],
    endpoints.currentWeather,
    { params: { key: config.API_KEY, q: cityUrl } },
    queryConfig
  );
};
