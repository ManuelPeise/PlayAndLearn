import { Dispatch, SetStateAction } from "react";
import { IMemoryUploadSettings } from "./IMemoryUploadSettings";

export interface IMemoryUploadContext {
  settings: IMemoryUploadSettings;
  isLoading: boolean;
  onSettingsChanged: Dispatch<SetStateAction<Partial<IMemoryUploadSettings>>>;
  onHandleIsLoading: Dispatch<SetStateAction<boolean>>;
}
