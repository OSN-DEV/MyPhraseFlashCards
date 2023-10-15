import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface InputNumberProps extends BaseStyleProps {
}

const InputNumber = (props: InputNumberProps) => {
  const {styles} = props;
  const styleList: string[] = [
    "border-b-2",
    "border-gray-300",
    "w-12",
    "focus:outline-0",
    "focus:border-cyan-600",
    styles ?? '',
  ]
  return(
    <input type="number" className={styleList.join(' ').trim()}/>

  )
}

export default InputNumber;
