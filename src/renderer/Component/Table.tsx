import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface TableProps extends BaseStyleProps {
}

const Table = (props: TableProps) => {
  const {styles, children} = props;
  const styleList: string[] = [
    "w-full",
    styles ?? '',
  ]
  return(
    <table className={styleList.join(' ').trim()}>
    {children}
    </table>
  )
}

export default Table;