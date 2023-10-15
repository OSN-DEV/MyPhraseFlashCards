import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface LabelProps extends BaseStyleProps {
}

const Label = (props: LabelProps) => {
  const {styles, children} = props;
  const styleList: string[] = [
    "text-xs",
    "text-gray-500",
    "font-medium", 
    "block",
    "mb-2",
    styles ?? '',
  ]
  return(
    <label className={styleList.join(' ').trim()}>
    {children}
    </label>
  )
}

export default Label;
