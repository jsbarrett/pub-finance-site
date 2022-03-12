import { BigNumber } from 'bignumber.js'

const Web3 = require('web3')
const BartenderAbi = require('../Bartender.json')
const infuraEndpoint = 'https://mainnet.infura.io/v3/b9727f2a835649c3b2d4b785b314cb48'
const infura = new Web3(new Web3.providers.HttpProvider(infuraEndpoint))

const BartenderAddress = '0x3ad4e2F9574b5dA2d054505a94FC31ee141C6338'
const bartenderContractReads = new infura.eth.Contract(BartenderAbi, BartenderAddress)

const getPoolInfo = async () => {
  const pid = 0
  const poolInfo = await bartenderContractReads.methods.poolInfo(pid).call()
  return poolInfo
}

const getUserInfo = async (address) => {
  return await bartenderContractReads.methods.userInfo(0, address, 0).call()
}

export const calculatePendingPubs = async (address) => {
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

export const calculatePendingLockedPubs = async (address) => {
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
