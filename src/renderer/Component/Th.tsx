import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface ThProps extends BaseStyleProps {
  colSpanNum? : number;
}
const Th = (props: ThProps) => {
  const {styles, colSpanNum, children} = props;
  const styleList: string[] = [
    "font-normal",
    "py-2",
    styles ?? '',
  ]
  return(
    <th className={styleList.join(' ').trim()} colSpan={colSpanNum || undefined}>
    {children}
    </th>
  )
}

export default Th;