import { FujiDashboard } from './FujiDashboard'
import * as FujiVault from './FujiVault'
import { FujiWallet } from './FujiWallet'

export const dashboard = FujiDashboard
export const vault = FujiVault
export const wallet = FujiWallet
export const details = {
  chainId: `0x${(43113).toString(16)}`,
  chainName: 'fuji',
  abbreviation: 'FUJI',
  logo: {
    src: 'Avalanche_AVAX_RedWhite.svg',
    alt: 'Avalanche logo',
  },
  sendingTo: {
    chainId: `0x${(97).toString(16)}`,
    name: 'binancetest',
    abbreviation: 'BSCTEST',
    logo: {
      src: 'binance-logo.svg',
      alt: 'binance logo',
    }
  }
}


