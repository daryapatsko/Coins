import React from 'react'
import { ICoin } from '../../../interfaces'

const CoinItem:React.FC<{coin:ICoin}> = ({coin}) => {
  return (
    <div>
      <div>{coin.rank}</div>
      <div>{coin.name}</div>
    </div>
  )
}

export default CoinItem
