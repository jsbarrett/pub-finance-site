import BigNumber from 'bignumber.js'

const getBalance = async (body) => {
  return fetch('/.netlify/functions/getBalance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(x => x.json())
    .then(x => x[0] ? x[0].balance : '0')
    .then(x => new BigNumber(x))
}

export const getYourPINTBalance = async ({
  currentChain,
  currentChainToken,
  otherChain,
  otherChainToken,
  addressToCheck
}) => {
  return Promise
    .all([
      getBalance({ chain: currentChain, addressToCheck, token: currentChainToken }),
      getBalance({ chain: otherChain, addressToCheck, token: otherChainToken })
    ])
    .then(results => {
      const totalBalance = results[0].plus(results[1])
      return totalBalance
        .dividedBy(new BigNumber('1000000000000000000'))
        .toString()
    })
}
