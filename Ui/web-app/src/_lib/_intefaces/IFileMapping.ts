import { FileTypeEnum } from "../_enums/FileTypeEnum";

export interface IFileMapping {
  key: number;
  file: File;
  fileType: FileTypeEnum;
  source: string;
  target: string;
  isActive: boolean;
  isValidMapping: boolean;
}
