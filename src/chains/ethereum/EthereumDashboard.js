import BigNumber from 'bignumber.js'

const Web3 = require('web3')
const PubTokenArtifact = require('../../PubToken.json')
const wethAbi = require('../../weth.json')

const PubAddress = '0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462'
const WethAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const PubUniswapAddress = '0x8f3869c177090eace770396f9495424780c73537'

// const getHistoricalDataPoint = async (date) => {
//   const url = 'https://api.coingecko.com/api/v3/coins/pub-finance/history?date='
//   const config = { headers: { 'Content-Type': 'application/json' } }

//   const [day, month, year] = date.split('-')

//   return fetch(url + date, config)
//     .then(x => x.json())
//     .then(x => {
//       return {
//         date: new Date(`${month}-${day}-${year}`),
//         Volume: x.market_data.total_volume.usd,
//         Price: x.market_data.current_price.usd,
//       }
//     })
// }

const getHistoricalDataPoints = async () => {
  const fromDate = new Date()
  fromDate.setDate(fromDate.getDate() - 100)
  const from = Math.floor(fromDate.getTime() / 1000)
  const to = Math.floor(Date.now() / 1000)
  const url = `https://api.coingecko.com/api/v3/coins/pub-finance/market_chart/range?vs_currency=usd&from=${from}&to=${to}`
  const config = { headers: { 'Content-Type': 'application/json' } }

  return fetch(url, config)
    .then(x => x.json())
    .then(x => {
      return x.prices
        .map((y, i) => {
          return {
            date: new Date(y[0]),
            Volume: x.total_volumes[i][1],
            Price: y[1],
          }
        })
        .slice(-10)
    })
}

const getCurrentEthPrice = async () => {
  const url = 'https://api.coingecko.com/api/v3/coins/ethereum'
  const config = { headers: { 'Content-Type': 'application/json' } }

  return fetch(url, config)
    .then(x => x.json())
    .then(x => {
      return x.market_data.current_price.usd
    })
}

const getLiquidityData = async () => {
  const query = `{
    pairDayDatas (
      first: 10,
      orderBy: date,
      orderDirection: desc,
      where: { pairAddress: "0x8f3869c177090eace770396f9495424780c73537" }
    ) {
      date
      reserveUSD
    }
  }`
  return await fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  })
    .then(x => x.json())
    .then(x => x.data.pairDayDatas)
}

let HISTORICAL_DATA = []

const getHistoricalData = async () => {
  if (HISTORICAL_DATA.length > 0) return HISTORICAL_DATA

  const liquidityData = await getLiquidityData()
  liquidityData.reverse()

  const historicalDataPoints = await getHistoricalDataPoints()
  historicalDataPoints.forEach((x, i) => { x.Liquidity = Number(liquidityData[i].reserveUSD) })

  HISTORICAL_DATA = historicalDataPoints

  return HISTORICAL_DATA
}

let TOTAL_VALUE_LOCKED_CARD_DATA

const getTotalValueLockedCardData = async () => {
  if (TOTAL_VALUE_LOCKED_CARD_DATA) return TOTAL_VALUE_LOCKED_CARD_DATA

  const query = `{
    pairDayDatas (
      first: 1,
      orderBy: date,
      orderDirection: desc,
      where: { pairAddress: "0x8f3869c177090eace770396f9495424780c73537" }
    ) {
      date
      reserveUSD
    }
  }`

  return await fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  })
    .then(x => x.json())
    .then(x => x.data.pairDayDatas)
    .then(x => {
      if (!x || x.length <= 0) return ''

      TOTAL_VALUE_LOCKED_CARD_DATA = Math.round(Number(x[0].reserveUSD)).toLocaleString()

      return TOTAL_VALUE_LOCKED_CARD_DATA
    })
    .catch(err => {
      console.error(err)
      return 'Error'
    })
}

let OTHER_CARD_DATA

const getOtherCardData = async () => {
  if (OTHER_CARD_DATA) return OTHER_CARD_DATA

  return await fetch('https://api.coingecko.com/api/v3/coins/pub-finance', {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(x => x.json())
    .then(x => {
      OTHER_CARD_DATA = x
      return OTHER_CARD_DATA
    })
    .catch(err => {
      console.error(err)
    })
}

const getMarketCap = async () => {
  if (!window.ethereum) return '0'

  const w3 = new Web3(window.ethereum)
  const pubContract = new w3.eth.Contract(PubTokenArtifact.abi, PubAddress)
  const wethContract = new w3.eth.Contract(wethAbi, WethAddress)

  const totalSupply = new BigNumber(await pubContract.methods.totalSupply().call())

  const wethBalance = await wethContract.methods.balanceOf(PubUniswapAddress).call()
  const pubBalance = await pubContract.methods.balanceOf(PubUniswapAddress).call()
  const ethPrice = await getCurrentEthPrice()
  const pubPrice = new BigNumber(wethBalance).div(new BigNumber(pubBalance))
  const marketCap = '$' + totalSupply
    .dividedBy(new BigNumber(10).pow(18))
    .times(pubPrice)
    .times(new BigNumber(ethPrice))
    .toFormat(2)

  return marketCap
}

const getYourPINTBalance = async () => {
  if (!window.ethereum) return

  const [accountAddress] = await window.ethereum.request({ method: 'eth_accounts' })
  if (!accountAddress) return

  const w3 = new Web3(window.ethereum)
  const pubContract = new w3.eth.Contract(PubTokenArtifact.abi, PubAddress)

  const balance = new BigNumber(await pubContract.methods.balanceOf(accountAddress).call())
  return balance
    .dividedBy(new BigNumber(10).pow(18))
    .toFormat(2)
}

export const EthereumDashboard = {
  getHistoricalData,
  getTotalValueLockedCardData,
  getOtherCardData,
  getMarketCap,
  getYourPINTBalance,
}
