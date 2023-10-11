import React from 'react'
import { HashRouter, Link,Routes, Route } from 'react-router-dom';
import { createEmptyPhraseFcListModel, PhraseFcListModel } from '../model/PhraseFcListModel';
import { PhraseFcModel, createEmptyPhraseFcModel } from '../model/PhraseFcModel';
import { createEmptyPreferenceModel, PreferenceModel } from '../model/PreferenceModel';
import { ResultCode } from '../model/ResultModel';
import { devLog, getLocalStorageObject } from '../util/common';
import { DataKey } from '../util/constants';
import { useLocalStorageObject } from '../util/UseLocalStorage';
import FlashCard from './PhraseFcMain/FlashCard';
import PhraseFcTop from "./PhraseFcTop/PhraseFcTop";

export const App = () => {
  const [phraseFcFile, setPhraseFcFile] = useLocalStorageObject<PhraseFcModel>(DataKey.PhraseFcFile, createEmptyPhraseFcModel());

  const onStart = async() => {
    console.log('start');

    const pref = getLocalStorageObject<PreferenceModel>(DataKey.Preference, createEmptyPreferenceModel());
    // devLog(`numberOfQuestions:${pref.numberOfQuestions}`);
    // devLog(`orderOfQuestions:${pref.orderOfQuestions}`);
    // devLog(`selectedPhraseFcFileIndex:${pref.selectedPhraseFcFileIndex}`);
    //
    const selectedList  = getLocalStorageObject<PhraseFcListModel[]>(DataKey.PharasFcFileList, [createEmptyPhraseFcListModel()])[0];
    // devLog(`id: ${selectedList.id}`);
    // devLog(`displayName: ${selectedList.displayName}`);
    const {result, file} = await window.mainApi.loadPhraseFcFile(selectedList.filePath, pref);
    switch(result.code) {
      case ResultCode.None:
        setPhraseFcFile(file!);
        window.location.href = "#/fc";
        break;
      default:
        alert(result.message);
        return;
    }
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
        <Route path="fc" element={<FlashCard onCancel={onCancel}/>} />
        <Route path="*" element={<PhraseFcTop onStart={onStart}/>} />
      </Routes>
    </HashRouter>
  );
}
