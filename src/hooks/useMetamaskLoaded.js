import { useState, useEffect } from 'react'

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const waitForMetamaskToLoad = async (tries = 0) => {
  if (window.ethereum) return true

  if (tries < 5) {
    await wait(500)
    return await waitForMetamaskToLoad(tries + 1)
  }

  return false
}

export const useMetamaskLoaded = () => {
  const [metamaskLoaded, setMetamaskLoaded] = useState(false)

  useEffect(() => {
    waitForMetamaskToLoad().then(setMetamaskLoaded)
  }, [])

  return [metamaskLoaded]
}
