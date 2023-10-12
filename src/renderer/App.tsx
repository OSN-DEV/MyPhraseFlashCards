import React, { useEffect } from 'react'
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

  useEffect(() => {
    if (0<=phraseFcFile.file.id) {
      window.location.href = "#/fc";
    }
  },[]);
  const onStart = async() => {
    console.log('start');

    const pref = getLocalStorageObject<PreferenceModel>(DataKey.Preference, createEmptyPreferenceModel());
    const selectedList = getLocalStorageObject<PhraseFcListModel[]>(DataKey.PharasFcFileList, [createEmptyPhraseFcListModel()])[pref.selectedPhraseFcFileIndex];
    devLog(`id: ${selectedList.id}`);
    devLog(`displayName: ${selectedList.displayName}`);
    devLog(`filePath: ${selectedList.filePath}`);
    const {result, file} = await window.mainApi.loadPhraseFcFile(selectedList.filePath, pref);
    switch(result.code) {
      case ResultCode.None:
        setPhraseFcFile({index:0, file: file!});
        window.location.href = "#/fc";
        break;
      default:
        alert(result.message);
        return;
    }
    // window.location.href = "#/fc";
  }
  const onCancel = () => {
    console.log('cancel');
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
                                    onCancel={onCancel}
                                    currentFile= {phraseFcFile}
                                    setCurrentFile={setPhraseFcFile}
                                  />} />
        <Route path="*" element={<PhraseFcTop onStart={onStart}/>} />
      </Routes>
    </HashRouter>
  );
}
