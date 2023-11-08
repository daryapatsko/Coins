import React from 'react'
import { useGetCoinItemQuery } from '../../actions/actions';
import { useParams } from 'react-router-dom';
import styles from "../../styles/currentCoinItem.module.scss"

const CurrentCoinItem = () => {
    const { id } = useParams()
    const { data, isFetching, isError } = useGetCoinItemQuery(id);
    let coin = data.data
    const sourse = coin.symbol;
    const price = Number(coin.priceUsd).toFixed(2);
    if (isFetching) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }

    if(!data) {
        return <div> Invalid coin ID</div>
    }

    return (
        <div>
            <div className={styles.curr_coin_info}>
                <div className={styles.curr_coin_details}>
                    <img className={styles.curr_coin_img} src={`https://assets.coincap.io/assets/icons/${sourse.toLowerCase()}@2x.png`} alt={coin.symbol} />
                    <div className={styles.curr_coin_name}><span>{coin.name}</span></div>
                    <div className={styles.curr_coin_symbol}><span>{coin.symbol} ({coin.rank})</span></div>
                </div>
                <div className={styles.curr_prices_details}>
                    <div className={styles.curr_coin_supply}>Supply: </div><span>{coin.supply}</span>
                    <div className={styles.curr_coin_price}>Price: </div><span>{price}</span>
                    <div className={styles.curr_coin_market}>Market Cap: </div><span>{coin.marketCapUsd}</span>
                    <div className={styles.curr_coin_maxsupply}>Max supply: </div><span>{coin.maxSupply !== null ? coin.maxSupply : ' - '}</span>
              
                </div>

            </div>
            <div className={styles.schedule__container}>

            </div>

        </div>
    )
}

export default CurrentCoinItem
