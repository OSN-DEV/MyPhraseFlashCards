import React, { useEffect } from 'react'
import { CurrentPhraseFcModel } from '../../model/CurrentPhraseFcModel';
import { createEmptyPreferenceModel, PreferenceModel } from '../../model/PreferenceModel';
import { ResultCode } from '../../model/ResultModel';
import { devLog, getLocalStorageObject } from '../../util/common';
import { DataKey } from '../../util/constants';
import { deleteLocalStorageObject, setCurrentIndex } from '../../util/UseLocalStorage';
import Header from './Header';
import OnePhrase from './OnePhrase';

type FlashCardProps = {
  onExit : (reloadList: boolean) => void,
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
    setCurrentIndex(currentFile.path, idx + 1);
  }
  const handleComplete = async() => {
    setCurrentIndex(currentFile.path, 0);
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

  const handleHidden = () => {
    const idx = currentFile.index;
    currentFile.file.phrases[idx].hidden = !currentFile.file.phrases[idx].hidden;
    setCurrentFile({...currentFile});
  }

  const handleCancel = () => {
    saveAndExit();
  }

  const saveAndExit = async(reloadList: boolean = false) => {
    let phrases = currentFile.file.phrases;
    let id = -1;
    let endIdx= 0;
    for (let i=currentFile.index; i < phrases.length; i++) {
        if (!phrases[i].hidden) {
          endIdx = i;
          id = phrases[i].id;
          break;
        }
    }
    let idx: number;
    if (id === -1) {
      idx = 0;
    } else {
      idx = -1;
      for (let i=0; i <= endIdx; i++) {
          if (!phrases[i].hidden) {
            idx++;
          }
      }
    }
    setCurrentIndex(currentFile.path, idx);

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
      <div className="mt-3"/>
      <OnePhrase
        isHidden = {currentFile.file.phrases[currentFile.index].hidden}
        phrase={currentFile.file.phrases[currentFile.index]}
        handleHidden={handleHidden}
       />

      <footer className="fixed bottom-0 text-center w-full mb-3">
      n:next &nbsp; esc:cancel
      </footer>
    </div>
  )
}

export default FlashCard;
