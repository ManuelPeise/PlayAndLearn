import React, { useEffect, useReducer, useRef } from "react";
import { IApiResult } from "../_lib/_intefaces/IApiResult";
import { useApiReducer } from "./useApiReducer";

type CacheData<T> = { [url: string]: T };

export function UseApi<T = unknown>(
  apiUrl?: string,
  apiOptions?: RequestInit
): IApiResult<T> {
  const urlRef = useRef<string>(apiUrl ?? ({} as string));
  const optionsRef = useRef<RequestInit>(apiOptions ?? ({} as RequestInit));
  const cache = useRef<CacheData<T>>({});
  const cancelRequest = useRef<boolean>(false);

  const reducer = useApiReducer<T>();

  const [data, dispatch] = useReducer(reducer.reducer, reducer.initialState);

  const fetchData = React.useCallback(
    async (url?: string, options?: RequestInit) => {
      if (url !== undefined) urlRef.current = url;
      if (options !== undefined) optionsRef.current = options;
      dispatch({ type: "loading", payload: true });

      if (cache.current[urlRef.current]) {
        dispatch({ type: "fetched", payload: cache.current[urlRef.current] });
        return;
      }

      try {
        const response = await fetch(urlRef.current, optionsRef.current);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const responseData = (await response.json()) as T;

        cache.current[urlRef.current] = responseData;

        if (cancelRequest.current) return;

        dispatch({ type: "fetched", payload: responseData });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: "error", payload: error as Error });
      }
    },
    []
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
    isLoading: data.isLoading,
    error: data.error,
    dataIsBound: data.data !== undefined,
    fetchData,
  };
}
