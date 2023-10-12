import React, { useEffect, useState } from 'react'
import { HashRouter, Link,Routes, Route } from 'react-router-dom';
import { createEmptyCurrentPhraseFcModel, CurrentPhraseFcModel } from '../model/CurrentPhraseFcModel';
import { createEmptyPhraseFcListModel, PhraseFcListModel } from '../model/PhraseFcListModel';
import { createEmptyPreferenceModel, PreferenceModel } from '../model/PreferenceModel';
import { ResultCode } from '../model/ResultModel';
import { devLog, getLocalStorageObject } from '../util/common';
import { DataKey } from '../util/constants';
import { useLocalStorageObject } from '../util/UseLocalStorage';
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
  const onStart = async() => {
    devLog('start');

    const pref = getLocalStorageObject<PreferenceModel>(DataKey.Preference, createEmptyPreferenceModel());
    const selectedList = getLocalStorageObject<PhraseFcListModel[]>(DataKey.PharasFcFileList, [createEmptyPhraseFcListModel()])[pref.selectedPhraseFcFileIndex];
    const {result, file} = await window.mainApi.loadPhraseFcFile(selectedList.filePath, pref);
    switch(result.code) {
      case ResultCode.None:
        setPhraseFcFile({index:0, path:selectedList.filePath, file: file!});
        window.location.href = "#/fc";
        break;
      default:
        alert(result.message);
        return;
    }
  }
  const onExit = async(reloadList: boolean = false) => {
    devLog('exit');
    if (reloadList) {

      const result = await window.mainApi.loadPhraseFcFileList();
      setPhraseFcList(result);
      devLog('リスト保存後');
    }
    window.location.href = "#/top";
  }

  return (
    <HashRouter>
      <div>
        For Deubg<br/>
        <Link to="/">Top</Link>&nbsp;
        <Link to="fc">Main</Link>
      </div>
      <Routes>
        <Route path="fc" element={<FlashCard 
                                    onExit={onExit}
                                    currentFile= {phraseFcFile}
                                    setCurrentFile={setPhraseFcFile}
                                  />} />
        <Route path="*" element={<PhraseFcTop 
                                    phraseFcList={phraseFcList}
                                    setPhraseFcList={setPhraseFcList}
                                    onStart={onStart}/>} 
                                  />
      </Routes>
    </HashRouter>
  );
}
