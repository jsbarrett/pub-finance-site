import { useState, useEffect } from 'react'
import { chainImplementations } from '../chains'
import { useChainId } from './useChainId'

export const useHistoricalData = () => {
  const [historicalData, setHistoricalData] = useState([])
  const [chainId] = useChainId()

  useEffect(() => {
    if (!chainImplementations[chainId]) return

    chainImplementations[chainId]
      .dashboard
      .getHistoricalData()
      .then(setHistoricalData)
  }, [chainId])

  return [historicalData]
}


