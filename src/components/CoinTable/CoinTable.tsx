import React, { useState, useEffect } from 'react'
import { useGetDataPerPageQuery } from '../../actions/actions'
import { setCoinsList } from '../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import CoinItem from './CoinItem/CoinItem'
import { ICoin } from '../../interfaces'
import Pagination from '../Pagination/Pagination'
import styles from "../../styles/coinnTable.module.scss"
import Input from '../Input/Input'

const CoinTable = () => {
    const [searchValue, setSearchValue] = useState('')
    const [sorting, setSorting] = useState({
        column: 'rank',
        order: 'asc',
    });
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.pagination.currentPage)
    const { data, isFetching, isError } = useGetDataPerPageQuery(currentPage);
    const coinsList = useSelector((state: RootState) => state.coins.coinsList);
    const filteredCoins = coinsList.filter((coin: ICoin) =>
        coin.name.toLowerCase().includes(searchValue.toLowerCase())
    )

    useEffect(() => {
        if (data) {
            dispatch(setCoinsList(data.data))
        }
    }, [data, dispatch])

    const handleSort = (column: string) => {
        const newOrder = sorting.column === column && sorting.order === 'asc' ? 'desc' : 'asc';

        setSorting({
            column,
            order: newOrder,
        });

        const sortedCoinsList = [...coinsList].sort((a, b) => {
            if (newOrder === 'asc') {
                return a[column] - b[column];
            } else {
                return b[column] - a[column];
            }
        });

        dispatch(setCoinsList(sortedCoinsList));
    };

    if (isFetching) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }



    return (
        <>
            <section className={styles.section__wrapper}>
                <Input customClass={styles.coins__search} searchValue={searchValue} setSearchValue={setSearchValue} />
                <div className={styles.table__container} >
                    <table className={styles.table__coins}>
                        <tr className={styles.table__coins__header}>
                            <th className={styles.coins__info} onClick={() => handleSort('rank')}>Rank</th>
                            <th className={`${styles.coins__info} crypto__name`}>Name</th>
                            <th className={styles.coins__info} onClick={() => handleSort('priceUsd')}>Price</th>
                            <th className={styles.coins__info} onClick={() => handleSort('marketCapUsd')}>Market Cap</th>
                            <th className={styles.coins__info} onClick={() => handleSort('changePercent24Hr')}>Change 24h</th>
                            <th className={styles.coins__info}>Add</th>
                        </tr>
                        <tbody className={styles.table__body}>
                            {filteredCoins.map((coin: ICoin) => (
                                <CoinItem key={coin.id} coin={coin} />
                            ))}
                        </tbody>
                    </table>
                </div>

            </section>
            <Pagination />
        </>

    )
}

export default CoinTable
