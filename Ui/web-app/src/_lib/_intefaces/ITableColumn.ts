export interface ITableColumn {
  label: string;
  minwidth?: number;
  alignContent: "right" | "left" | "center";
  format?: (value: string) => string;
}
