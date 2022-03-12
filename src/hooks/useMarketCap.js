import { useState, useEffect } from 'react'
import { chainImplementations } from '../chains'
import { useChainId } from './useChainId'

export const useMarketCap = () => {
  const [marketCap, setMarketCap] = useState('')
  const [chainId] = useChainId()

  useEffect(() => {
    if (!chainImplementations[chainId]) return

    chainImplementations[chainId]
      .dashboard
      .getMarketCap()
      .then(setMarketCap)
  }, [chainId])

  return [marketCap]
}

