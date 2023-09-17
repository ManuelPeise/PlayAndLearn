import React, { ReactNode, createContext } from "react";
import { IMemoryUploadContext } from "./_intefaces/IMemoryUploadContext";
import { IMemoryUploadSettings } from "./_intefaces/IMemoryUploadSettings";

const initialState: IMemoryUploadContext = {
  settings: {},
  isLoading: false,
  onSettingsChanged: (settings: Partial<IMemoryUploadSettings>) => {},
  onHandleIsLoading: (isLoading: boolean) => {},
} as IMemoryUploadContext;

export const MemoryUploadContext =
  createContext<IMemoryUploadContext>(initialState);

type MemoryUploadProviderProps = {
  children: ReactNode;
};

const MemoryUploadProvider = (props: MemoryUploadProviderProps) => {
  const [uploadSettings, setUploadSettings] =
    React.useState<IMemoryUploadSettings>(initialState.settings);
  const [isLoading, setIsloading] = React.useState<boolean>(
    initialState.isLoading
  );

  const onHandleIsLoading = React.useCallback((isLoading: boolean) => {
    setIsloading(isLoading);
  }, []);

  const onSettingsChanged = React.useCallback(
    (settings: Partial<IMemoryUploadSettings>) => {
      setUploadSettings({ ...uploadSettings, ...settings });
    },
    [uploadSettings, setUploadSettings]
  );

  const value: IMemoryUploadContext = {
    settings: uploadSettings,
    isLoading: isLoading,
    onSettingsChanged: onSettingsChanged,
    onHandleIsLoading: onHandleIsLoading,
  } as IMemoryUploadContext;

  return (
    <MemoryUploadContext.Provider value={value}>
      {props.children}
    </MemoryUploadContext.Provider>
  );
};

export default MemoryUploadProvider;
