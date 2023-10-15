import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface TdProps extends BaseStyleProps {
  onClick?: () => void;
}

const Td = (props: TdProps) => {
  const {styles, children, onClick} = props;
  const styleList: string[] = [
    "font-normal",
    "p-2",
    styles ?? '',
  ]
  return(
    <td className={styleList.join(' ').trim()} onClick={onClick} >
    {children}
    </td>
  )
}

export default Td;