import { ErrorType } from "./common";

export type QueryConfigType<T> = {
  enabled?: boolean;
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: T) => void;
  staleTime?: number;
};
