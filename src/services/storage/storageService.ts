const isStorageAvailable = (): boolean => {
    try {
        const testKey = '__nova_storage_test__';

        window.localStorage.setItem(testKey, 'test');
        window.localStorage.removeItem(testKey);

        return true;
    } catch {
        return false;
    }
};

const getItem = <T>(key: string, fallback: T): T => {
    if (!isStorageAvailable()) {
        return fallback;
    }

    try {
        const storedValue = window.localStorage.getItem(key);

        if (storedValue === null) {
            return fallback;
        }

        return JSON.parse(storedValue) as T;
    } catch {
        return fallback;
    }
};

const setItem = <T>(key: string, value: T): boolean => {
    if (!isStorageAvailable()) {
        return false;
    }

    try {
        window.localStorage.setItem(key, JSON.stringify(value));

        return true;
    } catch {
        return false;
    }
};

const removeItem = (key: string): boolean => {
    if (!isStorageAvailable()) {
        return false;
    }

    try {
        window.localStorage.removeItem(key);

        return true;
    } catch {
        return false;
    }
};

const clear = (): boolean => {
    if (!isStorageAvailable()) {
        return false;
    }

    try {
        window.localStorage.clear();

        return true;
    } catch {
        return false;
    }
};

export const storageService = {
    getItem,
    setItem,
    removeItem,
    clear,
};