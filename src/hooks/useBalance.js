import { useState, useEffect } from 'react'
import { useAddress } from './useAddress'
import { useChainId } from './useChainId'
import { chainImplementations } from '../chains'

export const useBalance = () => {
  const [address] = useAddress()
  const [balance, setBalance] = useState('0')
  const [chainId] = useChainId()

  useEffect(() => {
    if (!address) return
    if (!chainImplementations[chainId]) return

    chainImplementations[chainId]
      .dashboard
      .getYourPINTBalance({ addressToCheck: address })
      .then(setBalance)
  }, [address, chainId])

  return [balance]
}

