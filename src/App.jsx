import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import './App.css'

import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { VaultPage } from './pages/VaultPage'
import { DashboardPage } from './pages/DashboardPage'
import { CommunityPage } from './pages/CommunityPage'
import { SideNav } from './components/SideNav'

const Web3 = require('web3')
const PubAbi = require('./PubToken.json').abi

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

const Wallet = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{ background: 'rgb(12,12,97)' }}
      className='cursor-pointer text-lg absolute right-4 top-24 xl:top-8 z-30 text-white py-2 rounded-xl px-8 font-bold'>
      Wallet
    </div>
  )
}

const WalletDetails = ({ address, setModalIsOpen, setAddress }) => {
  const [balance, setBalance] = useState('---')

  useEffect(() => {
    if (!address) return

    async function effect () {
      const PubAddress = process.env.REACT_APP_PUB_ADDRESS

      const w3 = new Web3(window.ethereum)
      const PubContract = new w3.eth.Contract(PubAbi, PubAddress)

      const balance = (new BigNumber(await PubContract.methods.balanceOf(address).call()))
        .dividedBy(new BigNumber(10).pow(18))
        .toFormat(2)

      setBalance(balance)
    }

    effect()
  }, [address])

  return (
    <div className='fixed inset-0 z-50 w-full pointer-events-none'>
      <div
        className='text-white rounded-2xl shadow-2xl bg-blue-500 p-8 my-36 w-11/12 md:w-8/12 xl:w-4/12 mx-auto pointer-events-auto flex justify-center flex-col text-center'
        style={{ background: 'rgb(12,12,97)' }}>
        <div className='text-4xl font-bold'>My Account</div>
        <div className='mt-8'>
          <div className='font-bold text-5xl'>
            {balance}
          </div>
          <div>
            PINT Balance
          </div>
        </div>
        <div className='flex flex-wrap mt-8 justify-center items-center'>
          <button
            onClick={() => setModalIsOpen(false)}
            className='w-full sm:w-auto mt-2 border border-solid border-accent-green px-4 py-2 rounded'>
            Cancel
          </button>

          <a
            className='w-full sm:w-auto mt-2 sm:ml-2 border border-solid border-accent-green bg-accent-green text-black px-4 py-2 rounded'
            href={`https://etherscan.io/address/${address}`}
            target='_blank'
            rel='noreferrer'>
            View on Etherscan
          </a>
        </div>
      </div>
    </div>
  )
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
        className='text-white rounded-2xl shadow-2xl bg-blue-500 p-8 my-36 w-11/12 md:w-8/12 xl:w-4/12 mx-auto pointer-events-auto flex justify-center flex text-center items-center'
        style={{ background: 'rgb(12,12,97)' }}>
        <div className='text-xl font-bold'>
          <button
            onClick={() => setModalIsOpen(false)}
            className='border border-solid border-accent-green rounded py-2 px-4'>
            Cancel
          </button>
        </div>
        <div className='ml-4 text-xl font-bold'>
          <button
            className='bg-accent-green text-black border border-solid border-accent-green rounded py-2 px-4'
            onClick={() => Unlock({ address, setAddress })}>
            Unlock Wallet
          </button>
        </div>
      </div>
    </div>
  )
}

const WalletModal = ({ modalIsOpen, setModalIsOpen }) => {
  const [address, setAddress] = useState()
  if (!modalIsOpen) return null

  if (!address) return <UnlockWallet address={address} setAddress={setAddress} setModalIsOpen={setModalIsOpen} />

  return <WalletDetails address={address} setAddress={setAddress} setModalIsOpen={setModalIsOpen} />
}

export const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <Router>
      <ScrollToTop />

      <div className='flex flex-col xl:flex-row'>
        <Wallet onClick={() => setModalIsOpen(!modalIsOpen) }/>

        <SideNav />

        <WalletModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />

        <main className='flex-grow mt-20 xl:mt-0 xl:ml-16 relative'>
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
