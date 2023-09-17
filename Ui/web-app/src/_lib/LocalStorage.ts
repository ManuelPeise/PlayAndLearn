export enum LocalStoregeKeyEnum {
  MemoryTopics = "MemoryTopics",
  MemoryLevels = "MemoryLevels",
  MemoryPlayers = "MemoryPlayers",
}

const defaultData: Partial<Record<LocalStoregeKeyEnum, unknown>> = {
  [LocalStoregeKeyEnum.MemoryTopics]: [],
  [LocalStoregeKeyEnum.MemoryLevels]: [],
  [LocalStoregeKeyEnum.MemoryPlayers]: [],
};

export class LocalStorage {
  public static remove(key: LocalStoregeKeyEnum): void {
    for (let i = 0; i < localStorage.length; i++) {
      const itemKey = localStorage.key(i);

      if (itemKey?.match(key)) {
        localStorage.removeItem(itemKey);
      }
    }
  }

  public static setItem<T>(key: LocalStoregeKeyEnum, item: T) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  public static getItem<T>(key: LocalStoregeKeyEnum) {
    const value = localStorage.getItem(key);

    if (value == null) {
      return defaultData[key] as T;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      return defaultData[key] as T;
    }
  }

  // specific setters??
}
