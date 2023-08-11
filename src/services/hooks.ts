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
  const isFetching = useRef(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (isFetching.current) return;

    isFetching.current = true;
    setLoading(true);
    try {
      const res = await apiClient.get<T>(query, config);
      const data = await res.data;
      setData(data);
      queryConfig?.onSuccess?.<T>(data);
    } catch (error: any) {
      setError(error);
      queryConfig?.onError?.(error);
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  }, [query, config]);

  useDeepCompareEffect(() => {
    if (queryConfig?.enabled === false) return;

    fetchData();
  }, [query, config]);

  return { data, isLoading: loading, error, fetchData };
};

export default useQuery;
