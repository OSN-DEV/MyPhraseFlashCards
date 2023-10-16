import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface H2Props extends BaseStyleProps {
}

const H2 = (props: H2Props) => {
  const {styles, children} = props;
  const styleList: string[] = [
    "text-gray-500",
    "font-bold",
    styles ?? '',
  ]
  return(
    <h2 className={styleList.join(' ').trim()}>
    &nbsp;&nbsp;{children}
    </h2>
  )
}

export default H2;
