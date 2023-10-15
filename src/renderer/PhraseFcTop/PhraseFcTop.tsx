import React, { useState } from 'react'
import { PhraseFcListModel } from '../../model/PhraseFcListModel';
import { devLog, getLocalStorageObject } from '../../util/common';
import { DataKey } from '../../util/constants';
import OptionForm from './optionForm/OptionForm';
import PhraseFcFileList from './PhraseFcFileList';

type PhraseFcTopProps = {
  onStart: () => void,
  onResume: () => void,
  phraseFcList : PhraseFcListModel[],
  setPhraseFcList: (list: PhraseFcListModel[]) => void
}

const PhraseFcTop = (props: PhraseFcTopProps) => {
  devLog(`PhraseFcTop`);
    // window.mainApi.setWindowTitle('文章フラッシュカード');
  const list = getLocalStorageObject<PhraseFcListModel[]>(DataKey.PharasFcFileList, []);
  const [phraseFcListCount, setPhraseFcListCount] = useState<number>(list.length);
  const {onStart, onResume, phraseFcList, setPhraseFcList } = props;
  return(
    <>
      <PhraseFcFileList 
        phraseFcList={phraseFcList}
        setPhraseFcList={setPhraseFcList}
        setPhraseFcListCount = {setPhraseFcListCount}
      />
      <div>&nbsp;</div>
      <OptionForm />
      <button 
        onClick={onStart}
        disabled = {phraseFcListCount === 0}
      >
        Start
      </button>
      <button
        className='Button'
        onClick={onResume}
        disabled = {phraseFcListCount === 0}
      >
      Resume
      </button>
    </>
  )
}

export default PhraseFcTop;
