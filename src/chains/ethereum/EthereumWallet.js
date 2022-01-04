import BigNumber from 'bignumber.js'
const PubAbi = require('../../PubToken.json').abi
const UniswapAbi = require('../../UniswapAbi.json')

const getPubBalance = async ({ address, w3 }) => {
  const PubAddress = '0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462'
  if (!PubAddress) return

  const PubContract = new w3.eth.Contract(PubAbi, PubAddress)

  const balance = (new BigNumber(await PubContract.methods.balanceOf(address).call()))
    .dividedBy(new BigNumber(10).pow(18))
    .toFormat(4)

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

export const EthereumWallet = {
  getPubBalance,
  getLPBalance,
}
