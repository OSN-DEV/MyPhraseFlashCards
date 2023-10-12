import { useEffect, useState } from "react"
import { devLog } from "./common";

/**
 * ローカルストレージ管理
 */
const useLocalStorage = (key: string, initialValue: string = ""): [string, (arg:string) => void]  => {
  const [value, setValue] = useState<string>(localStorage.getItem(key) || initialValue);
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);
  return [value, setValue];
}

/**
 * ローカルストレージ管理
 */
const useLocalStorageObject = <T>(key: string, initialValue: T): [T, (arg:T) => void]  => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

/**
 * ローカルストレージのアイテム削除
 * @param key {string} 削除対象のキー
 */
const deleteLocalStorageObject = (key: string): void => {
  localStorage.removeItem(key);
}

export {useLocalStorage, useLocalStorageObject, deleteLocalStorageObject }
