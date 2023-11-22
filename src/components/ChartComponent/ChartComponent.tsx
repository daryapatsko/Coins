import React, { useState, useEffect, useRef } from 'react';
import { RootState, setCoinHistory } from '../../store/store';
import { useGetCoinHistoryQuery } from '../../actions/actions';
import { ICoin } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { Chart } from 'chart.js/auto';
import styles from '../../styles/Chart.module.scss'


interface IChartComponent {
  id: string | undefined,
  currentCoin: ICoin | null;
}
interface IHistoryCoin {
  circulatingSupply?: string,
  date?: string,
  priceUsd: string,
  time: number,
}


const ChartComponent: React.FC<IChartComponent> = ({ id }) => {

  const dispatch = useDispatch()
  const [selectedInterval, setSelectedInterval] = useState('d1')
  const { data } = useGetCoinHistoryQuery({ id, int: selectedInterval });
  const historyCoin = useSelector((state: RootState) => state.history.historyCoin)
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  let formattedData: { date: string, price: string }[]
 
  if (selectedInterval === 'd1') {
    formattedData = historyCoin.slice(-24 * 12)
      .map((item: IHistoryCoin) => {
        const date = new Date(item.time).toLocaleDateString('en-US', { hour: 'numeric', hour12: false, minute: 'numeric' }); // Format timestamp to date string
        const price = Number(item.priceUsd).toFixed(2);
        return { date, price }
      })
  }else if (selectedInterval === 'h12') {
    formattedData = historyCoin.slice(-12 * 12)
      .map((item: IHistoryCoin) => {
        const date = new Date(item.time).toLocaleDateString('en-US', { hour: 'numeric', hour12: false, minute: 'numeric' }); // Format timestamp to date string
        const price = Number(item.priceUsd).toFixed(2);
        return { date, price }
      })
    }else if (selectedInterval === 'h1') {
      formattedData = historyCoin.slice(-60)
        .map((item: IHistoryCoin) => {
          const min = new Date(item.time).toLocaleDateString('en-US', { hour: 'numeric', hour12: false, minute: 'numeric' }); // Format timestamp to date string
          const price = Number(item.priceUsd).toFixed(2);
          return { date: min, price }
        })
      }
 

  useEffect(() => {
    if (data && chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: formattedData.map((data) => data.date),
          datasets: [{
            label: 'Price',
            data: formattedData.map((data) => data.price),
            borderWidth: 1,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      return () => {
        chartInstance.destroy()
      }
    }
  }, [data, historyCoin])

  useEffect(() => {
    if (data) {
      dispatch(setCoinHistory(data.data));
    }
  }, [data, dispatch])

  const handleIntervalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInterval(event.target.value)
  }


  return (
    <div className={styles.chart__container}>Chart
      <div >
        <select
          value={selectedInterval} onChange={handleIntervalChange}
        >
          <option value="d1">24 Hours</option>
          <option value="h12">12 Hours</option>
          <option value="h1">1 Hour</option>
        </select>
      </div>
      <canvas id='myChart' width='300' height='400' ref={chartRef} />
    </div>
  );
}

export default ChartComponent;