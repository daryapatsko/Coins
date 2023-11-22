import React, { useEffect, useState } from 'react'
import styles from "../../styles/countModal.module.scss"
import Close from '../../assets/img/Close'
import Button from '../Button/Button'
import { addToShopBag,
    getShopCoins
} from '../../helpers/helpers'
import { useDispatch } from 'react-redux'
import { setShopCoins } from '../../store/store'
import { ICountModal } from '../../interfaces'



const CountModal: React.FC<ICountModal> = ({setShowModal, coin}) => {
    const dispatch = useDispatch()
    const [count, setCount] = useState<number | string>(0)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        if(count === '' || count === '0' || count === '0.'){
            setTotalPrice(0)
        } else {
            setTotalPrice(Number(coin.priceUsd) * parseFloat(count as string))
        }
        return () =>{
            document.body.style.overflow = 'auto'
          }
    }, [count, coin])
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if(inputValue === '' || inputValue === '0' || inputValue === '0.') {
            setCount(inputValue)
        } else {
            const newCount = parseFloat(inputValue);
            if (!isNaN(newCount) && newCount >= 0) {
                setCount(newCount)
            }
        }
    }

    const handleArrowClick = (value: number) => {
        setCount((prevCount) => {
            const newCount = roundToDecimal(Number(prevCount) + value, 2);
            return newCount >= 0 ? newCount : 0;
        })
    }
   
    const handleAddClick = () => {
            addToShopBag({ ...coin, count: typeof count === 'string' ? parseFloat(count) : count});
            setShowModal(false)
            const shopCoins = getShopCoins()
            dispatch(setShopCoins(shopCoins))
            
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            handleArrowClick(0.1);
        } else if (e.key === 'ArrowDown') {
            handleArrowClick(-0.1);
        }
    };
    const roundToDecimal = (value: number, decimalPlaces: number) => {
        const multiplier = 10 ** decimalPlaces;
        return Math.round(value * multiplier) / multiplier;
      };
      

    return (
        <div className={styles.count__modal__container}>
            <div className={styles.count__modal}>
                <Button customClass={styles.btn__close_modal} onClick={() => setShowModal(false)}> <Close/></Button>
                <h3 className={styles.header__modal}>Count of {coin.name}</h3>
                <div className={styles.header__form} >
                    <label className={styles.header__label}>Enter Count: </label>
                    <input className={styles.header__input}
                        type="number"
                        value={count}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        step="0.1"
                    />
                </div>
                <div className={styles.arrow__box}>
                    <Button customClass={styles.btn__arrow} onClick={() => handleArrowClick(0.1)}>+ 0.1</Button>
                    <Button customClass={styles.btn__arrow} onClick={() => handleArrowClick(-0.1)}>-0.1</Button>
                </div>
                <div className={styles.header__total} >Total price: {totalPrice.toFixed(2)}</div>
                <div className={styles.btn__box}>
                    <Button title='Add'  customClass={styles.btn__add_modal} onClick={handleAddClick}></Button>
                </div>

            </div>

        </div>
    )
}

export default CountModal
