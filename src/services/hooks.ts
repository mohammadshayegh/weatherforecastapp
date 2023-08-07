import { useEffect, useState } from "react";
import { apiClient } from "./http-common";
import { AxiosRequestConfig } from "axios";

const useQuery = (query: string, config?: AxiosRequestConfig<any>) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get(query, config);
        const data = await res.data;
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error as any);
      }
    };

    fetchData();
  }, [query]);

  return { data, loading, error };
};

export default useQuery;
