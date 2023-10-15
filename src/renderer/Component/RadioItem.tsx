import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface RadioItemProps extends BaseStyleProps{
  name: string;
  displayName: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioItem = (props: RadioItemProps) => {
  const {styles, name, displayName, value, checked, onChange} = props;
  const styleList: string[] = [
    "flex",
    "rounded-md",
    "hover:bg-gray-100",
    "cursor-pointer",
    "px-2",
    "py-1",
    styles ?? '',
  ]
  return(
    <label className={styleList.join(' ').trim()}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange = {onChange}
        />
      <span className="pl-2">{displayName}</span>
    </label>
  )
}
export default RadioItem;

