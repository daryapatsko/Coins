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
  setShowModal: (value: boolean) => void;
}

export interface IBasketCoin {
  id: string,
  name: string;
  priceUsd: number;
  count: number;
}
