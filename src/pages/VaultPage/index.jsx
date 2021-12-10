import React, { useState, useEffect } from 'react'
import { EthereumVault } from './EthereumVault'
import { NoVault } from './NoVault'
import { FujiVault } from './FujiVault'
import { chainIds } from '../../chainConfig'

const addChainChangedListener = () => {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', _chainId => {
      window.location.reload()
    })
  }
}

export const VaultPage = () => {
  const [chainId, setChainId] = useState(window.ethereum.chainId)

  useEffect(() => {
    // timeout is just in case metamask wasn't done loading
    setTimeout(() => {
      addChainChangedListener()
      setChainId(window.ethereum.chainId)
    }, 500)
  }, [])

  switch (chainId) {
    case chainIds.ethereum: return <EthereumVault />
    case chainIds.fuji: return <FujiVault />
    default: return <NoVault />
  }
}
