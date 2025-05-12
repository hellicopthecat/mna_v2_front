import {IResponseErrorType} from "@/types/response/responseType";

export const isError = (data: unknown): data is IResponseErrorType => {
  return (
    data !== null &&
    typeof data === "object" &&
    "message" in data &&
    !("id" in data)
  );
};

export const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const transformDate = (dateValue: string) => {
  const date = new Date(+dateValue);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
