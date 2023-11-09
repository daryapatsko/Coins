import React, { useEffect, useState } from 'react';
import { useGetCoinItemQuery } from '../../actions/actions';
import {  useNavigate, useParams } from 'react-router-dom';
import styles from "../../styles/currentCoinItem.module.scss";
import ChartComponent from '../ChartComponent/ChartComponent';
import ShopBag from '../../assets/img/ShopBag';
import { ICoin } from '../../interfaces';
import Button from '../Button/Button';
import { addToShopBag, shortNum } from '../../helpers/helpers';

const CurrentCoinItem = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const { data, isFetching, isError } = useGetCoinItemQuery(id);
    const [currentCoin, setCurrentCoin] = useState<ICoin | null>(null);
    const [isAdded, setIsAdded] = useState(false)
    useEffect(() => {
        if (data) {
            setCurrentCoin(data.data);
        }
    }, [data]);

    if (isFetching) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }

    if (!currentCoin) {
        return <div>Invalid coin ID</div>;
    }

    const sourse = currentCoin.symbol;
    const price = shortNum(currentCoin.priceUsd)
   
    return (
        <div className={styles.curr__coin__container}>
            <Button onClick={()=>{navigate('/')}} title="Back to Main Page" customClass={styles.btn_back}></Button>
            <div className={styles.curr_coin_info}>
                <div className={styles.curr_coin_details}>
                    <img
                        className={styles.curr_coin_img}
                        src={`https://assets.coincap.io/assets/icons/${sourse.toLowerCase()}@2x.png`}
                        alt={currentCoin.symbol}
                    />
                    <div className={styles.curr_coin_name}>
                        <span>{currentCoin.name}</span>
                        <div className={styles.curr_coin_symbol}>
                        <span>{currentCoin.symbol} <span className={styles.rank}>({currentCoin.rank})</span></span>
                    </div>
                    </div>
                   
                </div>
                <div className={styles.curr_prices_details}>
                    <div className={styles.detail_item}>
                        <div className={styles.curr_coin_supply}>Supply: </div>
                        <span>{shortNum(currentCoin.supply)}</span>
                    </div>
                    <div className={styles.detail_item}>
                        <div className={styles.curr_coin_price}>Price: </div>
                        <span>{price}</span>
                    </div>
                    <div className={styles.detail_item}>
                        <div className={styles.curr_coin_market}>Market Cap: </div>
                        <span>{shortNum(currentCoin.marketCapUsd)}</span>
                    </div>
                    <div className={styles.detail_item}>
                        <div className={styles.curr_coin_maxsupply}>Max supply: </div>
                        <span>{shortNum(currentCoin.maxSupply)}</span>
                    </div>

                </div>
                <Button customClass={styles.btn__shop} onClick={() => {
                    addToShopBag(currentCoin)
                    setIsAdded(!isAdded)
                }}>
                    <ShopBag isAdded={isAdded}/></Button>
                
            </div>
            <div className={styles.schedule__container}>
                <ChartComponent id={id} currentCoin={currentCoin} />
            </div>
        </div>
    );
}

export default CurrentCoinItem;