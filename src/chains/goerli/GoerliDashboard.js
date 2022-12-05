import { getYourPINTBalance } from '../getYourPINTBalance'
import {
  getHistoricalData,
  getTotalValueLockedCardData,
  getOtherCardData,
  getMarketCap,
} from '../getStats'

export const GoerliDashboard = {
  getHistoricalData,
  getTotalValueLockedCardData,
  getOtherCardData,
  getMarketCap,
  getYourPINTBalance: async ({ addressToCheck }) => {
    const currentChain = `0x${(5).toString(16)}`
    const currentChainToken = ''
    const otherChain = ``
    const otherChainToken = ''

    return getYourPINTBalance({
      currentChain,
      currentChainToken,
      otherChain,
      otherChainToken,
      addressToCheck
    })
  },
}
