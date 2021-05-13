import { useState, useEffect } from 'react'

export const useAddress = () => {
  const [address, setAddress] = useState()

  useEffect(() => {
    if (address) return

    async function effect () {
      if (!window.ethereum) return

      const [accountAddress] = await window.ethereum.request({ method: 'eth_accounts' })
      setAddress(accountAddress)

      window.ethereum.on('accountsChanged', accounts => setAddress(accounts[0]))
    }

    effect()
  }, [address])

  return [address, setAddress]
}

