import React, { useState, useEffect } from 'react';
import { RootState, setCoinHistory } from '../../store/store';
import { useGetCoinHistoryQuery } from '../../actions/actions';
import { ICoin } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import * as d3 from 'd3'


interface IChartComponent {
  id: string | undefined, 
  currentCoin: ICoin | null;
}

const ChartComponent:React.FC<IChartComponent> = ({id,currentCoin}) => {
 const dispatch = useDispatch()
  const [selectedInterval, setSelectedInterval] =useState('d1')
  const { data } = useGetCoinHistoryQuery({id,int: selectedInterval});
  const historyCoin = useSelector((state: RootState) => state.history.historyCoin)

  useEffect(() => {
    if (data) {
      dispatch(setCoinHistory(data.data));
    }
  }, [data, dispatch])

  const handleIntervalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInterval(event.target.value)
  }


  return (
    <div >Chart
      <div>
        <select 
       value={selectedInterval} onChange={handleIntervalChange}
        > 
          <option value="d1">24 Hours</option>
          <option value="h12">12 Hours</option>
          <option value="h1">1 Hour</option>
        </select>
      </div>
    </div>
  );
}

export default ChartComponent;