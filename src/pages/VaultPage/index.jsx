import React, { useState, useEffect } from 'react'
import { NoVault } from './NoVault'
import { Vault } from './Vault'
import { chainImplementations } from '../../chains/index'

export const VaultPage = () => {
  const [chainId, setChainId] = useState(window?.ethereum?.chainId)

  useEffect(() => {
    // timeout is just in case metamask wasn't done loading
    setTimeout(() => { setChainId(window?.ethereum?.chainId) }, 500)
  }, [])

  if (!chainImplementations[chainId]) return <NoVault />

  return (
    <Vault
      stake={chainImplementations[chainId].vault.stake}
      harvest={chainImplementations[chainId].vault.harvest}
      unstake={chainImplementations[chainId].vault.unstake}
      approve={chainImplementations[chainId].vault.approve}
      getAPY={chainImplementations[chainId].vault.getAPY}
      getVaultData={chainImplementations[chainId].vault.getVaultData}
      lpTokenLabel={chainImplementations[chainId].vault.lpTokenLabel}
      addLiquidityLink={chainImplementations[chainId].vault.addLiquidityLink}
    />
  )
}
