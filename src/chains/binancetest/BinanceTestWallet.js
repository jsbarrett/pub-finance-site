import BigNumber from 'bignumber.js'

const PubAbi = require('../../PubToken.json').abi
const UniswapAbi = require('../../UniswapAbi.json')
const LayerZeroEndpointAbi = require('../../LayerZeroEndpointAbi.json')

const getPubBalance = async ({ address, w3 }) => {
  const PubAddress = '0x82ED5aBA668D2609B36D6AAC4865c2aF72109AC5'

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
  const binancetestPubAddress = '0x82ED5aBA668D2609B36D6AAC4865c2aF72109AC5'
  const fujiPubAddress = '0x4B4F1211A4E41C6e3aac57ffa89a9dFAD0Bc4F8e'
  const fujiChainId = '10006'
  const lzEndpointAddress = '0x64Aed168Cb7EC01C1Bf3556BF5f48297770BA5dC'

  const PubContract = new w3.eth.Contract(PubAbi, binancetestPubAddress)
  const LZEndpoint = new w3.eth.Contract(LayerZeroEndpointAbi, lzEndpointAddress)

  // approve
  await PubContract.methods
    .approve(binancetestPubAddress, amount)
    .send({ from: address })

  // estimate fee
  const fee = await LZEndpoint.methods
    .estimateNativeFees(
      fujiChainId,
      fujiPubAddress,
      '0x00010000000000000000000000000000000000000000000000000000000000001234',
      false,
      '0x00010000000000000000000000000000000000000000000000000000000000001234'
    )
    .call()

  console.log('estimated fee', fee)
  const feePlusThreePercent = new BigNumber(fee).times('103').div('100')

  // sendTokens
  await PubContract.methods
    .sendTokens(fujiChainId, fujiPubAddress, amount)
    .send({ from: address, value: feePlusThreePercent })
}

export const BinanceTestWallet = {
  getPubBalance,
  getLPBalance,
  sendTokens,
}

