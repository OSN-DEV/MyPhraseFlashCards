import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface TheadProps extends BaseStyleProps {
}
const Thead = (props: TheadProps) => {
  const {styles, children} = props;
  const styleList: string[] = [
    "bg-cyan-500",
    "text-white",
    styles ?? '',
  ]
  return(
    <thead className={styleList.join(' ').trim()}>
    {children}
    </thead>
  )
}

export default Thead;