import config from "../../config";
import endpoints from "../endpoints";
import useQuery from "../hooks";

export const useGetWeather = (city: string) => {
  return useQuery(endpoints.weatherForecast, {
    params: {
      key: config.API_KEY,
      q: city,
    },
  });
};
