import React, { useEffect, useState } from 'react'
import styles from "../../styles/BasketModal.module.scss"
import { getShopCoins } from '../../helpers/helpers';
import Button from '../Button/Button';
import Close from '../../assets/img/Close';
import { IBasketCoin } from '../../interfaces';
import { IBasketModalProps } from '../../interfaces';


const BasketModal = ({ setShowModal }: IBasketModalProps) => {
  const [basketCoins, setBasketCoins] = useState<IBasketCoin[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const shopCoins = getShopCoins();
    setBasketCoins(shopCoins);
    return () =>{
      document.body.style.overflow = 'auto'
    }
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [basketCoins]);

  const calculateTotalPrice = () => {
    let total = 0;
    for (const coin of basketCoins) {
      if (coin.count) {
        total += coin.count * coin.priceUsd;
      }
    }
    setTotalPrice(total);
  };
  const deleteItemCoin = (id: string) => {
    const updatedBasketCoins = basketCoins.filter((coin) => coin.id !== id);
    setBasketCoins(updatedBasketCoins);
    updateShopCoins(updatedBasketCoins)
  };

  const updateShopCoins = (updatedCoins:IBasketCoin[]) => {
    localStorage.setItem('shopCoins', JSON.stringify(updatedCoins));
  }

  return (
    <div className={styles.basket__modal__container}>
      <div className={styles.basket__modal_box}>
        <Button customClass={styles.btn__close_modal} onClick={() => setShowModal(false)}> <Close /></Button>
        <h3 className={styles.basket_header__modal}>Shopping Basket</h3>
        <div className={styles.basket__content}>
          {basketCoins.length === 0 ? (
            <p>Your basket is empty.</p>
          ) : (
            <ul>
              {basketCoins.map((coin: IBasketCoin, index) => (
                <li key={index} className={styles.basket__item_coin}>
                  <div className={styles.basket__item_name}> {coin.name} </div>
                  <div className={styles.basket__item_details}>
                    <div className={styles.basket__item_price}>Price: <span className={styles.price}>{(coin.count * coin.priceUsd).toFixed(2)} USD</span></div>
                    <Button customClass={styles.btn__delete} onClick={() => deleteItemCoin(coin.id)}>Delete</Button>
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
