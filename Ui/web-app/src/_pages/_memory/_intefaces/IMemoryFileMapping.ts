export interface IMemoryFileMapping {
  key: number;
  file: File;
  fileType:
    | "MemoryBackgroundImage"
    | "MemoryForegroundImage"
    | "MemoryWordList"
    | "unknown";
  fileName: string;
  topic: string;
  color: "blue" | "lightblue" | "green" | "pink";
}
