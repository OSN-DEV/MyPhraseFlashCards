import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface H3Props extends BaseStyleProps {
}

const H3 = (props: H3Props) => {
  const {styles, children} = props;
  const styleList: string[] = [
    "text-gray-500",
    styles ?? '',
  ]
  return(
    <h3 className={styleList.join(' ').trim()}>
    &nbsp;&nbsp;&nbsp;&nbsp;{children}
    </h3>
  )
}

export default H3;
