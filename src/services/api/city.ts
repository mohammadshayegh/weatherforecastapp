import config from "../../config";
import endpoints from "../endpoints";
import useQuery from "../hooks";

export const useGetCities = (city: string) => {
  return useQuery(endpoints.search, {
    params: {
      key: config.API_KEY,
      q: city,
    },
  });
};
