import BigNumber from 'bignumber.js'
import { calculatePendingPubs, calculatePendingLockedPubs } from '../getPendingRewards'

const Web3 = require('web3')
const BartenderAbi = require('../../Bartender.json')
const UniswapAbi = require('../../UniswapAbi.json')
const wethAbi = require('../../weth.json')
const PubAbi = require('../../PubToken.json').abi
const ERC20Abi = require('../../erc20.json')

const formatBigNumberToSmall = (number, decimals) => {
  return (new BigNumber(number))
    .dividedBy(new BigNumber(10).pow(18))
    .toFormat(decimals)
}

export const lpTokenLabel = 'ETH_PINT UNI-V2 LP'
export const addLiquidityLink = 'https://app.uniswap.org/#/add/v2/ETH/0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462'

//-----------------------------------------------------------------------------
// SMART CONTRACT METHODS
//-----------------------------------------------------------------------------

const infuraEndpoint = 'https://mainnet.infura.io/v3/b9727f2a835649c3b2d4b785b314cb48'
const BartenderAddress = '0x3ad4e2F9574b5dA2d054505a94FC31ee141C6338'
const PubAddress = '0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462'
const UniswapAddress = '0x8f3869c177090eace770396f9495424780c73537'
const WethAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

const w3 = new Web3(window.ethereum)
const infura = new Web3(new Web3.providers.HttpProvider(infuraEndpoint))

const ERC20Contract = new w3.eth.Contract(ERC20Abi, PubAddress)
const UniswapContract = new w3.eth.Contract(UniswapAbi, UniswapAddress)
const bartenderContract = new w3.eth.Contract(BartenderAbi, BartenderAddress)
const bartenderContractReads = new infura.eth.Contract(BartenderAbi, BartenderAddress)
const pubContract = new w3.eth.Contract(PubAbi, PubAddress)
const wethContract = new w3.eth.Contract(wethAbi, WethAddress)

// lockType is enum 0 = no lock, 1 = 3 days, 2 = week, 3 = month, 4 = forever
export const stake = async ({ address, amount, pid, lockType = 0 }) => {
  const depositAmount = '0x' + new BigNumber(amount)
    .times(new BigNumber(10).pow(18))
    .toString(16)

  return await bartenderContract.methods
    .deposit(pid, depositAmount, lockType)
    .send({ from: address })
    .on('transactionHash', transaction => transaction.transactionHash)
}

export const getAllowance = async ({ address }) => {
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

export const harvest = async ({ pid, address }) => {
  try {
    return await bartenderContract.methods
      .harvest(pid)
      .send({ from: address })
      .on('transactionHash', transaction => transaction.transactionHash)
  } catch (err) {
    console.error(err)
    alert('Sorry, there was a problem harvesting, the transaction failed')
  }
}

export const unstake = async ({ pid, address }) => {
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

export const approve = async ({ address }) => {
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

export const getPoolWeight = async () => {
  try {
    const pid = 0
    const { allocPoint } = await bartenderContractReads.methods.poolInfo(pid).call()
    const totalAllocPoint = await bartenderContractReads.methods.totalAllocPoint().call()

    return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getWethValues = async () => {
  try {
    const totalSupply = await UniswapContract.methods.totalSupply().call()
    const balance = await UniswapContract.methods.balanceOf(BartenderAddress).call()

    const tokenAmountWholeLP = await ERC20Contract.methods.balanceOf(UniswapAddress).call()
    const tokenDecimals = await ERC20Contract.methods.decimals().call()

    const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
    const uniswapContractWeth = await wethContract.methods.balanceOf(UniswapAddress).call()

    const wethAmount = new BigNumber(uniswapContractWeth).times(portionLp).div(new BigNumber(10).pow(18))

    const tokenAmount = new BigNumber(tokenAmountWholeLP)
      .times(portionLp)
      .div(new BigNumber(10).pow(tokenDecimals))

    const pubPrice = await getPubPrice()

    return {
      totalWethValue: tokenAmount.times(pubPrice).times(2),
      totalPriceInWeth: wethAmount.div(tokenAmount)
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getPubPrice = async () => {
  try {
    const wethAmount = await wethContract.methods.balanceOf(UniswapAddress).call()
    const pubAmount = await pubContract.methods.balanceOf(UniswapAddress).call()

    return new BigNumber(wethAmount).div(new BigNumber(pubAmount))
  } catch (err) {
    console.error('Problem with getting the pub price')
    throw err
  }
}

export const getAPY = async () => 0

export const getVaultData = async ({ address }) => {
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

