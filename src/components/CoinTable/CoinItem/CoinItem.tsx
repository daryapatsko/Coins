import React, {  useEffect, useState } from 'react';
import { ICoin } from '../../../interfaces';
import styles from "../../../styles/coinItem.module.scss"
import { useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import ShopBag from '../../../assets/img/ShopBag';
import CountModal from '../../CountModal/CountModal';
import { shortNum } from '../../../helpers/helpers';

const CoinItem = ({ coin }: { coin: ICoin }) => {
  const navigate = useNavigate()
  const sourse = coin.symbol;
  const [showModal, setShowModal] = useState(false);

  const handleRowClick = () => {
    navigate(`/coins/${coin.id}`)
  }
  const addToBasket = () => {
    setShowModal(true) 
  }

  return (
    <tr className={styles.table__row}>
      <td className={styles.info__rank}>{coin.rank}</td>
      <td className={styles.info__name} onClick={handleRowClick}>
        <img className={styles.info__name_img} src={`https://assets.coincap.io/assets/icons/${sourse.toLowerCase()}@2x.png`} alt={coin.symbol} />
        <span className={styles.info__name_span}>{coin.name}
          <span className={styles.info__symbol}> ({coin.symbol})</span>
        </span>
      </td>
      <td className={styles.info__price}>{shortNum(coin.priceUsd)} USD</td>
      <td className={styles.info__market}>{shortNum(coin.marketCapUsd)} USD</td>
      <td className={styles.info__percent}>{shortNum(coin.changePercent24Hr)} %</td>
      <td >
        <Button customClass={styles.btn__shop} onClick={addToBasket}>
          <ShopBag/>
        </Button>
        {showModal && (
          <CountModal coin={coin} setShowModal={setShowModal}/>
        )}
      </td>
    </tr>
  );
};

export default CoinItem;