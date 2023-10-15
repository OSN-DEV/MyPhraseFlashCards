import React from 'react'
import { createEmptyPreferenceModel, PreferenceModel } from '../../../model/PreferenceModel';
import { devLog } from '../../../util/common';
import { DataKey, OrderDef } from '../../../util/constants';
import { deleteLocalStorageObject, useLocalStorageObject } from '../../../util/UseLocalStorage';
import InputText from '../../Component/InputText';
import Label from '../../Component/Label';
import OptionFormItem from './OptionFormItem';

const OptionForm = () => {
  const [preference, setPreference] = useLocalStorageObject<PreferenceModel>(DataKey.Preference, createEmptyPreferenceModel());

  const RadioData = [
    { name: 'order', value: OrderDef.FromTheBeginning, displayName: '先頭から'}
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
    <div className="flex flex-col ml-10">
      <div>
        <Label>出題数</Label>
        <InputText 
          styles ="text-right mr-2"
          defaultValue={preference.numberOfQuestions}
          onChange={handleNumberOfQuestionChanged}
        />
        問(省略時は全問)
      </div>

      <div className="mt-6">
        <Label>出題順</Label>
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
    </div>
  )
}

export default OptionForm;
