import React from 'react'
import { useGetDataListQuery, useGetDataPerPageQuery } from '../../actions/actions'
import { setCoinsList } from '../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import CoinItem from './CoinItem/CoinItem'
import { ICoin } from '../../interfaces'

const CoinTable = () => {
    const dispatch = useDispatch();
    // const {data, isFetching, isError } = useGetDataListQuery({});
    const { data, isFetching, isError } = useGetDataPerPageQuery(10);
    const coinsList = useSelector((state: RootState) => state.coins.coinsList);
    console.log(coinsList)
    if (isFetching) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }

    dispatch(setCoinsList(data.data));

    return (
        <div>
            {coinsList.map((coin: ICoin) => (
                <CoinItem coin={coin} />
            ))}
        </div>
    )
}

export default CoinTable
