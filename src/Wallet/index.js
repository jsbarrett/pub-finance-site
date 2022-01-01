import { chainIds } from '../chainConfig.js'
import { EthereumWallet } from './EthereumWallet'
import { FujiWallet } from './FujiWallet'
import { BinanceTestWallet } from './BinanceTestWallet'

export const Wallet = () => {
  switch (window.ethereum.chainId) {
    case chainIds.ethereum: return EthereumWallet
    case chainIds.fuji: return FujiWallet
    case chainIds.binancetest: return BinanceTestWallet
    default: return {
      getPubBalance: async () => '---',
      getLPBalance: async () => '---'
    }
  }
}

