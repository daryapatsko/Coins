import React, { useEffect, useState } from 'react'
import styles from "../../styles/Header.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setTopCoins } from '../../store/store';
import { ICoin } from '../../interfaces';
import { shortNum } from '../../helpers/helpers';
import { useNavigate } from 'react-router-dom';
import HeaderBag from '../../assets/img/HeaderBag';
import BasketModal from '../BasketModal/BasketModal';
import Button from '../Button/Button';

const Header = () => {
  const coinsList = useSelector((state: RootState) => state.coins.coinsList) as ICoin[];
  const shopCoins: ICoin[] = useSelector((state: RootState) => state.coins.shopCoins);
  const topCoins: ICoin[] = useSelector((state: RootState) => state.coins.topCoins);
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch()
  const addTopCoins = () => {
    const topThreeCoins = coinsList
      .slice()
      .sort((a, b) => Number(a.rank) - Number(b.rank))
      .slice(0, 3);
    dispatch(setTopCoins(topThreeCoins))
  }

  useEffect(() => {
    calculateTotalPrice()
  }, [shopCoins])

  useEffect(()=>{
    addTopCoins()
  }, [coinsList])
  
  const calculateTotalPrice = () => {
    let total = 0;
    for (const coin of shopCoins) {
      if (coin.count) {
        total += coin.count * Number(coin.priceUsd);
      }
    }
    setTotalPrice(total);
  };
  return (
    <div className={styles.header__container}>
      <div className={styles.header__box}>
        <div className={styles.header__coins}>
          {topCoins.map((coin: ICoin) => (
            <Button key={coin.id} customClass={styles.header__coins_item} onClick={() => {
              navigate(`/coins/${coin.id}`)
            }}>
              <img className={styles.info__name_img} src={`https://assets.coincap.io/assets/icons/${(coin.symbol).toLowerCase()}@2x.png`} alt={coin.symbol} />
              <p className={styles.price_header}>{shortNum(coin.priceUsd)}$</p>
            </Button>
          ))}

        </div>
        <div className={styles.header__shop}>
          {totalPrice > 0 && <div >Total: <span className={styles.shop__total}>{totalPrice.toFixed(2)}$</span></div>}
          <div className={styles.shop__price__box}>
            {showModal && (
              <BasketModal
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
                setShowModal={setShowModal}
              />
            )}
          </div>
          <Button onClick={() => setShowModal(true)} customClass={styles.header__bag}><HeaderBag />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header
