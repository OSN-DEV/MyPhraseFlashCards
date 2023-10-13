import React from 'react'
import { createEmptyPreferenceModel, PreferenceModel } from '../../../model/PreferenceModel';
import { devLog } from '../../../util/common';
import { DataKey, OrderDef } from '../../../util/constants';
import { deleteLocalStorageObject, useLocalStorageObject } from '../../../util/UseLocalStorage';
import OptionFormItem from './OptionFormItem';

const OptionForm = () => {
  const [preference, setPreference] = useLocalStorageObject<PreferenceModel>(DataKey.Preference, createEmptyPreferenceModel());

  const RadioData = [
    { name: 'order', value: OrderDef.FromTheBegining, displayName: '先頭から'}
   ,{ name: 'order', value: OrderDef.LessNumberOfQuestion, displayName: '出題回数が少ない'}
   ,{ name: 'order', value: OrderDef.Random, displayName: 'ランダム'}
  ];

  const handleOrderChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    devLog(`handleOrderChanged: ${e.currentTarget.value}`);
    setPreference({...preference, orderOfQuestions: e.currentTarget.value});
    deleteLocalStorageObject(DataKey.CurrentIndex);
  }

  const handleNumberOfQuestionChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    devLog(`handleNumberOfQuestionChanged: ${e.currentTarget.value}`);
    setPreference({...preference, numberOfQuestions: e.currentTarget.value});
    deleteLocalStorageObject(DataKey.CurrentIndex);
  }

  return(
    <>
      <div>
        <label>出題数</label>
        <input type="number" 
          defaultValue={preference.numberOfQuestions}
          onChange={handleNumberOfQuestionChanged}
        />
        問(省略時は全問)
      </div>
      <div>
        <label>出題順</label>
        {
          RadioData.map((data) => (
            <OptionFormItem
              key={data.value}
              {...data}
              currentValue={preference.orderOfQuestions}
              onCheckedChanged = {handleOrderChanged}
              />
          ))
        }
      </div>
    </>
  )
}

export default OptionForm;
