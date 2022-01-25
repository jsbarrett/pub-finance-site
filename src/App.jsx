import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'
import './App.css'

import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { VaultPage } from './pages/VaultPage'
import { DashboardPage } from './pages/DashboardPage'
import { CommunityPage } from './pages/CommunityPage'
import { SideNav } from './components/SideNav'
import { useAddress } from './hooks/useAddress'
import { WalletDetails } from './Wallet'

// web3 or ether.js
// rinkeby
// hardhat
// web3/truffle
// ether.js/waffle
// infura (swap out web3)
//
// have two instances of web3
// -- gets use infura
// -- sets use metamask/ethereum

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const WalletButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{ background: 'rgb(12,12,97)' }}
      className='absolute z-30 px-8 py-2 text-lg font-bold text-white cursor-pointer right-4 top-24 xl:top-8 rounded-xl'>
      Wallet
    </div>
  )
}

const addChainChangedListener = () => {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', _chainId => {
      window.location.reload()
    })
  }
}

const Unlock = async ({ address, setAddress }) => {
  if (address) return

  // TODO: check if connected to mainnet
  try {
    if (!window.ethereum) return alert('Please install metamask, and try again')

    if (!address) {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    }

    const [accountAddress] = await window.ethereum.request({ method: 'eth_accounts' })
    setAddress(accountAddress)
  } catch (err) {
    console.error(err)
    alert('Sorry there was a problem unlocking your wallet, please try refreshing and trying again')
  }
}

const UnlockWallet = ({ address, setAddress, setModalIsOpen }) => {
  return (
    <div className='fixed inset-0 z-50 w-full pointer-events-none'>
      <div
        onClick={() => setModalIsOpen(false)}
        className='absolute inset-0 bg-gray-900 pointer-events-auto opacity-80'>
      </div>
      <div
        className='relative flex items-center justify-center w-11/12 p-8 mx-auto text-center text-white bg-blue-500 shadow-2xl pointer-events-auto point-events-auto rounded-2xl my-36 md:w-8/12 xl:w-4/12'
        style={{ background: 'rgb(12,12,97)' }}>
        <div className='text-xl font-bold'>
          <button
            onClick={() => setModalIsOpen(false)}
            className='px-4 py-2 border border-solid rounded border-accent-green'>
            Cancel
          </button>
        </div>
        <div className='ml-4 text-xl font-bold'>
          <button
            className='px-4 py-2 text-black border border-solid rounded bg-accent-green border-accent-green'
            onClick={() => Unlock({ address, setAddress })}>
            Unlock Wallet
          </button>
        </div>
      </div>
    </div>
  )
}

const WalletModal = ({ modalIsOpen, setModalIsOpen }) => {
  const [address, setAddress] = useAddress()

  if (!modalIsOpen) return null

  if (!address) return <UnlockWallet address={address} setAddress={setAddress} setModalIsOpen={setModalIsOpen} />

  return <WalletDetails address={address} setModalIsOpen={setModalIsOpen} />
}

export const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    if (!window.ethereum) {
      alert(`Most of this site's functionality requires the use of the Metamask extension, please install it if you wish to get the most from this site`)
    }

    setTimeout(() => { addChainChangedListener() }, 500)
  }, [])

  return (
    <Router>
      <ScrollToTop />

      <div className='flex flex-col xl:flex-row'>
        <WalletButton onClick={() => setModalIsOpen(!modalIsOpen) }/>

        <SideNav />

        <WalletModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />

        <main className='relative flex-grow mt-20 xl:mt-0 xl:ml-16'>
          <Switch>
            <Route path='/about'><AboutPage /></Route>
            <Route path='/vaults'><VaultPage /></Route>
            <Route path='/dashboard'><DashboardPage /></Route>
            <Route path='/community'><CommunityPage /></Route>
            <Route path='/'><HomePage /></Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
