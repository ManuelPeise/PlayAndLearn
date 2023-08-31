import { IApiOptions } from "./IApiOptions";

export interface IApiResult<TItem> {
  items: TItem[];
  isLoading: boolean;
  dataIsBound: boolean;
  get: (options?: IApiOptions) => Promise<void>;
}
