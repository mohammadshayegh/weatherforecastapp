import { AxiosError } from "axios";

export type QueryConfigType = {
  enabled?: boolean;
  onError?: (error: AxiosError) => void;
  onSuccess?: <T>(data: T) => void;
  staleTime?: number;
};
