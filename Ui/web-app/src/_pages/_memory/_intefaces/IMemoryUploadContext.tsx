import { Dispatch, SetStateAction } from "react";
import { IMemorySettings } from "./IMemorySettings";

export interface IMemoryUploadContext {
  settings: IMemorySettings;
  isLoading: boolean;
  onSettingsChanged: Dispatch<SetStateAction<Partial<IMemorySettings>>>;
  onHandleIsLoading: Dispatch<SetStateAction<boolean>>;
}
