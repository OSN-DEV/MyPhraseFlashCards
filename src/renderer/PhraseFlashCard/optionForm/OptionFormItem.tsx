import React from 'react'
import { createEmptyPreferenceModel, PreferenceModel } from '../../../model/PreferenceModel';
import { DataKey, OrderDef } from '../../../util/constants';
import { useLocalStorageObject } from '../../../util/UseLocalStorage';

export type OptionFormItemType = {
  name: string,
  value: string,
  displayName: string,
  currentValue: string,
  onCheckedChanged: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const OptionFormItem = (props: OptionFormItemType) => {
  const {name, value, displayName, currentValue, onCheckedChanged} = props;  
  return(
    <>
      <input 
        type="radio"
        name={name}
        value={value}
        id={value}
        checked={value === currentValue}
        onChange={onCheckedChanged}
      />
      <label htmlFor={value}>{displayName}</label>
    </>
  )
}

export default OptionFormItem;

