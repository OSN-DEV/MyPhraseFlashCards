import React from 'react'
import { PhraseModel } from '../../model/PhraseFcModel'

type OnePhraseProps = {
  phrase: PhraseModel
}

const OnePhrase = (props: OnePhraseProps) => {
  const {phrase} = props;
  return(
    <>
      <h1>{phrase.header1}</h1>
      <h2>{phrase.header2}</h2>
      <h3>{phrase.header3}</h3>
      {
        phrase.paragraphs.map((m,i) => (
            <div key={i}>
            <p>{m.para}</p>
            {m.sub && <p>{m.sub}</p>}
            </div>
          )
        )
      }
      <aside>{phrase.note}</aside>
      <aside>times:{phrase.playCount}</aside>
    </>
  )
}

export default OnePhrase;

