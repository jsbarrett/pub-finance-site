import { EthereumDashboard } from './EthereumDashboard'
import * as EthereumVault from './EthereumVault'
import { EthereumWallet } from './EthereumWallet'

export const dashboard = EthereumDashboard
export const vault = EthereumVault
export const wallet = EthereumWallet
export const details = {
  chainId: '0x1',
  name: 'ethereum',
  abbreviation: 'ETH',
  logo: {
    src: 'eth-diamond-purple.png',
    alt: 'Ethereum logo',
  },
  sendingTo: {
    chainId: `0x${(43114).toString(16)}`,
    name: 'Avalanche',
    abbreviation: 'AVAX',
    logo: {
      src: 'Avalanche_AVAX_RedWhite.svg',
      alt: 'Avalanche logo',
    },
  }
}
