import { BinanceTestDashboard } from './BinanceTestDashboard'
import * as BinanceTestVault from './BinanceTestVault'
import { BinanceTestWallet } from './BinanceTestWallet'

export const dashboard = BinanceTestDashboard
export const vault = BinanceTestVault
export const wallet = BinanceTestWallet

export const details = {
  chainId: `0x${(97).toString(16)}`,
  name: 'binancetest',
  abbreviation: 'BSCTEST',
  pubAddress: '0x6DbcC67369c9F3D1CB75B07aAC421c6E9700C62d',
  logo: {
    src: 'binance-logo.svg',
    alt: 'binance logo',
  },
  sendingTo: {
    chainId: `0x${(43113).toString(16)}`,
    chainName: 'fuji',
    abbreviation: 'FUJI',
    pubAddress: '0xeC104B9cA585c73D38b87397Cd3B34417Be0EDf6',
    logo: {
      src: 'Avalanche_AVAX_RedWhite.svg',
      alt: 'Avalanche logo',
    }
  }
}

