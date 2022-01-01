import React, { useState, useEffect } from 'react'
import * as EthereumVault from './EthereumVault'
import * as FujiVault from './FujiVault'
import * as BinanceTestVault from './BinanceTestVault'
import { NoVault } from './NoVault'
import { Vault } from './Vault'
import { chainIds } from '../../chainConfig'

export const VaultPage = () => {
  const [chainId, setChainId] = useState(window?.ethereum?.chainId)

  useEffect(() => {
    // timeout is just in case metamask wasn't done loading
    setTimeout(() => { setChainId(window?.ethereum?.chainId) }, 500)
  }, [])

  switch (chainId) {
    case chainIds.ethereum: return (
      <Vault
        stake={EthereumVault.stake}
        harvest={EthereumVault.harvest}
        unstake={EthereumVault.unstake}
        approve={EthereumVault.approve}
        getAPY={EthereumVault.getAPY}
        getVaultData={EthereumVault.getVaultData}
        lpTokenLabel={'ETH_PINT UNI-V2 LP'}
        addLiquidityLink={'https://app.uniswap.org/#/add/v2/ETH/0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462'}
      />
    )
    case chainIds.fuji: return (
      <Vault
        stake={FujiVault.stake}
        harvest={FujiVault.harvest}
        unstake={FujiVault.unstake}
        approve={FujiVault.approve}
        getAPY={FujiVault.getAPY}
        getVaultData={FujiVault.getVaultData}
        lpTokenLabel={'AVAX_PINT TJ LP'}
        addLiquidityLink={'https://traderjoexyz.com/'}
      />
    )
    case chainIds.binancetest: return (
      <Vault
        stake={BinanceTestVault.stake}
        harvest={BinanceTestVault.harvest}
        unstake={BinanceTestVault.unstake}
        approve={BinanceTestVault.approve}
        getAPY={BinanceTestVault.getAPY}
        getVaultData={BinanceTestVault.getVaultData}
        lpTokenLabel={'BNB_PINT ??? LP'}
        addLiquidityLink={'https://testnet.bscscan.com/'}
      />
    )
    default: return <NoVault />
  }
}
