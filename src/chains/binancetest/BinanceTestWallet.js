import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

const PubAbi = require('../../PubToken.json').abi
const UniswapAbi = require('../../UniswapAbi.json')
// const LayerZeroEndpointAbi = require('../../LayerZeroEndpointAbi.json')

const getPubBalance = async ({ address, w3 }) => {
  const PubAddress = '0x6DbcC67369c9F3D1CB75B07aAC421c6E9700C62d'

  const PubContract = new w3.eth.Contract(PubAbi, PubAddress)

  const balance = new BigNumber(await PubContract.methods.balanceOf(address).call())

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
  const binancetestPubAddress = '0x6DbcC67369c9F3D1CB75B07aAC421c6E9700C62d'
  const fujiPubAddress = '0xeC104B9cA585c73D38b87397Cd3B34417Be0EDf6'
  const fujiChainId = '10006'
  // const lzEndpointAddress = '0x8da2f530a798b8D7949694AD00ad51E409a872B8'

  const PubContract = new w3.eth.Contract(PubAbi, binancetestPubAddress)
  // const LZEndpoint = new w3.eth.Contract(LayerZeroEndpointAbi, lzEndpointAddress)

  // approve
  await PubContract.methods
    .approve(binancetestPubAddress, amount)
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

  const fee = ethers.utils.parseEther('0.003')

  // sendTokens
  await PubContract.methods
    .sendTokens(fujiChainId, fujiPubAddress, amount)
    .send({ from: address, value: fee })
}

export const BinanceTestWallet = {
  getPubBalance,
  getLPBalance,
  sendTokens,
}

