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

export const addToShopBag = (coin: ICoin): void => {
    let shopCoins:ICoin[] = JSON.parse(localStorage.getItem('shopCoins') || '[]')
    const existingCoinIndex = shopCoins.findIndex((item: ICoin) => item.id === coin.id)

  if (existingCoinIndex !== -1) {
    alert('coin in basket')
  } else{
    shopCoins.push(coin)
    updateShopCoins(shopCoins)
  }
}

export const closeModal = ({setShowModal}: { setShowModal: React.Dispatch<React.SetStateAction<boolean>> }): () => void => {
  return () => setShowModal(false)
 }

export  const calculateTotalPrice = (basketCoins: ICoin[]) => {
  let total = 0;
  for (const coin of basketCoins) {
    if (coin.count) {
      total += coin.count * Number(coin.priceUsd);
    }
  }
  return total
};

export const getShopCoins = (): ICoin[] => {
  return JSON.parse(localStorage.getItem('shopCoins') || '[]');
};


export const updateShopCoins = (updatedCoins: ICoin[]): void => {
  localStorage.setItem('shopCoins', JSON.stringify(updatedCoins));
}

