export const lpTokenLabel = 'AVAX_PINT TJ LP'
export const addLiquidityLink = 'https://traderjoexyz.com/'

// lockType is enum 0 = no lock, 1 = 3 days, 2 = week, 3 = month, 4 = forever
export const stake = async ({ address, amount, pid, lockType = 0 }) => {
  alert('sorry not yet implemented on this chain')
}

export const getAllowance = async ({ address }) => {
  alert('sorry not yet implemented on this chain')
}

export const harvest = async ({ pid, address }) => {
  alert('sorry not yet implemented on this chain')
}

export const unstake = async ({ pid, address }) => {
  alert('sorry not yet implemented on this chain')
}

export const approve = async ({ address }) => {
  alert('sorry not yet implemented on this chain')
}

export const getPoolWeight = async () => {
  alert('sorry not yet implemented on this chain')
}

export const getWethValues = async () => {
  alert('sorry not yet implemented on this chain')
}

export const getPubPrice = async () => {
  alert('sorry not yet implemented on this chain')
}

export const getAPY = async () => {
}

export const getVaultData = async () => {
}

// const redeem = async ({ address }) => {
//   const now = new Date().getTime() / 1000
//   if (now < 1597172400) return alert('pool not active')
//   return await bartenderContract.methods
//     .exit()
//     .send({ from: address })
//     .on('transactionHash', transaction => transaction.transactionHash)
// }

