import React, { useEffect, useReducer, useRef } from "react";
import { IApiResult } from "../_lib/_intefaces/IApiResult";
import { useApiReducer } from "./useApiReducer";

export function UseApi<T = unknown>(
  IsLoadingCallback: (isLoading: boolean) => void,
  apiUrl?: string,
  queryString?: string,
  apiOptions?: RequestInit
): IApiResult<T> {
  const urlRef = useRef<string>(`${apiUrl}${queryString}` ?? ({} as string));
  const optionsRef = useRef<RequestInit>(apiOptions ?? ({} as RequestInit));

  const cancelRequest = useRef<boolean>(false);

  const reducer = useApiReducer<T>();

  const [data, dispatch] = useReducer(reducer.reducer, reducer.initialState);

  const fetchData = React.useCallback(
    async (url?: string, queryString?: string, options?: RequestInit) => {
      if (url !== undefined && queryString !== undefined) {
        urlRef.current = `${url}${queryString}`;
      } else if (url !== undefined) {
        urlRef.current = `${url}`;
      }

      if (options !== undefined) optionsRef.current = options;

      IsLoadingCallback(true);

      try {
        if (
          urlRef.current !== undefined &&
          optionsRef.current.method !== undefined
        ) {
          const response = await fetch(urlRef.current, optionsRef.current);

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const responseData = (await response.json()) as T;

          if (cancelRequest.current) return;

          dispatch({ type: "fetched", payload: responseData });
        }
      } catch (error) {
        IsLoadingCallback(false);

        if (cancelRequest.current) return;

        dispatch({ type: "error", payload: error as Error });
      } finally {
        IsLoadingCallback(false);
      }
    },
    [IsLoadingCallback]
  );

  useEffect(() => {
    if (!urlRef.current) return;

    cancelRequest.current = false;

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [fetchData]);

  return {
    response: data.data,
    error: data.error,
    dataIsBound: data.data !== undefined,
    fetchData,
  };
}
