import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface ButtonProps extends BaseStyleProps{
  disabled?: boolean;
  onClick?: () => void;
}

const Button = (props: ButtonProps = {disabled: false}) => {
  const {styles, children, disabled, onClick} = props;
  const styleList: string[] = [
    "rounded",
    "text-white",
    "bg-cyan-500",
    "hover:bg-cyan-600",
    "active:bg-cyan-700",
    "w-20",
    "px-3",
    "py-1",
    styles ?? '',
  ]
  return(
    <button
      className={styleList.join(' ').trim()}
      disabled={disabled}
      onClick={onClick}>
    {children}
    </button>
  )
}
export default Button;
