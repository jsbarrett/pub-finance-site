import { useState, useEffect } from 'react'
import { useMetamaskLoaded } from './useMetamaskLoaded'

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const waitForChainIdToLoad = async (tries = 0) => {
  if (window.ethereum.chainId) return true

  if (tries < 5) {
    await wait(200)
    return await waitForChainIdToLoad(tries + 1)
  }

  return false
}

export const useChainId = () => {
  const [chainId, setChainId] = useState()
  const [metamaskLoaded] = useMetamaskLoaded()

  useEffect(() => {
    if (!metamaskLoaded) return

    waitForChainIdToLoad()
      .then(() => setChainId(window.ethereum.chainId))
  }, [metamaskLoaded])

  return [chainId]
}



