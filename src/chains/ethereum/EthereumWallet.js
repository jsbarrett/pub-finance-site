import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
const PubAbi = require('../../PubToken.json').abi
const UniswapAbi = require('../../UniswapAbi.json')
const LayerZeroEndpointAbi = require('../../LayerZeroEndpointAbi.json')

const getPubBalance = async ({ address, w3 }) => {
  const PubAddress = '0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462'
  if (!PubAddress) return

  const PubContract = new w3.eth.Contract(PubAbi, PubAddress)

  const balance = (new BigNumber(await PubContract.methods.balanceOf(address).call()))

  return balance
}

const getLPBalance = async ({ address, w3 }) => {
  const UniswapAddress = '0x8f3869c177090eace770396f9495424780c73537'
  if (!UniswapAddress) return

  const UniswapContract = new w3.eth.Contract(UniswapAbi, UniswapAddress)

  const lpBalance = (new BigNumber((await UniswapContract.methods.balanceOf(address).call())))
    .dividedBy(new BigNumber(10).pow(18))
    .toFormat(4)

  return lpBalance
}

const sendTokens = async ({ address, amount, w3 }) => {
  const ethereumPubAddress = '0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462'
  const avaxPubAddress = '0x3Af0eB8BcBd4C4C6E26e309c4E47Af59Bad5FC2f'
  const avaxChainId = '6'
  const lzEndpointAddress = '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675'

  const PubContract = new w3.eth.Contract(PubAbi, ethereumPubAddress)
  const LZEndpoint = new w3.eth.Contract(LayerZeroEndpointAbi, lzEndpointAddress)

  // approve
  await PubContract.methods
    .approve(ethereumPubAddress, new BigNumber(amount))
    .send({ from: address })

  const payload = ethers.utils.defaultAbiCoder
    .encode(
      ['address', 'uint'],
      [address, amount.toString()]
    )

  const willPayInZro = false
  const adapterParams = []

  // estimate fee
  const estimatedFee = await LZEndpoint.methods
    .estimateFees(avaxChainId, avaxPubAddress, payload, willPayInZro, adapterParams)
    .call()

  const fee = new BigNumber(estimatedFee[0])
    .times('105')
    .div('100')
    .decimalPlaces(0)

  // sendTokens
  await PubContract.methods
    .sendTokens(avaxChainId, avaxPubAddress, new BigNumber(amount))
    .send({ from: address, value: fee })
}

export const EthereumWallet = {
  getPubBalance,
  getLPBalance,
  sendTokens,
}
