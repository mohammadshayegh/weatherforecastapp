export const extractErrorMessage = (error: any) => {
  return (
    error?.response?.data?.error?.message ||
    error.message ||
    "Something went wrong"
  );
};
