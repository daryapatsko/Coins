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
    const shopCoins = JSON.parse(localStorage.getItem('shopCoins') || '[]')

    const existingCoin = shopCoins.find((item: ICoin) => item.id === coin.id)
    const existingCoinIndex = shopCoins.findIndex((item: ICoin) => item.id === coin.id)

  if (existingCoinIndex !== -1) {
    shopCoins.splice(existingCoinIndex, 1) 
  }
    const coinItem = {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.priceUsd,
    }
    if (!existingCoin) {
        shopCoins.push(coinItem)
    }
    localStorage.setItem('shopCoins', JSON.stringify(shopCoins))
  
}