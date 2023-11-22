import React from 'react'
import { IInput } from '../../interfaces'

const Input: React.FC<IInput> = ({searchValue,setSearchValue,customClass}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
    }
  return (
    <>
    <input 
    type="text"
    className={customClass} 
    placeholder='Search coins'  
    value={searchValue} 
    onChange={handleInputChange}/>
    </>
  )
}

export default Input
