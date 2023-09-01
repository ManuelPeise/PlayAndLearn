import { IResponseData } from "../../_hooks/useApiReducer";

export interface IApiResult<T> {
  response?: T;
  error?: Error;
  dataIsBound: boolean;
  fetchData: (url?: string, options?: RequestInit) => Promise<void>;
}
