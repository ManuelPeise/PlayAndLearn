export const ticTacToePlayersStorageField = "ticTacToePlayersStorageField";
export const ticTacToegameModeStorageField = "ticTacToegameModeStorageField";
export const ticTacToepLevelStorageField = "ticTacToepLevelStorageField";

export const getLocalStorageItem = <T = any>(key: string): T => {
  const json = window.localStorage.getItem(key);

  if (json?.length) {
    const value: T = JSON.parse(json);

    return value;
  }

  return {} as T;
};

export const setLocalStorageItem = (key: string, json: string) => {
  window.localStorage.setItem(key, json);
};
