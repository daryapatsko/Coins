import React from 'react'
import { IButton } from '../../interfaces'

const Button: React.FC<IButton> = ({customClass,onClick,title,children}) => {
  return (
    <button onClick={onClick} className={customClass}>
    {title}
    {children}
  </button>
  )
}

export default Button
