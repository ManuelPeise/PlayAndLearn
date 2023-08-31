export interface IApiOptions {
  url: string;
  method: "GET" | "POST";
  queryString?: string;
  bodyJson?: string;
}
