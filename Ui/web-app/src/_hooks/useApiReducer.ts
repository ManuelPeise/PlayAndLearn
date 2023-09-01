export interface IResponseData<T> {
  isLoading: boolean;
  data?: T;
  error?: Error;
}

type Action<T> =
  | { type: "loading"; payload: boolean }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

interface IUseApiReducerResult<T> {
  reducer: (state: IResponseData<T>, action: Action<T>) => IResponseData<T>;
  initialState: IResponseData<T>;
}

export function useApiReducer<T>(): IUseApiReducerResult<T> {
  const initializeState: IResponseData<T> = {
    isLoading: false,
    data: undefined,
    error: undefined,
  };

  const fetchDataReducer = (state: IResponseData<T>, action: Action<T>) => {
    switch (action.type) {
      case "loading":
        return { ...initializeState, isloading: action.payload };
      case "fetched":
        return { ...initializeState, data: action.payload };
      case "error":
        return { ...initializeState, error: action.payload };
      default:
        return state;
    }
  };

  return {
    reducer: fetchDataReducer,
    initialState: initializeState,
  };
}
