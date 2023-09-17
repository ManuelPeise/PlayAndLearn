import React, { ReactNode, createContext } from "react";
import { IMemoryPageGameData } from "./_intefaces/IMemoryPageGameData";
import { IGameDataResponse } from "./_intefaces/IMemoryGameData";
import { IKeyValueItem } from "src/_lib/_intefaces/IKeyValueItem";
import { IGameConfiguration } from "src/_lib/_intefaces/IGameSettingsConfiguration";

interface IMemoryGameContext {
  isLoading: boolean;
  pageData: IMemoryPageGameData;
  handleIsLoadingChanged: (isLoading: boolean) => void;
}

const initialState: IMemoryGameContext = {
  isLoading: false,
  pageData: {
    topicDropdownItems: [] as IKeyValueItem[],
    playerDropdownItems: [] as IKeyValueItem[],
    levelDropdownItems: [] as IKeyValueItem[],
    gameConfiguration: {} as IGameConfiguration,
    gameData: {
      level: 0,
      topic: 0,
      player: 0,
      isRunning: false,
      gameId: "",
      cards: [],
      error: "",
    },
  },
  handleIsLoadingChanged: (isLoading: boolean) => {},
} as IMemoryGameContext;

export const MemoryGameContext =
  createContext<IMemoryGameContext>(initialState);

type MemoryGameProviderProps = {
  children: ReactNode;
};

const MemoryGameProvider = (props: MemoryGameProviderProps) => {
  const [isLoading, setIsloading] = React.useState<boolean>(
    initialState.isLoading
  );

  const onHandleIsLoading = React.useCallback((isLoading: boolean) => {
    setIsloading(isLoading);
  }, []);

  const value: IMemoryGameContext = {
    isLoading: isLoading,
    handleIsLoadingChanged: onHandleIsLoading,
  } as IMemoryGameContext;

  return (
    <MemoryGameContext.Provider value={value}>
      {props.children}
    </MemoryGameContext.Provider>
  );
};

export default MemoryGameProvider;
