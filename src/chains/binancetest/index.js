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
  logo: {
    src: 'binance-logo.svg',
    alt: 'binance logo',
  },
  sendingTo: {
    chainId: `0x${(43113).toString(16)}`,
    chainName: 'fuji',
    abbreviation: 'FUJI',
    logo: {
      src: 'Avalanche_AVAX_RedWhite.svg',
      alt: 'Avalanche logo',
    }
  }
}

