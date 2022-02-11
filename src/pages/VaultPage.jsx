import React, { useState, useEffect, useCallback } from 'react'
import { PageFooter } from '../components/PageFooter'
import { SectionPadding } from '../components/SectionPadding'
import { HeaderBackground } from '../components/HeaderBackground'
import { EthereumLogoSvg } from '../components/EthereumLogoSvg'
import { useAddress } from '../hooks/useAddress'
import pintGearLogoUrl from '../pint-gear-logo.svg'
import BigNumber from 'bignumber.js'

const Web3 = require('web3')
const BartenderAbi = require('../Bartender.json')
const UniswapAbi = require('../UniswapAbi.json')
// const wethAbi = require('../weth.json')
// const PubAbi = require('../PubToken.json').abi
// const ERC20Abi = require('../erc20.json')

//-----------------------------------------------------------------------------
// SMART CONTRACT METHODS
//-----------------------------------------------------------------------------

const infuraEndpoint = process.env.REACT_APP_INFURA_ENDPOINT
const BartenderAddress = process.env.REACT_APP_BARTENDER_ADDRESS
const UniswapAddress = process.env.REACT_APP_UNISWAP_ADDRESS
// const PubAddress = process.env.REACT_APP_PUB_ADDRESS
// const WethAddress = process.env.REACT_APP_WETH_ADDRESS

const w3 = new Web3(window.ethereum)
const infura = new Web3(new Web3.providers.HttpProvider(infuraEndpoint))

// const ERC20Contract = new w3.eth.Contract(ERC20Abi, PubAddress)
const UniswapContract = new w3.eth.Contract(UniswapAbi, UniswapAddress)
const bartenderContract = new w3.eth.Contract(BartenderAbi, BartenderAddress)
const bartenderContractReads = new infura.eth.Contract(BartenderAbi, BartenderAddress)
// const pubContract = new w3.eth.Contract(PubAbi, PubAddress)
// const wethContract = new w3.eth.Contract(wethAbi, WethAddress)

// lockType is enum 0 = no lock, 1 = 3 days, 2 = week, 3 = month, 4 = forever
const stake = async ({ address, amount, pid, lockType = 0 }) => {
  const depositAmount = '0x' + new BigNumber(amount)
    .times(new BigNumber(10).pow(18))
    .toString(16)

  return await bartenderContract.methods
    .deposit(pid, depositAmount, lockType)
    .send({ from: address })
    .on('transactionHash', transaction => transaction.transactionHash)
}

const getAllowance = async ({ address }) => {
  try {
    const allowance = await UniswapContract.methods
     .allowance(address, BartenderAddress)
     .call()

    return allowance
  } catch (err) {
    console.error(err)
    throw new Error('Problem getting allowance from Uniswap contract for given account')
  }
}

// const getBlockNumber = () => new Promise((resolve, reject) => {
//   w3.eth.getBlockNumber(function (err, num) {
//     if (err) reject(err)
//     resolve(new BigNumber(num))
//   })
// })

// View function to see pending PUBs on frontend.
const calculatePendingPubs = async (address) => {
  const pool = await getPoolInfo()
  const userInfoArr = await getUserInfo(address)
  let totalPubToTransfer = new BigNumber(0)
  let accPubPerShare = new BigNumber(pool.accPubPerShare)

  const user = userInfoArr
  const userAmount = new BigNumber(user.amount)
  const unlockDate = new Date(Number(user.unlockDate) * 1000)

  if (userAmount.gt(new BigNumber('0')) && unlockDate <= Date.now()) {
    const pending = userAmount
      .times(new BigNumber(accPubPerShare))
      .div(new BigNumber('1000000000000'))
      .minus(new BigNumber(user.rewardDebt))

    totalPubToTransfer = totalPubToTransfer.plus(pending)

    // Distribute taxes
    if (Number(user.lockType) >= 2) {
      const pendingTax = userAmount
        .times(new BigNumber(pool.accTaxPubPerShare))
        .div(new BigNumber('1000000000000'))
        .minus(new BigNumber(user.taxRewardDebt))

      totalPubToTransfer = totalPubToTransfer.plus(pendingTax)
    }

    // Distribute LP taxes
    if (Number(user.lockType) >= 3) {
      const pendingTax = userAmount
        .times(new BigNumber(pool.accLPTaxPubPerShare))
        .div(new BigNumber('1000000000000'))
        .minus(new BigNumber(user.lpTaxRewardDebt))

      totalPubToTransfer = totalPubToTransfer.plus(pendingTax)
    }
  }

  return totalPubToTransfer
}

const calculatePendingLockedPubs = async (address) => {
  const pool = await getPoolInfo()
  const userInfoArr = await getUserInfo(address)
  let totalPubToTransfer = new BigNumber(0)
  let accPubPerShare = new BigNumber(pool.accPubPerShare)

  const user = userInfoArr
  const userAmount = new BigNumber(user.amount)
  const unlockDate = new Date(Number(user.unlockDate) * 1000)

  if (userAmount.gt(new BigNumber('0')) && unlockDate > Date.now()) {
    const pending = userAmount
      .times(new BigNumber(accPubPerShare))
      .div(new BigNumber('1000000000000'))
      .minus(new BigNumber(user.rewardDebt))

    totalPubToTransfer = totalPubToTransfer.plus(pending)

    // Distribute taxes
    if (Number(user.lockType) >= 2) {
      const pendingTax = userAmount
        .times(new BigNumber(pool.accTaxPubPerShare))
        .div(new BigNumber('1000000000000'))
        .minus(new BigNumber(user.taxRewardDebt))

      totalPubToTransfer = totalPubToTransfer.plus(pendingTax)
    }

    // Distribute LP taxes
    if (Number(user.lockType) >= 3) {
      const pendingTax = userAmount
        .times(new BigNumber(pool.accLPTaxPubPerShare))
        .div(new BigNumber('1000000000000'))
        .minus(new BigNumber(user.lpTaxRewardDebt))

      totalPubToTransfer = totalPubToTransfer.plus(pendingTax)
    }
  }

  return totalPubToTransfer
}

// const harvest = async ({ pid, address }) => {
//   try {
//     return await bartenderContract.methods
//       .harvest(pid)
//       .send({ from: address })
//       .on('transactionHash', transaction => transaction.transactionHash)
//   } catch (err) {
//     console.error(err)
//     alert('Sorry, there was a problem harvesting, the transaction failed')
//   }
// }

const unstake = async ({ pid, address }) => {
  try {
    return await bartenderContract.methods
      .withdrawMax(pid)
      .send({ from: address })
      .on('transactionHash', transaction => transaction.transactionHash)
  } catch (err) {
    console.error(err)
    alert('Sorry, there was a problem unstaking, the transaction failed')
  }
}

const approve = async ({ address }) => {
  try {
    const maxUInt256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

    return await UniswapContract.methods
      .approve(BartenderAddress, maxUInt256)
      .send({ from: address })
  } catch (err) {
    console.error(err)
    alert('Sorry, there was a problem approving, the transaction failed')
  }
}

const getPoolInfo = async () => {
  const pid = 0
  const poolInfo = await bartenderContractReads.methods.poolInfo(pid).call()
  return poolInfo
}

const getUserInfo = async (address) => {
  return await bartenderContractReads.methods.userInfo(0, address, 0).call()
}

// const getTotalAllocPoint = async () => {
//   return await bartenderContractReads.methods.totalAllocPoint().call()
// }

// const getPubPerBlock = async () => {
//   return await bartenderContractReads.methods.pubPerBlock().call()
// }

// const getPoolWeight = async () => {
//   try {
//     const pid = 0
//     const { allocPoint } = await bartenderContractReads.methods.poolInfo(pid).call()
//     const totalAllocPoint = await bartenderContractReads.methods.totalAllocPoint().call()

//     return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
//   } catch (err) {
//     console.error(err)
//     throw err
//   }
// }

// const getWethValues = async () => {
//   try {
//     const totalSupply = await UniswapContract.methods.totalSupply().call()
//     const balance = await UniswapContract.methods.balanceOf(BartenderAddress).call()

//     const tokenAmountWholeLP = await ERC20Contract.methods.balanceOf(UniswapAddress).call()
//     const tokenDecimals = await ERC20Contract.methods.decimals().call()

//     const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
//     const uniswapContractWeth = await wethContract.methods.balanceOf(UniswapAddress).call()

//     const wethAmount = new BigNumber(uniswapContractWeth).times(portionLp).div(new BigNumber(10).pow(18))

//     const tokenAmount = new BigNumber(tokenAmountWholeLP)
//       .times(portionLp)
//       .div(new BigNumber(10).pow(tokenDecimals))

//     const pubPrice = await getPubPrice()

//     return {
//       totalWethValue: tokenAmount.times(pubPrice).times(2),
//       totalPriceInWeth: wethAmount.div(tokenAmount)
//     }
//   } catch (err) {
//     console.error(err)
//     throw err
//   }
// }

// const getPubPrice = async () => {
//   try {
//     const wethAmount = await wethContract.methods.balanceOf(UniswapAddress).call()
//     const pubAmount = await pubContract.methods.balanceOf(UniswapAddress).call()

//     return new BigNumber(wethAmount).div(new BigNumber(pubAmount))
//   } catch (err) {
//     console.error('Problem with getting the pub price')
//     throw err
//   }
// }

// const getAPY = async () => {
//   try {
//     const BLOCKS_PER_YEAR = new BigNumber(2336000)
//     const PINT_PER_BLOCK = new BigNumber(25)

//     const pubPrice = await getPubPrice()
//     const poolWeight = await getPoolWeight()
//     const { totalWethValue } = await getWethValues()

//     const ABY = pubPrice
//       .times(PINT_PER_BLOCK)
//       .times(BLOCKS_PER_YEAR)
//       .times(poolWeight)
//       .div(totalWethValue)
//       .times(new BigNumber(10))

//     return Math.floor(ABY.toNumber() * 100) / 100
//   } catch (err) {
//     console.error(err)
//     console.error('Problem with getting the APY')
//   }
// }

// const redeem = async ({ address }) => {
//   const now = new Date().getTime() / 1000
//   if (now < 1597172400) return alert('pool not active')
//   return await bartenderContract.methods
//     .exit()
//     .send({ from: address })
//     .on('transactionHash', transaction => transaction.transactionHash)
// }

//-----------------------------------------------------------------------------
// EVENT HANDLERS (onClick/onChange)
//-----------------------------------------------------------------------------

// const handleHarvest = async ({ address, updateVaultData }) => {
//   await harvest({ pid: 0, address })
//   updateVaultData()
// }

const handleUnstaking = async ({ address }) => {
  try {
    const pid = 0

    await unstake({ address, pid })
  } catch (err) {
    console.error(err)
    alert('Sorry, there was an error with unstaking, transaction failed')
  }
}

const handleStake = async ({ address, stakeAmount, lockDuration, setUiState }) => {
  try {
    if (!address) return alert('invalid address')
    // if (!stakeAmount || Number(stakeAmount) === 0 || Number.isNaN(Number(stakeAmount))) return alert('invalid stake amount')
    if (!lockDuration) return alert('invalid lock duration')

    const pid = 0

    const lockType = getLockType(lockDuration)

    await stake({ address, amount: stakeAmount, pid, lockType })

    setUiState(UI_STATES.NOTHING)
  } catch (err) {
    console.error(err)
    alert('Sorry, there was an error with staking, transaction failed')
  }
}

const handleChangeLockDuration = (setLockDuration) => (evt) => {
  setLockDuration(evt.target.value)
}

const handleChangeStakeAmount = (setStakeAmount, liquidityPoolBalance) => (evt) => {
  const amount = Number(evt.target.value)
  const poolBalance = Number(liquidityPoolBalance)

  if (amount > poolBalance) return setStakeAmount(String(poolBalance))

  setStakeAmount(evt.target.value)
}

//-----------------------------------------------------------------------------
// UTILS
//-----------------------------------------------------------------------------

const stringNumberToNumber = x => x ? Number(x.replace(/,/g, '')) : 0

const getVaultData = async ({ address }) => {
  try {
    const [
      pendingPubs,
      pendingLockedPubs,
      userInfo,
      userInfoLocked,
      allowance,
      lpBalance,
    ] = await Promise.all([
      await calculatePendingPubs(address),
      await calculatePendingLockedPubs(address),
      await bartenderContractReads.methods.getUserInfo(0, address).call(),
      await bartenderContractReads.methods.getUserInfoLocked(0, address).call(),
      await getAllowance({ address }),
      await UniswapContract.methods.balanceOf(address).call(),
    ])

    return {
      pendingPubs: formatBigNumberToSmall(pendingPubs, 3),
      pendingLockedPubs: formatBigNumberToSmall(pendingLockedPubs, 3),
      userInfo: formatBigNumberToSmall(userInfo, 3),
      userInfoLocked: formatBigNumberToSmall(userInfoLocked, 3),
      allowance,
      lpBalance: formatBigNumberToSmall(lpBalance),
    }
  } catch (err) {
    console.log('Error getting vault data')
    console.error(err)
  }
}

const getLockType = (lockDuration) => {
  const lockType = (lockDuration === 'Three Days')
    ? 1
    : 0

  return lockType
}

const formatBigNumberToSmall = (number, decimals) => {
  return (new BigNumber(number))
    .dividedBy(new BigNumber(10).pow(18))
    .toFormat(decimals)
}

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

//-----------------------------------------------------------------------------
// COMPONENTS
//-----------------------------------------------------------------------------

// const AddStakeButton = ({ setUiState, address }) => {
//   // const balanceAsNumber = stringNumberToNumber(liquidityPoolBalance)

//   return (address)
//     ? <button
//         onClick={() => setUiState(UI_STATES.STAKING)}
//         className='px-6 py-4 ml-4 font-bold border border-solid rounded-full text-accent-green border-accent-green'>
//         +
//       </button>
//     : (
//       <button
//         className='px-6 py-4 ml-4 font-bold border border-solid rounded-full cursor-not-allowed opacity-30 text-accent-green border-accent-green'>
//         +
//       </button>
//     )
//   // return (balanceAsNumber && !Number.isNaN(balanceAsNumber))
//   //   ? (
//   //     <button
//   //       onClick={() => setUiState(UI_STATES.STAKING)}
//   //       className='px-6 py-4 ml-4 font-bold border border-solid rounded-full text-accent-green border-accent-green'>
//   //       +
//   //     </button>
//   //   )
//   //   : (
//   //     <button
//   //       className='px-6 py-4 ml-4 font-bold border border-solid rounded-full cursor-not-allowed opacity-30 text-accent-green border-accent-green'>
//   //       +
//   //     </button>
//   //   )
// }

const hasEarnedPint = ({ pintEarned, lockedPintEarned }) => {
  return (
    (pintEarned && !!stringNumberToNumber(pintEarned))
    || (lockedPintEarned && !!stringNumberToNumber(lockedPintEarned))
  )
}

const HarvestButton = ({ pintEarned, lockedPintEarned, address }) => {
  return (hasEarnedPint({ pintEarned, lockedPintEarned }))
    ? (
      <button
        onClick={() => handleUnstaking({ address })}
        className='px-12 py-4 font-bold border border-solid rounded-full text-accent-green border-accent-green'>
        Harvest/Unstake
      </button>
    )
    : (
      <button className='px-12 py-4 font-bold border border-solid rounded-full cursor-not-allowed opacity-30 text-accent-green border-accent-green'>
        Harvest
      </button>
    )
}

// const HarvestButton = () => {
//   return (
//     <button className='px-12 py-4 font-bold border border-solid rounded-full cursor-not-allowed opacity-30 text-accent-green border-accent-green'>
//       Harvest
//     </button>
//   )
// }

const ApproveButton = ({ address }) => {
  return (address)
    ? (
      <button
        onClick={() => approve({ address })}
        className='px-12 py-4 font-bold border border-solid rounded-full text-accent-green border-accent-green'>
        Approve
      </button>
    )
    : (
      <button
        className='px-12 py-4 font-bold border border-solid rounded-full cursor-not-allowed opacity-30 text-accent-green border-accent-green'>
        Approve
      </button>
    )
}

const UnstakeButton = ({ tokensStaked, lockedTokensStaked, address }) => {
  return (!!stringNumberToNumber(tokensStaked) || !!stringNumberToNumber(lockedTokensStaked))
    ? (
      <button
        onClick={() => handleUnstaking({ address })}
        className='px-12 py-4 font-bold border border-solid rounded-full text-accent-green border-accent-green'>
        Harvest/Unstake
      </button>
    )
    : (
      <button className='px-12 py-4 font-bold border border-solid rounded-full cursor-not-allowed opacity-30 text-accent-green border-accent-green'>
        Unstake
      </button>
    )
}

const UnlockWalletButton = ({ unlockWallet, setAddress, address }) => {
  return (!address)
    ? (
      <button
        onClick={() => unlockWallet(setAddress)}
        className='px-12 py-6 ml-4 font-bold border border-solid rounded-full border-accent-green'>
        Unlock Wallet
      </button>
    )
    : null
}

const StakingModal = ({ address, uiState, setUiState, liquidityPoolBalance }) => {
  const [lockDuration, setLockDuration] = useState('None')
  const [stakeAmount, setStakeAmount] = useState('')

  return (uiState === UI_STATES.STAKING) ? (
    <div className='fixed inset-0 z-50 w-full pointer-events-none'>
      <div
        onClick={() => setUiState(UI_STATES.NOTHING)}
        className='absolute inset-0 bg-gray-900 pointer-events-auto opacity-80'>
      </div>
      <div
        style={{
          background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)',
          maxHeight: '600px',
        }}
        className='fixed z-20 w-full h-full text-white shadow-2xl pointer-events-auto rounded-2xl inset-1/2 md:max-w-md transform -translate-x-1/2 -translate-y-1/2'>
        <div className='p-6 md:p-12'>
          <div className='flex justify-between text-2xl'>
            <h2>Stake PINT-ETH LP tokens</h2>
            <div
              onClick={() => setUiState(UI_STATES.NOTHING)}
              className='px-2 cursor-pointer'>
              X
            </div>
          </div>

          <div className='flex flex-col items-start mt-4'>
            <div className='flex items-center justify-start w-full text-sm'>
              <div className='opacity-75'>Current Balance:</div>
              <div className='ml-2 font-bold'>{liquidityPoolBalance || '0.0000'}</div>
            </div>

            <div className='flex w-full px-4 mt-16 overflow-hidden bg-white rounded-full'>
              <input
                className='w-full h-full px-1 py-3 ml-1 text-black'
                placeholder='Enter Amount'
                onChange={handleChangeStakeAmount(setStakeAmount, liquidityPoolBalance)}
                value={stakeAmount} />

              <div className='flex items-center w-32 ml-2 text-black'>
                LP Tokens
              </div>

              <div className='mx-2 my-1 border-l border-gray-300 border-solid'></div>

              <div
                onClick={() => {
                  const amount = (liquidityPoolBalance && typeof liquidityPoolBalance === 'string')
                    ? liquidityPoolBalance.replace(/,/g, '')
                    : liquidityPoolBalance
                  setStakeAmount(amount)
                }}
                className='flex items-center text-green-800 cursor-pointer'>
                Max
              </div>
            </div>

            <div className='flex items-center justify-between w-full mt-8'>
              <div className='text-lg font-bold'>Lock Duration:</div>
              <div className='flex-grow ml-4'>
                <select
                  onChange={handleChangeLockDuration(setLockDuration)}
                  value={lockDuration}
                  className='w-full px-2 py-1 text-lg font-bold bg-transparent border border-white border-solid rounded'>
                  <option className='text-black bg-white'>None</option>
                  <option className='text-black bg-white'>Three Days</option>
                </select>
              </div>
            </div>

            <div className='w-full mt-20'>
              <button
                onClick={() => handleStake({ address, stakeAmount, lockDuration, setUiState })}
                className='w-full px-4 py-2 text-xl font-bold text-green-900 border border-solid rounded-full bg-accent-green border-accent-green'>
                Stake
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

//-----------------------------------------------------------------------------
// MAIN EXPORT
//-----------------------------------------------------------------------------

const UI_STATES = {
  NOTHING: 'NOTHING',
  STAKING: 'STAKING',
}

export const VaultPage = () => {
  const [address, setAddress] = useAddress()
  const [pintEarned, setPintEarned] = useState()
  const [lockedPintEarned, setLockedPintEarned] = useState()
  const [tokensStaked, setTokensStaked] = useState()
  const [lockedTokensStaked, setLockedTokensStaked] = useState()
  const [allowance, setAllowance] = useState()
  const [liquidityPoolBalance, setLiquidityPoolBalance] = useState()

  const [uiState, setUiState] = useState(UI_STATES.NOTHING)

  // HELPER FUNCTION
  const updateVaultData = useCallback(async () => {
    console.log('updating vault data')

    if (!address) return

    const vaultData = await getVaultData({ address })

    if (!vaultData) return

    setPintEarned(vaultData.pendingPubs)
    setLockedPintEarned(vaultData.pendingLockedPubs)
    setTokensStaked(vaultData.userInfo)
    setLockedTokensStaked(vaultData.userInfoLocked)
    setAllowance(vaultData.allowance)
    setLiquidityPoolBalance(vaultData.lpBalance)
  }, [address])

  // UPDATE VAULT DATA LOOP
  useEffect(() => {
    if (!address) return

    let looping = true

    async function effect () {
      if (!looping) return
      if (document.hidden) return setTimeout(effect, 15000)

      try {
        await updateVaultData()
      } catch (err) {
        console.error(err)
      }

      return setTimeout(effect, 15000)
    }

    effect()

    return () => { looping = false }
  }, [address, updateVaultData])

  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='relative text-white'>
      <StakingModal address={address} uiState={uiState} setUiState={setUiState} liquidityPoolBalance={liquidityPoolBalance} />

      <header className='relative flex flex-col items-center pb-48 text-center pt-36 xl:pt-48 xl:pb-60'>
        <HeaderBackground />
        <h1
          className='relative z-10 text-6xl font-bold leading-none xl:text-9xl'>
          Vaults
        </h1>
        <p className='relative z-10 mt-10 text-2xl xl:text-5xl xl:mt-16'>
          Flexible Deposits, Higher Profits.
        </p>
      </header>

      <SectionPadding>
        <section className='mx-auto mb-24 max-w-screen-2xl xl:mb-48'>
          <div className='flex justify-center mt-4'>
            <a href='https://app.uniswap.org/#/add/v2/ETH/0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462' target='_blank' rel='noreferrer'>
              <button className='px-12 py-6 font-bold text-green-900 rounded-full bg-accent-green'>
                Add Liquidity
              </button>
            </a>

            <UnlockWalletButton unlockWallet={unlockWallet} setAddress={setAddress} address={address} />
          </div>
          <p className='mt-8 text-center'>
            (One-sided PINT staking. Coming soon!)
          </p>
          <div className='flex flex-col items-center justify-center mx-auto mt-16 xl:flex-row max-w-screen-lg'>
            <div
              className='flex flex-col items-center justify-between w-full px-8 py-6 m-2 text-center shadow-xl rounded-3xl md:w-3/4'
              style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}>

              <div className='flex justify-center h-24'>
                <img
                  className='w-32 h-24'
                  alt='Pints logo of a gear'
                  style={{ filter: 'invert(52%) sepia(95%) saturate(1036%) hue-rotate(64deg) brightness(123%) contrast(109%)' }}
                  src={pintGearLogoUrl} />
              </div>

              <div className='mt-6 text-3xl leading-none text-center text-gray-100'>PINT</div>

              <div className='mt-12'>
                <p className='text-5xl font-bold text-white'>
                  { (pintEarned || pintEarned === 0) ? pintEarned : '---' }
                </p>
                <div className='mt-4 text-xl leading-none text-center text-gray-300'>PINT Earned</div>
                <div className='h-0 mt-4 text-lg leading-none text-center text-gray-100 opacity-75'>{ /* PLACEHOLDER TO KEEP BOTH CARDS SAME HEIGHT */ }</div>
              </div>

              <div className='mt-8'>
                <p className='text-5xl font-bold text-white'>
                  { (lockedPintEarned || lockedPintEarned === 0) ? lockedPintEarned : '---' }
                </p>
                <div className='mt-4 text-xl leading-none text-center text-gray-300'>Locked PINT Earned</div>
              </div>

              <div className='mt-12'>
                <HarvestButton updateVaultData={updateVaultData} address={address} pintEarned={pintEarned} lockedPintEarned={lockedPintEarned} />
              </div>
              <div className='mt-4'>
                <p className='opacity-0 pointer-events-none'>
                  -
                </p>
              </div>
            </div>

            <div
              className='flex flex-col items-center justify-between w-full px-8 py-6 m-2 text-center shadow-xl rounded-3xl md:w-3/4'
              style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}>

              <div className='flex justify-center h-24'>
                <img
                  className='w-32 h-24'
                  alt='Pints logo of a gear'
                  style={{ filter: 'invert(52%) sepia(95%) saturate(1036%) hue-rotate(64deg) brightness(123%) contrast(109%)' }}
                  src={pintGearLogoUrl} />
                <div className='w-3/12'>
                  <EthereumLogoSvg />
                </div>
              </div>

              <div className='mt-6 text-3xl leading-none text-center text-gray-100'>ETH_PINT UNI-V2 LP</div>
              <div className='h-0 mt-4 text-lg leading-none text-center text-gray-100 opacity-75'>APY 0%</div>

              <div className='mt-12'>
                <p className='text-5xl font-bold text-white'>
                  { (tokensStaked || tokensStaked === 0) ? tokensStaked : '---' }
                </p>
                <div className='mt-4 text-xl leading-none text-center text-gray-300'>Tokens Staked</div>
              </div>

              <div className='mt-8'>
                <p className='text-5xl font-bold text-white'>
                  { (lockedTokensStaked || lockedTokensStaked === 0) ? lockedTokensStaked : '---' }
                </p>
                <div className='mt-4 text-xl leading-none text-center text-gray-300'>Locked Tokens Staked</div>
              </div>

              <div className='mt-12'>
                { !address || Number(allowance) === 0 ? (
                <ApproveButton address={address} />
                ) : (
                <div>
                  <UnstakeButton address={address} tokensStaked={tokensStaked} lockedTokensStaked={lockedTokensStaked} />

                  {/* <AddStakeButton address={address} liquidityPoolBalance={liquidityPoolBalance} setUiState={setUiState} /> */}
                </div>
                ) }
              </div>

              <div className='mt-4'>
                <p className='opacity-0 pointer-events-none'>
                  -
                </p>
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

