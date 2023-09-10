import { IMemoryGameData } from "./_intefaces/IMemoryGameData";
import { IMemoryPageData } from "./_intefaces/IMemoryPageData";

const pageDataEndpoint = `${process.env.REACT_APP_GAME_MEMORY_CONTROLLER}GetPageData`;
const gameDataEndpoint = `${process.env.REACT_APP_GAME_MEMORY_CONTROLLER}GetGameData`;

interface IApiData<T> {
  dataIsBound: boolean;
  data: T;
}

export class MemoryGameHandler {
  private _isLoading: boolean = false;
  private _pageData: IApiData<IMemoryPageData>;
  private _memoryGameData: IApiData<IMemoryGameData>;

  get isLoading(): boolean {
    return this._isLoading;
  }

  get pageData(): IApiData<IMemoryPageData> {
    return this._pageData ?? ({} as IApiData<IMemoryPageData>);
  }

  get gameMemoryData(): IApiData<IMemoryGameData> {
    return this._memoryGameData ?? ({} as IApiData<IMemoryGameData>);
  }

  constructor() {
    this._memoryGameData = {} as IApiData<IMemoryGameData>;
    this._pageData = {} as IApiData<IMemoryPageData>;
  }

  public loadGameData = async (): Promise<void> => {
    this.fetchData<IMemoryGameData>(gameDataEndpoint, "GET").then(
      async (res) => {
        this._memoryGameData = {
          dataIsBound: true,
          data: res,
        };
      }
    );
  };

  public loadPageData = () => {
    this._isLoading = true;

    this.fetchData<IMemoryPageData>(pageDataEndpoint, "GET").then(
      async (res) => {
        this._pageData = {
          dataIsBound: true,
          data: res,
        };
      }
    );

    this._isLoading = false;
  };

  private fetchData = async <T = unknown>(
    url: string,
    method: "GET" | "POST"
  ): Promise<T> => {
    return new Promise<T>(async (resolve, reject) => {
      return fetch(url, {
        method: method,
        mode: "cors",
      }).then(async (res) => {
        if (res.ok) {
          resolve(await res.json());
        } else {
          return reject("Could not get data from API!");
        }
      });
    });
  };
}
