import { useEffect, useState } from "react"
import { devLog } from "./common";
import { DataKey } from "./constants";

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


type CurrentIndexType = {
  path: string,
  index: number
}
/**
 * インデックスを保存
 * @param path {string} ファイルパス
 * @param index {number} 設定する値
 */
export const setCurrentIndex = (path: string, index: number) => {
  const data = localStorage.getItem(DataKey.CurrentIndex);
  if (data) {
    const model = JSON.parse(data) as CurrentIndexType[];
    const findIndex = model.findIndex(m => m.path === path);
    if (findIndex === -1) {
      model.push({'path': path, 'index': index });
    } else {
      model[findIndex].index = index;
    }
    localStorage.setItem(DataKey.CurrentIndex, JSON.stringify(model));
  } else {
    localStorage.setItem(DataKey.CurrentIndex, JSON.stringify([{'path': path, 'index': index}]));
  }
  // localStorage.setItem(key, value);
}

/**
 * インデックスを取得
 * @param path { string} ファイルパス
 * @returns インデックス(該当情報が存在しない場合は0)
 */
export const getCurrentIndex = (path:string): number => {
  const data = localStorage.getItem(DataKey.CurrentIndex);
  if (!data) {
    return 0;
  }

  const model = JSON.parse(data) as CurrentIndexType[];
  const findIndex = model.findIndex(m => m.path === path);
  if (findIndex === -1) {
    return 0;
  } else {
    return model[findIndex].index;
  }
}

export {useLocalStorage, useLocalStorageObject, deleteLocalStorageObject }
