import { IResponseData } from "../../_hooks/useApiReducer";

export interface IApiResult<T> {
  response?: T;
  error?: Error;
  isLoading: boolean;
  dataIsBound: boolean;
  fetchData: (url?: string, options?: RequestInit) => Promise<void>;
}
