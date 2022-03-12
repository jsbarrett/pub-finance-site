import BigNumber from 'bignumber.js'
const PubAbi = require('../../PubToken.json').abi
const UniswapAbi = require('../../UniswapAbi.json')

const getPubBalance = async ({ address, w3 }) => {
  const PubAddress = ''
  if (!PubAddress) return

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

export const AvaxWallet = {
  getPubBalance,
  getLPBalance,
}
