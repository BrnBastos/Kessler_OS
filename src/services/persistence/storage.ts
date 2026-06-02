import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getJsonItem<TValue>(key: string, fallback: TValue): Promise<TValue> {
  try {
    const storedValue = await AsyncStorage.getItem(key);

    if (!storedValue) {
      return fallback;
    }

    return JSON.parse(storedValue) as TValue;
  } catch {
    return fallback;
  }
}

export async function setJsonItem<TValue>(key: string, value: TValue) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeStorageItem(key: string) {
  await AsyncStorage.removeItem(key);
}
