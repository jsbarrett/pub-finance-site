import { getYourPINTBalance } from '../getYourPINTBalance'
import {
  getHistoricalData,
  getTotalValueLockedCardData,
  getOtherCardData,
  getMarketCap
} from '../getStats'

export const EthereumDashboard = {
  getHistoricalData,
  getTotalValueLockedCardData,
  getOtherCardData,
  getMarketCap,
  getYourPINTBalance: async ({ addressToCheck }) => {
    const currentChain = `0x${(1).toString(16)}`
    const currentChainToken = '0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462'
    const otherChain = `0x${(43114).toString(16)}`
    const otherChainToken = ''

    return getYourPINTBalance({
      currentChain,
      currentChainToken,
      otherChain,
      otherChainToken,
      addressToCheck
    })
  }
}
