import { ICoin } from "../interfaces";

export function shortNum(value: string) {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    let suffixInd = 0;
    let numValue = Number(value)
    while (numValue >= 1000 && suffixInd < suffixes.length - 1) {
        numValue /= 1000;
        suffixInd++
    }
    return numValue.toFixed(2) + suffixes[suffixInd]
}

export const addToShopBag = (coin: ICoin) => {
    let shopCoins:ICoin[] = JSON.parse(localStorage.getItem('shopCoins') || '[]')
    const existingCoinIndex = shopCoins.findIndex((item: ICoin) => item.id === coin.id)

  if (existingCoinIndex !== -1) {
    alert('coin in basket')
  } else{
    shopCoins.push(coin)
  }
    updateLocalStorage(shopCoins)
}

export const updateLocalStorage = (shopCoins: ICoin[]) =>{
    localStorage.setItem('shopCoins', JSON.stringify(shopCoins))
}

export const getShopCoins = () => {
  return JSON.parse(localStorage.getItem('shopCoins') || '[]');
};

export const closeModal = ({setShowModal}:any) => {
 return () => setShowModal(false)
}


