import React from 'react'
import FlashCard from '../PhraseFcMain/FlashCard';
import OptionForm from './optionForm/OptionForm';
import PhraseFcFileList from './PhraseFcFileList';

const PhraseFcTop = () => {
  return(
  <>
    <PhraseFcFileList />
    <OptionForm />
    <FlashCard />
  </>
  )
}

export default PhraseFcTop;
