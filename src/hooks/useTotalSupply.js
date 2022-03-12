import { useState, useEffect } from 'react'
import { chainImplementations } from '../chains'
import { useChainId } from './useChainId'

export const useTotalSupply = () => {
  const [totalSupply, setTotalSupply] = useState('')
  const [chainId] = useChainId()

  useEffect(() => {
    if (!chainImplementations[chainId]) return

    chainImplementations[chainId]
      .dashboard
      .getOtherCardData()
      .then(x => x.market_data.total_supply.toLocaleString())
      .then(setTotalSupply)
  }, [chainId])

  return [totalSupply]
}

