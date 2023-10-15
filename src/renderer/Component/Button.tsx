import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface ButtonProps extends BaseStyleProps{
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const {styles, children, onClick} = props;
  const styleList: string[] = [
    "rounded",
    "text-white",
    "bg-cyan-500",
    "hover:bg-cyan-600",
    "active:bg-cyan-700",
    "px-3",
    "py-1",
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
export default Button;
