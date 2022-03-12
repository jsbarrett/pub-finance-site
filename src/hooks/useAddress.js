import { useState, useEffect } from 'react'
import { useMetamaskLoaded } from './useMetamaskLoaded'

export const useAddress = () => {
  const [address, setAddress] = useState()
  const [metamaskLoaded] = useMetamaskLoaded()

  useEffect(() => {
    if (address) return

    async function effect () {
      if (!metamaskLoaded) return

      window.ethereum.on('accountsChanged', accounts => setAddress(accounts[0]))
      if (window.ethereum.selectedAddress) return setAddress(window.ethereum.selectedAddress)
      const [accountAddress] = await window.ethereum.request({ method: 'eth_accounts' })

      setAddress(accountAddress)
    }

    effect()
  }, [metamaskLoaded, address])

  return [address, setAddress]
}

