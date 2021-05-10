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
const UniswapAbi = require('./UniswapAbi.json')

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
  const [liquidityPoolBalance, setLiquidityPoolBalance] = useState('---')

  useEffect(() => {
    if (!address) return

    async function effect () {
      const w3 = new Web3(window.ethereum)

      const PubAddress = process.env.REACT_APP_PUB_ADDRESS
      const PubContract = new w3.eth.Contract(PubAbi, PubAddress)

      const balance = (new BigNumber(await PubContract.methods.balanceOf(address).call()))
        .dividedBy(new BigNumber(10).pow(18))
        .toFormat(4)

      setBalance(balance)

      const UniswapAddress = process.env.REACT_APP_UNISWAP_ADDRESS
      const UniswapContract = new w3.eth.Contract(UniswapAbi, UniswapAddress)

      const lpBalance = (new BigNumber((await UniswapContract.methods.balanceOf(address).call())))
        .dividedBy(new BigNumber(10).pow(18))
        .toFormat(4)

      setLiquidityPoolBalance(lpBalance)
    }

    effect()
  }, [address])

  return (
    <div className='fixed inset-0 z-50 w-full pointer-events-none'>
      <div
        onClick={() => setModalIsOpen(false)}
        className='absolute pointer-events-auto inset-0 bg-gray-900 opacity-80'>
      </div>
      <div
        className='relative pointer-events-auto text-white rounded-2xl shadow-2xl bg-blue-500 p-8 my-36 w-11/12 md:w-6/12 xl:w-4/12 mx-auto pointer-events-auto flex justify-center flex-col text-center'
        style={{ background: 'rgb(12,12,97)' }}>
        <div className='mt-4 flex justify-center relative'>
          <div className='text-4xl font-bold'>My Account</div>
          <div
            onClick={() => setModalIsOpen(false)}
            className='text-4xl absolute right-0 cursor-pointer px-2'>
            X
          </div>
        </div>

        <div className='mt-12'>
          <div className='font-bold text-4xl'>
            {balance}
          </div>
          <div className='opacity-75'>
            PINT Balance
          </div>
        </div>

        <div className='mt-8'>
          <div className='font-bold text-4xl'>
            {liquidityPoolBalance}
          </div>
          <div className='opacity-75'>
            Balance in Liquidity Pool
          </div>
        </div>

        <div className='flex flex-wrap mt-12 justify-center items-center'>
          <a
            className='w-full mt-2 sm:ml-2 border border-solid border-accent-green bg-accent-green text-xl text-green-900 px-4 py-3 rounded-full font-bold'
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
        onClick={() => setModalIsOpen(false)}
        className='absolute pointer-events-auto inset-0 bg-gray-900 opacity-80'>
      </div>
      <div
        className='relative point-events-auto text-white rounded-2xl shadow-2xl bg-blue-500 p-8 my-36 w-11/12 md:w-8/12 xl:w-4/12 mx-auto pointer-events-auto flex justify-center flex text-center items-center'
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

  useEffect(() => {
    if (address) return

    async function effect () {
      if (!window.ethereum) return

      const [accountAddress] = await window.ethereum.request({ method: 'eth_accounts' })
      setAddress(accountAddress)
    }

    effect()
  }, [address])

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
