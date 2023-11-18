import React, { useEffect } from 'react'
import styles from "../../styles/BasketModal.module.scss"
import Button from '../Button/Button';
import Close from '../../assets/img/Close';
import { IBasketModalProps, ICoin } from '../../interfaces';
import { getShopCoins, updateShopCoins } from '../../helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setShopCoins } from '../../store/store';


const BasketModal = ({ setShowModal, totalPrice, setTotalPrice }: IBasketModalProps) => {
  const shopCoins: ICoin[] = useSelector((state: RootState) => state.coins.shopCoins);
  const dispatch = useDispatch()

 useEffect(() => {
  const updatedShopCoins = getShopCoins();
  setShopCoins(updatedShopCoins);
}, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, []);

  const deleteItem = (id: string) => {
    const shopCoins: ICoin[] = getShopCoins();
    const coinIndex = shopCoins.findIndex((item) => item.id === id);

    if (coinIndex !== -1) {
      shopCoins.splice(coinIndex, 1);
      updateShopCoins(shopCoins);
      dispatch(setShopCoins(shopCoins))
    }
  };
  

  return (
    <div className={styles.basket__modal__container}>
      <div className={styles.basket__modal_box}>
        <Button customClass={styles.btn__close_modal} onClick={() => setShowModal(false)}> <Close /></Button>
        <h3 className={styles.basket_header__modal}>Shopping Basket</h3>
        <div className={styles.basket__content}>
          {shopCoins.length === 0 ? (
            <p>Your basket is empty.</p>
          ) : (
            <ul>
              {shopCoins.map((coin: ICoin, index) => (
                <li key={index} className={styles.basket__item_coin}>
                  <div className={styles.basket__item_name}> {coin.name} </div>
                  <div className={styles.basket__item_details}>
                    {coin.count &&
                      <div className={styles.basket__item_price}>Price: <span className={styles.price}>{(coin.count * Number(coin.priceUsd)).toFixed(2)} USD</span></div>
                    }
                    <Button customClass={styles.btn__delete} onClick={() =>
                      deleteItem(coin.id)
                    }>Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}

        </div>
        <div className={styles.basket__total_price}>Total price: <span className={styles.price}>{totalPrice.toFixed(2)} USD</span></div>
      </div>
    </div>
  );
}

export default BasketModal
