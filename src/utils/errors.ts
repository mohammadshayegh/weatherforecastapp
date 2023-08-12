import { ErrorType } from "../services/types/common";

export const extractErrorMessage = (error: ErrorType) => {
  return (
    error?.response?.data?.error?.message ||
    error?.message ||
    "Something went wrong"
  );
};
