import React from 'react'
import FlashCard from './flashCard/FlashCard';
import OptionForm from './optionForm/OptionForm';
import PhraseFcFileList from './phraseFcFileList/PhraseFcFileList';

const PhraseFlashCard = () => {
  return(
  <>
    <PhraseFcFileList />
    <OptionForm />
    <FlashCard />
  </>
  )
}

export default PhraseFlashCard;
