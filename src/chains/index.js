import * as ethereum from './ethereum/index'
import * as binancetest from './binancetest/index'
import * as fuji from './fuji/index'

export const chainImplementations = {
  [ethereum.chainId]: ethereum,
  [binancetest.chainId]: binancetest,
  [fuji.chainId]: fuji,
}
