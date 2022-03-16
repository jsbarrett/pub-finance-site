import { getYourPINTBalance } from '../getYourPINTBalance'
import {
  getHistoricalData,
  getTotalValueLockedCardData,
  getOtherCardData,
  getMarketCap,
} from '../getStats'

export const AvaxDashboard = {
  getHistoricalData,
  getTotalValueLockedCardData,
  getOtherCardData,
  getMarketCap,
  getYourPINTBalance: async ({ addressToCheck }) => {
    const currentChain = `0x${(43114).toString(16)}`
    const currentChainToken = '0x3Af0eB8BcBd4C4C6E26e309c4E47Af59Bad5FC2f'
    const otherChain = `0x${(1).toString(16)}`
    const otherChainToken = '0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462'

    return getYourPINTBalance({
      currentChain,
      currentChainToken,
      otherChain,
      otherChainToken,
      addressToCheck
    })
  },
}
