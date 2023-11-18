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
    updateShopCoins(shopCoins)
  }
}

export const closeModal = ({setShowModal}:any) => {
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

export const getShopCoins = () => {
  return JSON.parse(localStorage.getItem('shopCoins') || '[]');
};


export const updateShopCoins = (updatedCoins:ICoin[]) => {
  localStorage.setItem('shopCoins', JSON.stringify(updatedCoins));
}

// export const deleteItem = (id:string) => {
//   const shopCoins: ICoin[] = getShopCoins();
//   const coinIndex = shopCoins.findIndex((item) => item.id === id);

//   if (coinIndex !== -1) {
//     shopCoins.splice(coinIndex, 1);
//     updateShopCoins(shopCoins);
//     dispatch(setShopCoins(shopCoins))
//     // Refresh the basket modal
//     // Dispatch an action or update the state
//   }
// };