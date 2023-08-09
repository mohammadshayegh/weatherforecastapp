import config from "../../config";
import endpoints from "../endpoints";
import useQuery from "../hooks";
import { WeatherResponseType } from "../types/weather";

export const useGetWeather = (lat: number, lan: number) => {
  return useQuery<WeatherResponseType>(endpoints.weatherForecast, {
    params: {
      key: config.API_KEY,
      q: `${lat},${lan}`,
    },
  });
};
