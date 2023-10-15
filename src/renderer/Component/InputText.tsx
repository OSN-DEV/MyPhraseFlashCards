import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface InputTextProps extends BaseStyleProps {
  defaultValue: string;
  onChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = (props: InputTextProps) => {
  const {styles, defaultValue, onChange} = props;
  const styleList: string[] = [
    "border-b-2",
    "border-gray-300",
    "w-12",
    "focus:outline-0",
    "focus:border-cyan-600",
    styles ?? '',
  ]
  return(
    <input 
      type="text"
      defaultValue={defaultValue}
      onChange={onChange}
      className={styleList.join(' ').trim()}
    />

  )
}

export default InputText;
