import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface TextButtonProps extends BaseStyleProps{
  textColor: string;
  onClick?: () => void;
}

const TextButton = (props: TextButtonProps) => {
  const {styles, children, textColor, onClick} = props;
  const styleList: string[] = [
    `text-${textColor}-500`,
    `hover:text-${textColor}-600`,
    `active:text-${textColor}-700`,
    styles ?? '',
  ]
  return(
    <button
      className={styleList.join(' ').trim()}
      onClick={onClick}>
    {children}
    </button>
  )
}

export default TextButton

// 明示的に記述しないと output.cssに記述されないため。。
const Dummy = () => {
  return(
    <>
      <button className="text-cyan-500 hover:text-cyan-600 active:text-cyan-700">dummy</button>
      <button className="text-red-500 hover:text-red-600 active:text-red-700">dummy</button>
    </>
  )
}