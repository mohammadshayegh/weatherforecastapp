import axios from "axios";
import config from "../../config";
import endpoints from "../endpoints";
import useQuery from "../hooks";

export const useGetWeather = () => {
  return useQuery(endpoints.weatherForecast, {
    params: {
      key: config.API_KEY,
      q: "London",
    },
  });
};
