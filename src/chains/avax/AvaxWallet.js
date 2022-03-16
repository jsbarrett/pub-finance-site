import BigNumber from 'bignumber.js'
import {ethers} from 'ethers'

const PubAbi = require('../../PubToken.json').abi
const UniswapAbi = require('../../UniswapAbi.json')

const getPubBalance = async ({ address, w3 }) => {
  const PubAddress = '0x3Af0eB8BcBd4C4C6E26e309c4E47Af59Bad5FC2f'
  const PubContract = new w3.eth.Contract(PubAbi, PubAddress)

  const balance = (new BigNumber(await PubContract.methods.balanceOf(address).call()))

  return balance
}

const getLPBalance = async ({ address, w3 }) => {
  const UniswapAddress = ''
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
  const ethereumChainId = '1'
  // const lzEndpointAddress = '0x8da2f530a798b8D7949694AD00ad51E409a872B8'

  const PubContract = new w3.eth.Contract(PubAbi, avaxPubAddress)
  // const LZEndpoint = new w3.eth.Contract(LayerZeroEndpointAbi, lzEndpointAddress)

  // approve
  await PubContract.methods
    .approve(avaxPubAddress, amount)
    .send({ from: address })

  // const payload = ethers.utils.defaultAbiCoder
  //   .encode(
  //     ['address', 'uint'],
  //     [address, amount.toString()]
  //   )
  // console.log({ payload })

  // estimate fee
  // const estimatedFee = await LZEndpoint.methods
  //   .estimateFees(
  //     fujiChainId,
  //     fujiPubAddress,
  //     payload,
  //     false,
  //     '0x00010000000000000000000000000000000000000000000000000000000000001234'
  //   )
  //   .call()

  // console.log('estimated fee', estimatedFee)
  // const fee = new BigNumber(estimatedFee).times('105').div('100').decimalPlaces(0)
  // console.log('fee', fee.toString())

  const fee = ethers.utils.parseEther('0.3')

  // sendTokens
  await PubContract.methods
    .sendTokens(ethereumChainId, ethereumPubAddress, amount)
    .send({ from: address, value: fee })
}

export const AvaxWallet = {
  getPubBalance,
  getLPBalance,
  sendTokens,
}
