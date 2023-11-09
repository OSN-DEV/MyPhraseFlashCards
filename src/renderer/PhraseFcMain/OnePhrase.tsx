import React from 'react'
import { PhraseModel } from '../../model/PhraseFcModel'
import H1 from '../Component/H1'
import H2 from '../Component/H2'
import H3 from '../Component/H3'
import Button from '../Component/Button'
import Para from '../Component/Para'

type OnePhraseProps = {
  phrase: PhraseModel,
  isHidden: boolean,
  handleHidden: () => void
}

const OnePhrase = (props: OnePhraseProps) => {
  const {phrase,isHidden, handleHidden} = props;
  if (!phrase) {
    return(
      <>
        <p>データの読込みに失敗しました。</p>
      </>
    )
  }

  return(
    <>
      {phrase.header1 && <H1>{phrase.header1}</H1>}
      {phrase.header2 && <H2>{phrase.header2}</H2>}
      {phrase.header3 && <H3>{phrase.header3}</H3>}
      <div className="mt-6"/>
      {
        phrase.paragraphs.map((m,i) => (
            <div key={i} className="mt-2">
            <Para>{m.para}</Para>
            {m.sub && <p className="text-gray-400">{m.sub}</p>}
            </div>
          )
        )
      }
      <div className="mt-6" />
      { phrase.note && <Para styles="bg-[#00a40026] text-[#003100] my-2 p-2">{phrase.note}</Para>}
      <div className="mt-3" />
      <aside className="bg-gray-100 my-2 mr-2 p-2 fixed bottom-10 text-center">
        times:{phrase.playCount}
        <Button styles="ml-3" onClick={handleHidden}>{isHidden ? 'show' : 'hide'}</Button>
      </aside>
    </>
  )
}

export default OnePhrase;

