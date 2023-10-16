import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface H1Props extends BaseStyleProps {
}

const H1 = (props: H1Props) => {
  const {styles, children} = props;
  const styleList: string[] = [
    "text-gray-500",
    "font-bold",
    "text-[16pt]",
    styles ?? '',
  ]
  return(
    <h1 className={styleList.join(' ').trim()}>
    {children}
    </h1>
  )
}

export default H1;
