import { chainImplementations } from '../chains/index'

export const Wallet = () => {
  const chainId = window.ethereum.chainId

  if (!chainImplementations[chainId]) return {
    getPubBalance: async () => '---',
    getLPBalance: async () => '---'
  }

  return chainImplementations[chainId].wallet
}

