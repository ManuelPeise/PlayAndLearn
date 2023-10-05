export interface IMemoryHighScore {
  name: string;
  level: number;
  attemts: number;
  score: number;
}

export interface IMemoryHighScoreListItem {
  level: number;
  list: IMemoryHighScore[];
}
