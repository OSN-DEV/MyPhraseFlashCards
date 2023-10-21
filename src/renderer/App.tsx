import React, { useEffect, useState } from 'react'
import { HashRouter, Link,Routes, Route } from 'react-router-dom';
import { createEmptyCurrentPhraseFcModel, CurrentPhraseFcModel } from '../model/CurrentPhraseFcModel';
import { createEmptyPhraseFcListModel, PhraseFcListModel } from '../model/PhraseFcListModel';
import { createEmptyPreferenceModel, PreferenceModel } from '../model/PreferenceModel';
import { ResultCode } from '../model/ResultModel';
import { devLog, getLocalStorageObject } from '../util/common';
import { DataKey } from '../util/constants';
import { getCurrentIndex, setCurrentIndex, useLocalStorageObject } from '../util/UseLocalStorage';
import FlashCard from './PhraseFcMain/FlashCard';
import PhraseFcTop from "./PhraseFcTop/PhraseFcTop";
export const App = () => {
  devLog(`App`)
  const [phraseFcFile, setPhraseFcFile] = useLocalStorageObject<CurrentPhraseFcModel>(DataKey.PhraseFcFile, createEmptyCurrentPhraseFcModel());
  const [phraseFcList, setPhraseFcList] = useLocalStorageObject<PhraseFcListModel[]>(DataKey.PharasFcFileList, []);

  useEffect(() => {
    if (0<=phraseFcFile.file.id) {
      window.location.href = "#/fc";
    }
  },[]);

  /** 
   * 再開
   */
  const onResume = async() => {
    const pref = getLocalStorageObject<PreferenceModel>(DataKey.Preference, createEmptyPreferenceModel());
    const selectedList = getLocalStorageObject<PhraseFcListModel[]>(DataKey.PharasFcFileList, [createEmptyPhraseFcListModel()])[pref.selectedPhraseFcFileIndex];
    const index = getCurrentIndex(selectedList.filePath);
    startProc(index); 
  }

  /**
   * 開始
   */
  const onStart = async() => {
    devLog('start');
    startProc(); 
  }

  const startProc = async(index: number= 0) => {
    const pref = getLocalStorageObject<PreferenceModel>(DataKey.Preference, createEmptyPreferenceModel());
    const selectedList = getLocalStorageObject<PhraseFcListModel[]>(DataKey.PharasFcFileList, [createEmptyPhraseFcListModel()])[pref.selectedPhraseFcFileIndex];
    const {result, file} = await window.mainApi.loadPhraseFcFile(selectedList.filePath, pref);
    switch(result.code) {
      case ResultCode.None:
        if (file?.phrases.length === 0) {
          alert('表示可能な問題がありません。');
          return;
        }
        setPhraseFcFile({index:index, path:selectedList.filePath, file: file!});
        window.location.href = "#/fc";
        break;
      default:
        alert(result.message);
        return;
    }

  }

  window.mainApi.reset((ev:any) => {
    onExit(false);
  });

  /**
   * 終了
   */
  const onExit = async(reloadList: boolean = false) => {
    devLog('exit');
    if (reloadList) {
      const result = await window.mainApi.loadPhraseFcFileList();
      setPhraseFcList(result);
      devLog('リスト保存後');
    }
    window.location.href = "#/top";
  }

  /**
   * 画面遷移時のデバッグ用のメニュー
  <div>
    For Deubg<br/>
    <Link to="/">Top</Link>&nbsp;
    <Link to="fc">Main</Link>
  </div>
  */

  return (
    <HashRouter>
      <Routes>
        <Route path="fc" element={<FlashCard 
                                    onExit={onExit}
                                    currentFile= {phraseFcFile}
                                    setCurrentFile={setPhraseFcFile}
                                  />} />
        <Route path="*" element={<PhraseFcTop 
                                    phraseFcList={phraseFcList}
                                    setPhraseFcList={setPhraseFcList}
                                    onResume={onResume}
                                    onStart={onStart}/>} 
                                  />
      </Routes>
    </HashRouter>
  );
}
