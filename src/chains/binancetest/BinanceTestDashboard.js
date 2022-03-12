import { getYourPINTBalance } from '../getYourPINTBalance'
import {
  getHistoricalData,
  getTotalValueLockedCardData,
  getOtherCardData,
  getMarketCap,
} from '../getStats'

export const BinanceTestDashboard = {
  getHistoricalData,
  getTotalValueLockedCardData,
  getOtherCardData,
  getMarketCap,
  getYourPINTBalance: async ({ addressToCheck }) => {
    const currentChain = `0x${(97).toString(16)}`
    const currentChainToken = '0x6DbcC67369c9F3D1CB75B07aAC421c6E9700C62d'
    const otherChain = `0x${(43113).toString(16)}`
    const otherChainToken = '0xeC104B9cA585c73D38b87397Cd3B34417Be0EDf6'

    return getYourPINTBalance({
      currentChain,
      currentChainToken,
      otherChain,
      otherChainToken,
      addressToCheck
    })
  },
}

