import config from "../../config";
import endpoints from "../endpoints";
import useQuery from "../hooks";
import { QueryConfigType } from "../types/queyClientTypes";
import { WeatherResponseType } from "../types/weather";

type UseGetWeatherInputType = { lat: number; lon: number };

export const useGetCurrentWeather = (
  params: UseGetWeatherInputType,
  queryConfig?: QueryConfigType<WeatherResponseType>
) => {
  return useQuery<WeatherResponseType>(
    [endpoints.currentWeather, `${params.lat},${params.lon}`],
    endpoints.currentWeather,
    {
      params: {
        key: config.API_KEY,
        q: `${params.lat},${params.lon}`,
      },
    },
    queryConfig
  );
};
