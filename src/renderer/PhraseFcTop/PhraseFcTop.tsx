import React, { useState } from 'react'
import { PhraseFcModel } from '../../model/PhraseFcModel';
import { devLog } from '../../util/common';
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
  const [phraseFcListCount, setPhraseFcListCount] = useState<number>(0);
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
