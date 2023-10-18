import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface H3Props extends BaseStyleProps {
}

const H3 = (props: H3Props) => {
  const {styles, children} = props;
  const styleList: string[] = [
    "text-gray-500",
    "text-[12pt]",
    styles ?? '',
  ]
  return(
    <h3 className={styleList.join(' ').trim()}>
    {children}
    </h3>
  )
}

export default H3;
