import React, { useState, useEffect } from 'react'
import { PageFooter } from '../components/PageFooter'
import { SectionPadding } from '../components/SectionPadding'
import { HeaderBackground } from '../components/HeaderBackground'
import { EthereumLogoSvg } from '../components/EthereumLogoSvg'
import pintGearLogoUrl from '../pint-gear-logo.svg'
// import BigNumber from 'bignumber.js'

const Web3 = require('web3')
const BartenderAbi = require('../Bartender.json')

const unlockWallet = async (setAddress) => {
  // TODO: check if connected to mainnet
  try {
    if (!window.ethereum) return alert('Please install metamask, and try again')

    const [accountAddress] = await window.ethereum.request({ method: 'eth_accounts' })
    if (accountAddress) return setAddress(accountAddress)

    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const [address] = await window.ethereum.request({ method: 'eth_accounts' })
    setAddress(address)
  } catch (err) {
    console.error(err)
    alert('Sorry there was a problem unlocking your wallet, please try refreshing and trying again')
  }
}

// TODO: make "harvest" button disabled when nothing to harvest
// TODO: make wallet lock/unlock state global

// const stake = async ({ address, amount, pid }) => {
//   const BartenderAddress = process.env.REACT_APP_BARTENDER_ADDRESS

//   const w3 = new Web3(window.ethereum)
//   const bartenderContract = new w3.eth.Contract(BartenderAbi, BartenderAddress)

//   return await bartenderContract.methods
//     .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
//     .send({ from: address })
//     .on('transactionHash', transaction => transaction.transactionHash)
// }

// const unStake = async ({ address, amount, pid }) => {
//   const BartenderAddress = process.env.REACT_APP_BARTENDER_ADDRESS

//   const w3 = new Web3(window.ethereum)
//   const bartenderContract = new w3.eth.Contract(BartenderAbi, BartenderAddress)

//   return await bartenderContract.methods
//     .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
//     .send({ from: address })
//     .on('transactionHash', transaction => transaction.transactionHash)
// }

// const harvest = async ({ pid, address }) => {
//   const BartenderAddress = process.env.REACT_APP_BARTENDER_ADDRESS

//   const w3 = new Web3(window.ethereum)
//   const bartenderContract = new w3.eth.Contract(BartenderAbi, BartenderAddress)

//   return await bartenderContract.methods
//     .deposit(pid, '0')
//     .send({ from: address })
//     .on('transactionHash', transaction => transaction.transactionHash)
// }

// const approve = async ({ lpContract, address }) => {
//   const BartenderAddress = process.env.REACT_APP_BARTENDER_ADDRESS

//   const w3 = new Web3(window.ethereum)
//   const bartenderContract = new w3.eth.Contract(BartenderAbi, BartenderAddress)

//   const maxUInt256 = 0

//   return lpContract.methods
//     .approve(bartenderContract.options.address, maxUInt256)
//     .send({ from: address })
// }

// const redeem = async ({ address }) => {
//   const now = new Date().getTime() / 1000
//   if (now < 1597172400) return alert('pool not active')

//   const BartenderAddress = process.env.REACT_APP_BARTENDER_ADDRESS

//   const w3 = new Web3(window.ethereum)
//   const bartenderContract = new w3.eth.Contract(BartenderAbi, BartenderAddress)

//   return await bartenderContract.methods
//     .exit()
//     .send({ from: address })
//     .on('transactionHash', transaction => transaction.transactionHash)
// }

export const VaultPage = () => {
  const [address, setAddress] = useState()
  const [pintEarned, setPintEarned] = useState()
  const [lockedPintEarned, setLockedPintEarned] = useState()
  const [tokensStaked, setTokensStaked] = useState()
  const [lockedTokensStaked, setLockedTokensStaked] = useState()

  useEffect(() => {
    if (!address) return

    async function effect () {
      const BartenderAddress = process.env.REACT_APP_BARTENDER_ADDRESS

      const w3 = new Web3(window.ethereum)
      const bartenderContract = new w3.eth.Contract(BartenderAbi, BartenderAddress)

      console.log('address', address)
      console.log('bartenderContract', bartenderContract)

      const pendingPubs = await bartenderContract.methods.pendingPubs(1, address).call()
      setPintEarned(pendingPubs)
      console.log('pendingPubs', pendingPubs)

      const pendingLockedPubs = await bartenderContract.methods.pendingLockedPubs(1, address).call()
      setLockedPintEarned(pendingLockedPubs)
      console.log('pendingLockedPubs', pendingLockedPubs)

      const userInfo = await bartenderContract.methods.getUserInfo(1, address).call()
      setTokensStaked(userInfo)
      console.log('userInfo', userInfo)

      const userInfoLocked = await bartenderContract.methods.getUserInfoLocked(1, address).call()
      setLockedTokensStaked(userInfoLocked)
      console.log('userInfoLocked', userInfoLocked)
    }

    effect()
  }, [address])

  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='text-white relative'>
      <header className='relative pt-36 xl:pt-48 pb-48 xl:pb-60 text-center flex flex-col items-center'>
        <HeaderBackground />
        <h1
          className='relative z-10 font-bold text-6xl xl:text-9xl leading-none'>
          Vaults
        </h1>
        <p className='relative z-10 text-2xl xl:text-5xl mt-10 xl:mt-16'>
          Flexible Deposits, Higher Profits.
        </p>
      </header>

      <SectionPadding>
        <section className='max-w-screen-2xl mx-auto mb-24 xl:mb-48'>
          <div className='flex justify-center mt-4'>
            <a href='https://app.uniswap.org/#/add/v2/ETH/0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462' target='_blank' rel='noreferrer'>
              <button className='text-gray-900 rounded-full px-12 py-6 font-bold bg-accent-green'>
                Add Liquidity
              </button>
            </a>

            <button
              onClick={() => unlockWallet(setAddress)}
              className='ml-4 rounded-full px-12 py-6 font-bold border border-solid border-accent-green'>
              Unlock Wallet
            </button>
          </div>
          <p className='mt-8 text-center'>
            (One-sided PINT staking. Coming soon!)
          </p>
          <div className='flex flex-col xl:flex-row justify-center mt-16 max-w-screen-lg mx-auto items-center'>
            <div
              className='px-8 py-6 m-2 text-center rounded-3xl shadow-xl w-full md:w-3/4 flex flex-col items-center justify-between'
              style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}>

              <div className='h-24 flex justify-center'>
                <img
                  className='w-32 h-24'
                  alt='Pints logo of a gear'
                  style={{ filter: 'invert(52%) sepia(95%) saturate(1036%) hue-rotate(64deg) brightness(123%) contrast(109%)' }}
                  src={pintGearLogoUrl} />
              </div>

              <div className='text-center leading-none text-gray-100 text-3xl mt-6'>PINT</div>

              <div className='mt-12'>
                <p className='text-5xl font-bold text-white'>
                  { (pintEarned || pintEarned === 0) ? pintEarned : '---' }
                </p>
                <div className='text-center leading-none text-gray-300 text-xl mt-4'>PINT Earned</div>
              </div>

              <div className='mt-8'>
                <p className='text-5xl font-bold text-white'>
                  { (lockedPintEarned || lockedPintEarned === 0) ? lockedPintEarned : '---' }
                </p>
                <div className='text-center leading-none text-gray-300 text-xl mt-4'>Locked PINT Earned</div>
              </div>

              {/* <Button */}
              {/*   disabled={!earnings.toNumber() || pendingTx} */}
              {/*   text={pendingTx ? 'Collecting PUB' : 'Harvest'} */}
              {/*   onClick={async () => { */}
              {/*     setPendingTx(true) */}
              {/*     await onReward() */}
              {/*     setPendingTx(false) */}
              {/*   }} */}
              {/* /> */}
              <div className='mt-12'>
                <button className='rounded-full px-12 py-4 font-bold border text-accent-green border-solid border-accent-green'>
                  Harvest
                </button>
              </div>
            </div>

            <div
              className='px-8 py-6 m-2 text-center rounded-3xl shadow-xl w-full md:w-3/4 flex flex-col items-center justify-between'
              style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}>

              <div className='h-24 flex justify-center'>
                <img
                  className='w-32 h-24'
                  alt='Pints logo of a gear'
                  style={{ filter: 'invert(52%) sepia(95%) saturate(1036%) hue-rotate(64deg) brightness(123%) contrast(109%)' }}
                  src={pintGearLogoUrl} />
                <div className='w-3/12'>
                  <EthereumLogoSvg />
                </div>
              </div>

              <div className='text-center leading-none text-gray-100 text-3xl mt-6'>ETH_PINT UNI-V2 LP</div>

              <div className='mt-12'>
                <p className='text-5xl font-bold text-white'>
                  { (tokensStaked || tokensStaked === 0) ? tokensStaked : '---' }
                </p>
                <div className='text-center leading-none text-gray-300 text-xl mt-4'>Tokens Staked</div>
              </div>

              <div className='mt-8'>
                <p className='text-5xl font-bold text-white'>
                  { (lockedTokensStaked || lockedTokensStaked === 0) ? lockedTokensStaked : '---' }
                </p>
                <div className='text-center leading-none text-gray-300 text-xl mt-4'>Locked Tokens Staked</div>
              </div>

              <div className='mt-12'>
                <button className='rounded-full px-12 py-4 font-bold border text-accent-green border-solid border-accent-green'>
                  Approve
                </button>
              </div>
            </div>
          </div>
          <p className='mt-8 text-center'>
            Every time you stake and unstake LP tokens, the contract will automagically harvest PINT rewards for you
          </p>
        </section>
      </SectionPadding>

      <PageFooter />
    </div>
  )
}

