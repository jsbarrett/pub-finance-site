const hex = x => `0x${x.toString(16)}`

export const chainIds = {
  ethereum: '0x1',
  ropsten: '0x3',
  rinkeby: '0x4',
  goerli: '0x5',
  kovan: '0x2a',

  avalanche: hex(43114),
  fuji: hex(43113),

  binance: hex(56),
  binancetest: hex(97),
}

// TODO: add liquidity pool abi to config

export const chainConfig = {
  [chainIds.ethereum]: {
    BARTENDER_ADDRESS: '0x3ad4e2F9574b5dA2d054505a94FC31ee141C6338',
    INFURA_ENDPOINT: 'https://mainnet.infura.io/v3/b9727f2a835649c3b2d4b785b314cb48',
    PUB_ADDRESS: '0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462',
    UNISWAP_ADDRESS: '0x8f3869c177090eace770396f9495424780c73537',
    WETH_ADDRESS: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  [chainIds.fuji]: {
    BARTENDER_ADDRESS: '0xBa9bBC0D97C7a55958785Cf17cB7A0ad22F5b502',
    INFURA_ENDPOINT: '',
    PUB_ADDRESS: '0x4B4F1211A4E41C6e3aac57ffa89a9dFAD0Bc4F8e',
    UNISWAP_ADDRESS: '',
    WETH_ADDRESS: '',
  },
  [chainIds.binancetest]: {
    BARTENDER_ADDRESS: '0x6EFD8F6e3ad4BFeE89e87189de79469b7b0C2456',
    INFURA_ENDPOINT: '',
    PUB_ADDRESS: '0x82ED5aBA668D2609B36D6AAC4865c2aF72109AC5',
    UNISWAP_ADDRESS: '',
    WETH_ADDRESS: '',
  }
}

