import { useState, useEffect } from 'react'
import { chainImplementations } from '../chains'
import { useChainId } from './useChainId'

export const useTotalValueLocked = () => {
  const [totalValueLocked, setTotalValueLocked] = useState('')
  const [chainId] = useChainId()

  useEffect(() => {
    if (!chainImplementations[chainId]) return

    chainImplementations[chainId]
      .dashboard
      .getTotalValueLockedCardData()
      .then(setTotalValueLocked)
  }, [chainId])

  return [totalValueLocked]
}

