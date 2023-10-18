import React from 'react'
import RadioItem from '../../Component/RadioItem';

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
    <RadioItem 
      name={name}
      displayName={displayName}
      value={value}
      checked={value === currentValue}
      onChange={onCheckedChanged}
    />
  )
}

export default OptionFormItem;

