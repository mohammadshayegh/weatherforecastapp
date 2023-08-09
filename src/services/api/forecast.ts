import config from "../../config";
import endpoints from "../endpoints";
import useQuery from "../hooks";
import { ForecastResponseType } from "../types/forecast";

export const useGetCityForecast = (
  lat: number,
  lon: number,
  days: number = 5
) => {
  return useQuery<ForecastResponseType>(endpoints.forecast, {
    params: {
      key: config.API_KEY,
      q: `${lat},${lon}`,
      days,
    },
  });
};
