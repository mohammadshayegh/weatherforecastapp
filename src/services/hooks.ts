import { AxiosRequestConfig } from "axios";
import { isNil } from "lodash";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDeepCompareEffect from "../hooks/useDeepCompareEffect";
import { addQuery } from "../store/slices/queries";
import { apiClient } from "./http-common";
import { ErrorType } from "./types/common";
import { QueryConfigType } from "./types/queyClientTypes";
import { AppDispatch, StoreType } from "../store";
import { STALE_TIME_MS } from "./constants";

function useQuery<T>(
  queryKeys: string[],
  query: string,
  config?: AxiosRequestConfig<any>,
  queryConfig: QueryConfigType<T> = {}
) {
  const isFetching = useRef(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ErrorType>(null);
  const { queries } = useSelector((store: StoreType) => store.queries);
  const dispatch: AppDispatch = useDispatch();
  const key = JSON.stringify(queryKeys);

  const onSuccess = (data: T) => {
    setData(data);
    queryConfig.onSuccess?.(data);

    // cache the response
    const staleTime = isNil(queryConfig.staleTime)
      ? Date.now() + STALE_TIME_MS
      : Date.now() + queryConfig.staleTime;
    dispatch(addQuery({ key, data, staleTime }));
  };

  const onError = (error: ErrorType) => {
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

    const cachedDate = queries.find((q) => q.key === key);

    if (cachedDate) {
      setData(cachedDate.data);
      if (cachedDate.staleTime >= Date.now()) return;
    }

    fetchData();
  }, [query, config]);

  return { data, isLoading: loading, error, fetchData };
}

export default useQuery;
