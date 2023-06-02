import { getLocalStorage, removeLocalStorage, setLocalStorage } from '..';

describe('localStorage methods', () => {
  const DEFAULT_WINDOW_LOCAL_STORAGE = window.localStorage;
  const DEFAULT_STORE = { test: 5 };
  const fakeLocalStorage = (function fakeLocalStorageGenerator() {
    let store = DEFAULT_STORE;

    return {
      getItem: function getItem(key) {
        return store[key] || null;
      },
      setItem: function setItem(key, value) {
        store[key] = value.toString();
      },
      removeItem: function removeItem(key) {
        delete store[key];
      },
      clear: function clearItem() {
        store = DEFAULT_STORE;
      },
    };
  })();

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });
  afterAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: DEFAULT_WINDOW_LOCAL_STORAGE,
    });
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  describe('getLocalStorage()', () => {
    it('should be able to pull value from store when present', () => {
      const test = getLocalStorage('test');

      expect(test).toEqual(5);
    });
  });

  describe('setLocalStorage()', () => {
    it('should be able to pull value from store when set', () => {
      setLocalStorage('setTest', 44);

      expect(getLocalStorage('setTest')).toEqual(44);
    });

    describe('removeLocalStorage()', () => {
      it('should be able to remove value from local storage', () => {
        setLocalStorage('setTest', 44);
        removeLocalStorage('setTest');

        expect(getLocalStorage('setTest')).toBeUndefined();
      });
    });
  });
});
