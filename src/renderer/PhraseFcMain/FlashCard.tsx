import React, { useEffect, useState } from 'react'
import { createEmptyCurrentPhraseFcModel, CurrentPhraseFcModel } from '../../model/CurrentPhraseFcModel';
import { devLog } from '../../util/common';
import { DataKey } from '../../util/constants';
import { deleteLocalStorageObject, useLocalStorageObject } from '../../util/UseLocalStorage';
import Header from './Header';
import OnePhrase from './OnePhrase';

type FlashCardProps = {
  onCancel : () => void,
  currentFile: CurrentPhraseFcModel,
  setCurrentFile: (arg:CurrentPhraseFcModel) => void
}

const FlashCard = (props: FlashCardProps) => {
  devLog(`FlashCard`);
  const { onCancel, currentFile, setCurrentFile } = props;
  // const [currentFile, setCurrentFile] = useLocalStorageObject<CurrentPhraseFcModel>(DataKey.PhraseFcFile, createEmptyCurrentPhraseFcModel());
  // const [currentIndex, setCurrentIndex] = useState<number>(currentFile.index);
  
  // const index = currentFile.index;

  const phrases = currentFile.file.phrases;

  const setNext = () => {
    setCurrentFile({...currentFile, index: currentFile.index + 1});
  }
  const setComplete = () => {
    devLog(`complete`);
    deleteLocalStorageObject(DataKey.PhraseFcFile);
    onCancel();
  }

  const savePhraseFcFile = () => {

  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'n':
          if (phrases.length <= currentFile.index + 1) {
            setComplete();
          } else {
            setNext();
          }
          break;
        case 'Escape':
          onCancel();
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
      <button onClick={onCancel}>cancel</button>
      <footer>
      n:next &nbsp; esc:cancel
      </footer>
    </div>
  )
}

export default FlashCard;
