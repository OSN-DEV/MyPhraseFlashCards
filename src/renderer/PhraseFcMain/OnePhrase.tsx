import React from 'react'
import { PhraseModel } from '../../model/PhraseFcModel'

type OnePhraseProps = {
  phrase: PhraseModel
}

const OnePhrase = (props: OnePhraseProps) => {
  const {phrase} = props;
  if (!phrase) {
    return(
      <>
        <p>データの読込みに失敗しました。</p>
      </>
    )
  }

  return(
    <>
      {phrase.header1 && <h1>{phrase.header1}</h1>}
      {phrase.header2 && <h2>{phrase.header2}</h2>}
      {phrase.header3 && <h3>{phrase.header3}</h3>}
      {
        phrase.paragraphs.map((m,i) => (
            <div key={i}>
            <p>{m.para}</p>
            {m.sub && <p>{m.sub}</p>}
            </div>
          )
        )
      }
      { phrase.note && <aside>{phrase.note}</aside>}
      { phrase.playCount && <aside>times:{phrase.playCount}</aside>}
    </>
  )
}

export default OnePhrase;

