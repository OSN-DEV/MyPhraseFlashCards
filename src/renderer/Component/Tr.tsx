import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface TrProps extends BaseStyleProps {
  isSelected?: boolean;
}
const Tr = (props: TrProps) => {
  const {styles, children, isSelected} = props;
  const styleList: string[] = [
    isSelected ? 'bg-slate-100' : '',
    styles ?? '',
  ]
  return(
    <tr className={styleList.join(' ').trim()}>
    {children}
    </tr>
  )
}

export default Tr;