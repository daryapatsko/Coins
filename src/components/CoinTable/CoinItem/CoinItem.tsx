import React from 'react';
import { ICoin } from '../../../interfaces';
import styles from "../../../styles/coinItem.module.scss"
import { useNavigate } from 'react-router-dom';

const CoinItem = ({ coin }: { coin: ICoin }) => {
  const navigate = useNavigate()
  const sourse = coin.symbol;
  const price = Number(coin.priceUsd).toFixed(2) ;
  const market = Number(coin.marketCapUsd).toFixed(2);
  const percent = Number(coin.changePercent24Hr).toFixed(2);
  const handleRowClick = () =>{
    navigate(`/coins/${coin.id}`)
  }

  return (
    <tr className={styles.table__row} 
    onClick={handleRowClick}
    >
      <td className={styles.info__rank}>{coin.rank}</td>
      <td className={styles.info__name}>
        <img className={styles.info__name_img} src={`https://assets.coincap.io/assets/icons/${sourse.toLowerCase()}@2x.png`} alt={coin.symbol} />
        <span className={styles.info__name_span}>{coin.name}
        <span className={styles.info__symbol}> ({coin.symbol})</span>
        </span>
      </td>
      <td className={styles.info__price}>{price}%</td>
      <td className={styles.info__market}>{market}$</td>
      <td className={styles.info__percent}>{percent}%</td>
      <td >ADD</td>
    </tr>
  );
};

export default CoinItem;