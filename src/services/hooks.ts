import { AxiosRequestConfig } from "axios";
import { useCallback, useRef, useState } from "react";
import useDeepCompareEffect from "../hooks/useDeepCompareEffect";
import { apiClient } from "./http-common";
import { QueryConfigType } from "./types/queyClientTypes";

const useQuery = <T>(
  query: string,
  config?: AxiosRequestConfig<any>,
  queryConfig?: QueryConfigType
) => {
  const isLoading = useRef(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (isLoading.current) return;

    isLoading.current = true;
    try {
      const res = await apiClient.get<T>(query, config);
      const data = await res.data;
      setData(data);
    } catch (error) {
      setError(error as any);
    } finally {
      isLoading.current = false;
    }
  }, [query, config]);

  useDeepCompareEffect(() => {
    if (queryConfig?.enabled === false) return;

    fetchData();
  }, [query, config]);

  return { data, isLoading: isLoading.current, error, fetchData };
};

export default useQuery;
