import { ReactNode } from "react";

export interface ICoin {
  changePercent24Hr: string,
  explorer: string,
  id: string,
  marketCapUsd: string,
  maxSupply: string,
  name: string,
  priceUsd: string,
  rank: string,
  supply: string,
  symbol: string,
  volumeUsd24Hr: string,
  vwap24Hr: string,
  count?: number,
}

export interface IButton {
  title?: string,
  onClick: () => void,
  customClass: string,
  children?: ReactNode;

}

export interface IBasketModalProps {
  setShowModal: (value: boolean) => void,
  setTotalPrice: (value: number) => void,
  totalPrice: number,
}

export interface IBasketCoin {
  id: string,
  name: string;
  priceUsd: number;
  count: number;
}

export interface ICountModal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>> ,
  coin: ICoin,
}

export interface IInput {
searchValue: string,
setSearchValue: React.Dispatch<React.SetStateAction<string>> ,
customClass?: string,
}