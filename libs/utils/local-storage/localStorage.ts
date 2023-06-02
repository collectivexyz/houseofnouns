/**
 * Setting value to local storage
 *
 * @param {string} key
 * @param {any} value
 * @returns {void}
 */
export function setLocalStorage<T = string>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    return window.localStorage?.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(key, value, e);
  }
}

/**
 * Getting value from local storage
 *
 * @param {string} key
 * @param {any} defaultValue
 * @returns {any}
 */
export function getLocalStorage<T = string>(key: string, defaultValue?: T): T | undefined {
  try {
    if (typeof window === "undefined") return defaultValue;
    const item = window.localStorage?.getItem(key);
    return item === null ? defaultValue : JSON.parse(item);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Removing value from local storage
 *
 * @param {string} key
 * @returns {void}
 */
export function removeLocalStorage(key: string) {
  try {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
}

type ICachedItem<T> = { key: string; value: T };

export async function withLocalStorageCache<T>(
  group: string,
  key: string,
  callback: () => Promise<T>
): Promise<T> {
  return new Promise(resolve => {
    const cachedItem = getLocalStorage<ICachedItem<T>[]>(group, [])?.find(item => item.key === key);
    if (cachedItem) {
      resolve(cachedItem.value);
      return;
    }

    callback().then(value => {
      setLocalStorage<ICachedItem<T>[]>(group, [
        { key, value },
        ...(getLocalStorage<ICachedItem<T>[]>(group, []) ?? [])
          .filter(item => item.key !== key)
          .slice(0, 499), // limit cache size
      ]);
      resolve(value);
    });
  });
}

const localStorageMethods = {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
  withLocalStorageCache,
};

export default localStorageMethods;
