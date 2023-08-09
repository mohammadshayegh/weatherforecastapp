import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import useDeepCompareEffect from "../hooks/useDeeoCompareEffect";
import { apiClient } from "./http-common";

const useQuery = <T>(query: string, config?: AxiosRequestConfig<any>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useDeepCompareEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get<T>(query, config);
        const data = await res.data;
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error as any);
      }
    };

    fetchData();
  }, [query, config]);

  return { data, loading, error };
};

export default useQuery;
