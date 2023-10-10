import React from 'react'
import { OrderDef } from '../../../util/constants';

const OptionForm = () => {
  const [preference, setPreference] = useLocalStorageObject<PreferenceModel>(DataKey.Preference, createEmptyPreferenceModel());
  
  return(
    <>
      <div>
        <label>出題数</label>
        <input type="number" />
        問(省略時は全問)
      </div>
      <div>
        <label>出題順</label>
        <input type="radio" name="order" value={OrderDef.FromTheBegining} id="fromTheBegining"/>
        <label htmlFor="fromTheBegining">先頭から</label>
        <input type="radio" name="order" value={OrderDef.LessNumberOfQuestion} id="lessNumberOfQuestion"/>
        <label htmlFor="LessNumberOfQuestion">出題数が少ない</label>
        <input type="radio" name="order" value={OrderDef.LowAccuracyRate} id="lowAccuracyRate"/>
        <label htmlFor="lowAccuracyRate">正答率が低い</label>
        <input type="radio" name="order" value={OrderDef.Random} id="random"/>
        <label htmlFor="random">ランダム</label>
      </div>
    </>
  )
}

export default OptionForm;
