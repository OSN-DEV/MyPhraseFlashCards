import React, { useEffect } from 'react'
import { CurrentPhraseFcModel } from '../../model/CurrentPhraseFcModel';
import { createEmptyPreferenceModel, PreferenceModel } from '../../model/PreferenceModel';
import { ResultCode } from '../../model/ResultModel';
import { devLog, getLocalStorageObject } from '../../util/common';
import { DataKey } from '../../util/constants';
import { deleteLocalStorageObject } from '../../util/UseLocalStorage';
import Header from './Header';
import OnePhrase from './OnePhrase';

type FlashCardProps = {
  onExit : (realoadList: boolean) => void,
  currentFile: CurrentPhraseFcModel,
  setCurrentFile: (arg:CurrentPhraseFcModel) => void
}

const FlashCard = (props: FlashCardProps) => {
  devLog(`FlashCard`);
  const { onExit, currentFile, setCurrentFile } = props;
  const phrases = currentFile.file.phrases;

  const setNext = () => {
    const idx = currentFile.index;
    currentFile.file.phrases[idx].playCount++;
    currentFile.index = idx + 1;
    setCurrentFile({...currentFile});
  }
  const handleComplete = async() => {
    const idx = currentFile.index;
    const file = currentFile.file;
    file.phrases[idx].playCount++;
    let reloadList = false;
    const pref = getLocalStorageObject<PreferenceModel>(DataKey.Preference, createEmptyPreferenceModel());
    if (pref.numberOfQuestions === "") {
      // 全問の場合はファイルの実行回数をカウントアップ
      file.playCount++;
      reloadList = true;
    }
    saveAndExit(reloadList);
  }

  const handleCancel = () => {
    saveAndExit();
  }

  const saveAndExit = async(reloadList: boolean = false) => {
    const result = await window.mainApi.savePhraseFcFile(currentFile.path, currentFile.file);
    switch (result.code) {
      case ResultCode.None:
        deleteLocalStorageObject(DataKey.PhraseFcFile);
        onExit(reloadList);
        break;
      default:
        alert(result.message);
        break;
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'n':
          if (phrases.length <= currentFile.index + 1) {
            handleComplete();
          } else {
            setNext();
          }
          break;
        case 'Escape':
          handleCancel();
          break;
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  },[currentFile]);

  return(
    <div>
      <Header 
        displayName={currentFile.file.displayName}
        currentIndex={currentFile.index + 1}
        totalCount={currentFile.file.phrases.length}
      />
      <OnePhrase
        phrase={currentFile.file.phrases[currentFile.index]}
       />
      <button onClick={handleCancel}>cancel</button>
      <footer>
      n:next &nbsp; esc:cancel
      </footer>
    </div>
  )
}

export default FlashCard;
