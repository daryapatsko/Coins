import React from 'react'
import { IButton } from '../../interfaces'

const Button: React.FC<IButton> = ({customClass,onClick,title}) => {
  return (
    <button onClick={onClick} className={customClass}>
    {title}
  </button>
  )
}

export default Button
