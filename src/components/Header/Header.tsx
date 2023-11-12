import React, { useEffect, useState } from 'react'
import styles from "../../styles/Header.module.scss"
import {  useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ICoin } from '../../interfaces';
import { shortNum } from '../../helpers/helpers';
import { useNavigate } from 'react-router-dom';
import HeaderBag from '../../assets/img/HeaderBag';
import BasketModal from '../BasketModal/BasketModal';
import Button from '../Button/Button';

const Header = () => {
  const coinsList = useSelector((state: RootState) => state.coins.coinsList); 
  const topThreeCoins = coinsList.slice(0, 3);
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className={styles.header__container}>
      <div className={styles.coins__container}>
        <div className={styles.header__coins}>
          {topThreeCoins.map((coin: ICoin) => (
            <Button key={coin.id} customClass={styles.header__coins_item} onClick={() => {
              navigate(`/coins/${coin.id}`)
            }}>
              <img className={styles.info__name_img} src={`https://assets.coincap.io/assets/icons/${(coin.symbol).toLowerCase()}@2x.png`} alt={coin.symbol} /> 
              <p className={styles.price_header}>{shortNum(coin.priceUsd)}$</p>
              </Button>
          ))}
          
        </div>
        <div className="header__shop">
          <div className={styles.shop__price__box}>
          {showModal && (
          <BasketModal setShowModal={setShowModal}/>
        )}
          </div>
          <Button onClick={() => setShowModal(true)} customClass={styles.header__bag}><HeaderBag /></Button>
        </div>
      </div>
    </div>
  )
}

export default Header
