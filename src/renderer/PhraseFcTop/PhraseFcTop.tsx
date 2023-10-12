import React, { useState } from 'react'
import { PhraseFcListModel } from '../../model/PhraseFcListModel';
import { devLog, getLocalStorageObject } from '../../util/common';
import { DataKey } from '../../util/constants';
import OptionForm from './optionForm/OptionForm';
import PhraseFcFileList from './PhraseFcFileList';

type PhraseFcTopProps = {
   onStart: () => void
}

const PhraseFcTop = (props: PhraseFcTopProps) => {
  devLog(`PhraseFcTop`);
    // window.mainApi.setWindowTitle('文章フラッシュカード');
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
