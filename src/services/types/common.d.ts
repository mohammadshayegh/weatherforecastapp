import { AxiosError } from "axios";

export type ResponseType<T> = T | undefined;
export type ErrorType =
  | AxiosError<{ error: { message: string } }>
  | null
  | undefined;
