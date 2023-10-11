import React, { useState } from 'react'
import { PhraseFcListModel } from '../../model/PhraseFcListModel';
import { PhraseFcModel } from '../../model/PhraseFcModel';
import { createEmptyPreferenceModel, PreferenceModel } from '../../model/PreferenceModel';
import { devLog, getLocalStorageObject } from '../../util/common';
import { DataKey } from '../../util/constants';
import { useLocalStorageObject } from '../../util/UseLocalStorage';
import FlashCard from '../PhraseFcMain/FlashCard';
import OptionForm from './optionForm/OptionForm';
import PhraseFcFileList from './PhraseFcFileList';

type PhraseFcTopProps = {
   onStart: () => void
}

const PhraseFcTop = (props: PhraseFcTopProps) => {
  devLog(`PhraseFcTop`);
  const list = getLocalStorageObject<PhraseFcListModel[]>(DataKey.PharasFcFileList, []);
  const [phraseFcListCount, setPhraseFcListCount] = useState<number>(list.length);
  const {onStart} = props;
  return(
    <>
      <PhraseFcFileList 
        setPhraseFcListCount = {setPhraseFcListCount}
      />
      <OptionForm />
      <button 
        onClick={onStart}
        disabled = {phraseFcListCount === 0}
      >
        Start
      </button>
    </>
  )
}

export default PhraseFcTop;
