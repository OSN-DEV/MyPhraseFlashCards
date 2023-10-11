import React from 'react'
import { devLog } from '../../util/common';
import Header from './Header';
import OnePhrase from './OnePhrase';

type FlashCardProps = {
  onCancel : () => void
}

const FlashCard = (props: FlashCardProps) => {
  devLog(`FlashCard`);
  const { onCancel } = props;
  return(
    <div>
      FlashCard
      <Header />
      <OnePhrase />
      <button onClick={onCancel}>cancel</button>
    </div>
  )
}

export default FlashCard;
