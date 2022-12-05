import * as ethereum from './ethereum/index'
import * as binancetest from './binancetest/index'
import * as fuji from './fuji/index'
import * as avax from './avax/index'
import * as goerli from './goerli/index'

export const chainImplementations = {
  [ethereum.details.chainId]: ethereum,
  [binancetest.details.chainId]: binancetest,
  [fuji.details.chainId]: fuji,
  [avax.details.chainId]: avax,
  [goerli.details.chainId]: goerli,
}
