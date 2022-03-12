import BigNumber from 'bignumber.js'
import {
  getHistoricalData,
  getTotalValueLockedCardData,
  getOtherCardData,
  getMarketCap
} from '../getStats'

const Web3 = require('web3')
const PubTokenArtifact = require('../../PubToken.json')
const PubAddress = '0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462'

const getYourPINTBalance = async () => {
  if (!window.ethereum) return

  const [accountAddress] = await window.ethereum.request({ method: 'eth_accounts' })
  if (!accountAddress) return

  const w3 = new Web3(window.ethereum)
  const pubContract = new w3.eth.Contract(PubTokenArtifact.abi, PubAddress)

  const balance = new BigNumber(await pubContract.methods.balanceOf(accountAddress).call())
  return balance
    .dividedBy(new BigNumber(10).pow(18))
    .toFormat(2)
}

export const EthereumDashboard = {
  getHistoricalData,
  getTotalValueLockedCardData,
  getOtherCardData,
  getMarketCap,
  getYourPINTBalance,
}
