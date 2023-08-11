import { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useRef, useState } from "react";
import useDeepCompareEffect from "../hooks/useDeepCompareEffect";
import { apiClient } from "./http-common";
import { QueryConfigType } from "./types/queyClientTypes";
import { useDispatch, useSelector } from "react-redux";
import { addQuery } from "../store/slices/queries";
import { isNil } from "lodash";

const useQuery = <T>(
  queryKeys: string[],
  query: string,
  config?: AxiosRequestConfig<any>,
  queryConfig: QueryConfigType = {}
) => {
  const isFetching = useRef(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const { queries } = useSelector((store: any) => store.queries);
  const dispatch = useDispatch();
  const key = JSON.stringify(queryKeys);

  const onSuccess = (data: T) => {
    setData(data);
    queryConfig.onSuccess?.<T>(data);

    // cache the response
    const staleTime = isNil(queryConfig.staleTime)
      ? Date.now() + 60 * 1000
      : Date.now() + queryConfig.staleTime;
    dispatch(addQuery({ key, data, staleTime }));
  };

  const onError = (error: AxiosError) => {
    setError(error);
    queryConfig.onError?.(error);
  };

  const onDone = () => {
    isFetching.current = false;
    setLoading(false);
  };

  const fetchData = useCallback(async () => {
    if (isFetching.current) return;

    isFetching.current = true;
    setLoading(true);
    try {
      const res = await apiClient.get<T>(query, config);
      const data = await res.data;
      onSuccess(data);
    } catch (error: any) {
      onError(error);
    } finally {
      onDone();
    }
  }, [query, config]);

  useDeepCompareEffect(() => {
    if (queryConfig.enabled === false) return;

    const cachedDate = queries.find((q: any) => q.key === key);

    if (cachedDate) {
      setData(cachedDate.data);
      if (cachedDate.staleTime >= Date.now()) return;
    }

    fetchData();
  }, [query, config]);

  return { data, isLoading: loading, error, fetchData };
};

export default useQuery;
