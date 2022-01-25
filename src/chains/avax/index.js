import { AvaxDashboard } from './AvaxDashboard'
import * as AvaxVault from './AvaxVault'
import { AvaxWallet } from './AvaxWallet'

export const dashboard = AvaxDashboard
export const vault = AvaxVault
export const wallet = AvaxWallet
export const details = {
  chainId: `0x${(43114).toString(16)}`,
  name: 'Avalanche',
  abbreviation: 'AVAX',
  logo: {
    src: 'Avalanche_AVAX_RedWhite.svg',
    alt: 'Avalanche logo',
  },
  sendingTo: {
    chainId: `0x1`,
    name: 'Ethereum',
    abbreviation: 'ETH',
    logo: {
      src: 'eth-diamond-purple.png',
      alt: 'Ethereum logo',
    }
  }
}


