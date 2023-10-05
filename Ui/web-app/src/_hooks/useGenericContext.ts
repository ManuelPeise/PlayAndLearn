import React from "react";
import { createContext, useContext } from "react";

interface IUseContext<T = unknown> {
  data: T;
  onSettingsChanged: (state: Partial<T>) => void;
}

interface IUseGenericContextResult<T = unknown> {
  data: T;
  onSettingsChanged: (state: Partial<T>) => void;
}

export const GenericContext = createContext<IUseContext>({} as IUseContext);

export const useMemorySettingsContext = <T>(
  initializeState: T
): IUseGenericContextResult<T> => {
  const [state, setState] = React.useState<T>(initializeState);

  React.useEffect(() => {
    setState(initializeState);
  }, [initializeState]);

  const onSettingsChanged = React.useCallback(
    (partialState: Partial<IUseContext<T>>) => {
      console.log(partialState);
      setState({ ...state, ...partialState });
    },
    [state]
  );

  const context = useContext(GenericContext);
  context.data = state;
  context.onSettingsChanged = onSettingsChanged;

  return {
    data: state,
    onSettingsChanged: context.onSettingsChanged,
  };
};
