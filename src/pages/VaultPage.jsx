import React, { useState, useEffect } from 'react'
import { PageFooter } from '../components/PageFooter'
import { SectionPadding } from '../components/SectionPadding'
import { HeaderBackground } from '../components/HeaderBackground'
import { EthereumLogoSvg } from '../components/EthereumLogoSvg'
import pintGearLogoUrl from '../pint-gear-logo.svg'
import BigNumber from 'bignumber.js'

const Web3 = require('web3')
const BartenderAbi = require('../Bartender.json')
const UniswapAbi = require('../UniswapAbi.json')

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
// TODO: make "unstake" button disabled when nothing to unstake
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

const getAllowance = async ({ address }) => {
  try {
    const UniswapAddress = process.env.REACT_APP_UNISWAP_ADDRESS
    const BartenderAddress = process.env.REACT_APP_BARTENDER_ADDRESS

    const w3 = new Web3(window.ethereum)
    const UniswapContract = new w3.eth.Contract(UniswapAbi, UniswapAddress)

    const allowance = await UniswapContract.methods
     .allowance(address, BartenderAddress)
     .call()

    return allowance
  } catch (err) {
    console.error(err)
    throw new Error('Problem getting allowance from Uniswap contract for given account')
  }
}

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

const handleChangeLockDuration = (setLockDuration) => (evt) => {
  setLockDuration(evt.target.value)
}

const handleChangeStakeAmount = (setStakeAmount, liquidityPoolBalance) => (evt) => {
  const amount = Number(evt.target.value)
  const poolBalance = Number(liquidityPoolBalance)

  if (amount > poolBalance) return setStakeAmount(poolBalance)
  if (amount === 0) return setStakeAmount('')

  setStakeAmount(amount)
}

const handleStake = () => {
}

const StakingModal = ({ uiState, setUiState, liquidityPoolBalance }) => {
  const [lockDuration, setLockDuration] = useState('None')
  const [stakeAmount, setStakeAmount] = useState('')

  return (uiState === 'STAKING') ? (
    <div className='fixed inset-0 z-50 w-full pointer-events-none'>
      <div
        onClick={() => setUiState('NOTHING')}
        className='absolute pointer-events-auto inset-0 bg-gray-900 opacity-80'>
      </div>
      <div
        style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}
        className='pointer-events-auto shadow-2xl rounded-2xl text-white fixed inset-1/2 z-20 w-6/12 max-w-md h-3/6 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='p-12'>
          <div className='flex justify-between text-2xl'>
            <h2>Stake PINT</h2>
            <div
              onClick={() => setUiState('NOTHING')}
              className='px-2 cursor-pointer'>
              X
            </div>
          </div>

          <div className='flex flex-col items-start mt-4'>
            <div className='flex text-sm w-full justify-start items-center'>
              <div className='opacity-75'>Current Balance:</div>
              <div className='ml-2 font-bold'>{liquidityPoolBalance || '0.0000'}</div>
            </div>

            <div className='mt-16 w-full rounded-full px-4 overflow-hidden bg-white flex'>
              <input
                className='text-black h-full w-full px-1 py-3 ml-1'
                placeholder='Enter Amount'
                onChange={handleChangeStakeAmount(setStakeAmount, liquidityPoolBalance)}
                value={stakeAmount} />

              <div className='text-black flex items-center ml-2'>
                PINT
              </div>

              <div className='my-1 mx-2 border-l border-solid border-gray-300'></div>

              <div
                onClick={() => setStakeAmount(liquidityPoolBalance)}
                className='text-green-800 cursor-pointer flex items-center'>
                Max
              </div>
            </div>

            <div className='flex w-full justify-between mt-8 items-center'>
              <div className='text-lg font-bold'>Lock Duration:</div>
              <div className='flex-grow ml-4'>
                <select
                  onChange={handleChangeLockDuration(setLockDuration)}
                  value={lockDuration}
                  className='bg-transparent w-full px-2 py-1 font-bold text-lg border border-solid border-white rounded'>
                  <option className='bg-white text-black'>None</option>
                  <option className='bg-white text-black'>Three Days</option>
                </select>
              </div>
            </div>

            <div className='mt-20 w-full'>
              <button
                onClick={handleStake()}
                className='w-full py-2 px-4 text-xl font-bold bg-accent-green text-green-900 border border-solid border-accent-green rounded-full'>
                Stake
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

const UnlockWalletButton = ({ unlockWallet, setAddress, address }) => {
  return (!address)
    ? (
      <button
        onClick={() => unlockWallet(setAddress)}
        className='ml-4 rounded-full px-12 py-6 font-bold border border-solid border-accent-green'>
        Unlock Wallet
      </button>
    )
    : null
}

const UnstakeButton = ({ tokensStaked, lockedTokensStaked }) => {
  return (!!Number(tokensStaked) || !!Number(lockedTokensStaked))
    ? (
      <button className='rounded-full px-12 py-4 font-bold border text-accent-green border-solid border-accent-green'>
        Unstake
      </button>
    )
    : (
      <button className='rounded-full cursor-not-allowed opacity-30 px-12 py-4 font-bold border text-accent-green border-solid border-accent-green'>
        Unstake
      </button>
    )
}

const HarvestButton = ({ pintEarned, lockedPintEarned }) => {
  return (!!Number(pintEarned) || !!Number(lockedPintEarned))
    ? (
      <button className='rounded-full px-12 py-4 font-bold border text-accent-green border-solid border-accent-green'>
        Harvest
      </button>
    )
    : (
      <button className='rounded-full cursor-not-allowed opacity-30 px-12 py-4 font-bold border text-accent-green border-solid border-accent-green'>
        Harvest
      </button>
    )
}

export const VaultPage = () => {
  const [address, setAddress] = useState()
  const [pintEarned, setPintEarned] = useState()
  const [lockedPintEarned, setLockedPintEarned] = useState()
  const [tokensStaked, setTokensStaked] = useState()
  const [lockedTokensStaked, setLockedTokensStaked] = useState()
  const [allowance, setAllowance] = useState()
  const [liquidityPoolBalance, setLiquidityPoolBalance] = useState()
  const [uiState, setUiState] = useState('NOTHING')

  // const states = [
  //   'NOTHING',
  //   'STAKING',
  //   'UNSTAKING',
  //   'HARVESTING',
  // ]

  useEffect(() => {
    if (address) return

    async function effect () {
      if (!window.ethereum) return

      const [accountAddress] = await window.ethereum.request({ method: 'eth_accounts' })
      setAddress(accountAddress)
    }

    effect()
  }, [address])

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

      const allowance = await getAllowance({ address })
      setAllowance(allowance)
      console.log('allowance', allowance)

      const UniswapAddress = process.env.REACT_APP_UNISWAP_ADDRESS
      const UniswapContract = new w3.eth.Contract(UniswapAbi, UniswapAddress)

      const lpBalance = (new BigNumber((await UniswapContract.methods.balanceOf(address).call())))
        .dividedBy(new BigNumber(10).pow(18))
        .toFormat()

      setLiquidityPoolBalance(lpBalance)
    }

    effect()
  }, [address])

  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='text-white relative'>
      <StakingModal uiState={uiState} setUiState={setUiState} liquidityPoolBalance={liquidityPoolBalance} />
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

            <UnlockWalletButton unlockWallet={unlockWallet} setAddress={setAddress} address={address} />
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
                <HarvestButton pintEarned={pintEarned} lockedPintEarned={lockedPintEarned} />
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
                { !allowance ? (
                <button className='rounded-full px-12 py-4 font-bold border text-accent-green border-solid border-accent-green'>
                  Approve
                </button>
                ) : (
                <div>
                  <UnstakeButton tokensStaked={tokensStaked} lockedTokensStaked={lockedTokensStaked} />

                  <button
                    onClick={() => setUiState('STAKING')}
                    className='ml-4 rounded-full px-6 py-4 font-bold border text-accent-green border-solid border-accent-green'>
                    +
                  </button>
                </div>
                ) }
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

