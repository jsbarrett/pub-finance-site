import Web3 from 'web3'
import { BunksAbi, ERC20Abi, ERC721Abi, MarketAbi, WrappedBunksAbi, WrappedCurrencyAbi } from './abis'
import * as Constants from '../constants'
import BigNumber from 'bignumber.js'

const WrappedBunksAddress = '0x89eFe1075b9F1e4D6587B2260a6E21Cb4A166715'
const BunksAddress = '0x5ea899dbc8d3cde806142a955806e06759b05fb8'

export default class BlockchainInterface {
  constructor (props) {
    this.web3 = null
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum)
    }
    this.chain = props.chain

    this.callback = async () => {}

    this.connectedToWallet = false
    this.walletAddress = null
    this.decimals = new BigNumber(10).pow(new BigNumber(Constants.marketERC20Decimals[this.chain]))

    const _this = this
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async function (accounts) {
        await _this.isConnectedAndLoggedIn()
        await _this.callback()
      })
    }
  }

  getMarketAddress () {
    return Constants.marketContractAddresses[this.chain]
  }

  getMarketERC20Address () {
    return Constants.marketERC20[this.chain]
  }

  setCallback (callback) {
    this.callback = callback
  }

  async isConnectedToChain () {
    if (this.web3 === null) return false
    const chainId = await this.web3.eth.getChainId()
    return chainId === Constants.chainIds[this.chain]
  }

  async getMarketContractInstance () {
    this.web3 = new Web3(window.ethereum)
    if (await this.isConnectedToChain()) {
      return new this.web3.eth.Contract(MarketAbi, this.getMarketAddress())
    } else {
      throw Error('Connected to the wrong network')
    }
  }

  async getTokenContractInstance (tokenAddress, abi) {
    this.web3 = new Web3(window.ethereum)
    if (await this.isConnectedToChain()) {
      return new this.web3.eth.Contract(abi, tokenAddress)
    } else {
      throw Error('Connected to the wrong network')
    }
  }

  async getBatchRequests () {
    this.web3 = new Web3(window.ethereum)
    if (await this.isConnectedToChain()) {
      return new this.web3.eth.BatchRequest()
    } else {
      throw Error('Connected to the wrong network')
    }
  }

  async connectToWallet () {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!')
    }
    try {
      await window.ethereum.enable()
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      this.walletAddress = accounts[0].toLowerCase()

      console.log(this.walletAddress)
    } catch (error) {
      return false
    }
    this.connectedToWallet = true
    return true
  }

  async isConnectedAndLoggedIn () {
    if (this.web3 === null) return false

    if (await this.isConnectedToChain()) {
      let address = await this.web3.eth.getAccounts()
      if (address && address !== '') {
        if (Array.isArray(address) && address.length === 0) {
          return false
        }
        if (typeof address !== 'string') {
          address = address[0]
        }
        this.connectedToWallet = true
        this.walletAddress = address.toLowerCase()
        return true
      }
    }
    return false
  }

  // --------------------------------------------------------------------------
  // Market Getters
  // --------------------------------------------------------------------------

  async askExists (address, nftId) {
    const market = await this.getMarketContractInstance()
    return await market.methods.askExists(address, nftId).call()
  }

  async getAskFor (address, nftId) {
    const market = await this.getMarketContractInstance()
    return (new BigNumber(await market.methods.getAskFor(address, nftId).call()).dividedBy(this.decimals)).toFixed(2)
  }

  async getBidFor (address, nftId, index = 0) {
    const market = await this.getMarketContractInstance()
    return (new BigNumber(await market.methods.getBidFor(address, nftId).call()).dividedBy(this.decimals)).toFixed(2)
  }

  async getBidAmountFor (address, nftId, index = 0) {
    const market = await this.getMarketContractInstance()
    return (new BigNumber(await market.methods.getBidAmountFor(address, nftId, this.walletAddress).call()).dividedBy(this.decimals)).toFixed(2)
  }

  // --------------------------------------------------------------------------
  // Token Getters
  // --------------------------------------------------------------------------

  async getERC20ApproveAmount () {
    const token = await this.getTokenContractInstance(this.getMarketERC20Address(), ERC20Abi)
    return await token.methods.allowance(this.walletAddress, this.getMarketAddress()).call()
  }

  async isERC721ApprovedForAll (address) {
    const token = await this.getTokenContractInstance(address, ERC721Abi)
    return await token.methods.isApprovedForAll(this.walletAddress, this.getMarketAddress()).call()
  }

  async ownerOf (address, nftId) {
    const token = await this.getTokenContractInstance(address, ERC721Abi)
    return await token.methods.ownerOf(nftId).call()
  }

  async isOwner (address, nftId) {
    return (await this.ownerOf(address, nftId)).toLowerCase() === this.walletAddress.toLowerCase()
  }

  // --------------------------------------------------------------------------
  // Token Setters
  // --------------------------------------------------------------------------

  async addToERC20ApprovedAmount (amount) {
    try {
      const token = await this.getTokenContractInstance(this.getMarketERC20Address(), ERC20Abi)
      const amountInWei = new BigNumber(amount).times(this.decimals)
      const amountApproved = new BigNumber(await this.getERC20ApproveAmount())
      const newApprovalAmount = amountInWei.plus(amountApproved).toFixed()
      await token.methods.approve(this.getMarketAddress(), newApprovalAmount).send({ from: this.walletAddress })
    } catch (e) {
      throw new Error('Approve Token Failed')
    }
  }

  async approveERC721ForAll (address, enable = true) {
    try {
      const token = await this.getTokenContractInstance(address, ERC721Abi)
      await token.methods.setApprovalForAll(this.getMarketAddress(), enable).send({ from: this.walletAddress })
    } catch (e) {
      throw new Error('Approve Token Failed')
    }
  }

  // --------------------------------------------------------------------------
  // Buyer Setters
  // --------------------------------------------------------------------------

  async placeBid (address, tokenId, amount) {
    try {
      const market = await this.getMarketContractInstance()
      const amountInWei = new BigNumber(amount).times(this.decimals).toFixed()
      await market.methods.placeBid(address, tokenId, amountInWei).send({ from: this.walletAddress })
    } catch (e) {
      throw new Error('Place Bid Failed')
    }
  }

  async removeBid (address, tokenId) {
    try {
      const market = await this.getMarketContractInstance()
      await market.methods.removeBid(address, tokenId).send({ from: this.walletAddress })
    } catch (e) {
      throw new Error('Remove Bid Failed')
    }
  }

  async buyNow (address, tokenId, maxAmountInWei) {
    try {
      const market = await this.getMarketContractInstance()
      // let amountInWei = new BigNumber(maxAmount).times(this.decimals).toFixed();
      await market.methods.buyNow(address, tokenId, maxAmountInWei).send({ from: this.walletAddress })
    } catch (e) {
      throw new Error('Buy Now Failed')
    }
  }

  // --------------------------------------------------------------------------
  // Buyer Setters
  // --------------------------------------------------------------------------

  async placeAsk (address, tokenId, amount) {
    try {
      const market = await this.getMarketContractInstance()
      const amountInWei = new BigNumber(amount).times(this.decimals).toFixed()
      await market.methods.placeAsk(address, tokenId, amountInWei).send({ from: this.walletAddress })
    } catch (e) {
      throw new Error('Place Ask Failed')
    }
  }

  async removeAsk (address, tokenId) {
    try {
      const market = await this.getMarketContractInstance()
      await market.methods.removeAsk(address, tokenId).send({ from: this.walletAddress })
    } catch (e) {
      throw new Error('Remove Ask Failed')
    }
  }

  async sellNow (address, tokenId, amountInWei) {
    try {
      const market = await this.getMarketContractInstance()
      // let amountInWei = new BigNumber(minAmount).times(this.decimals).toFixed();
      await market.methods.sellNow(address, tokenId, amountInWei).send({ from: this.walletAddress })
    } catch (e) {
      throw new Error('Sell Now Failed')
    }
  }

  // --------------------------------------------------------------------------
  // Batch Get
  // --------------------------------------------------------------------------

  async getContractInfo (address, nftId) {
    console.log(`Address: ${address} and id: ${nftId}`)
    const market = await this.getMarketContractInstance()
    const token = await this.getTokenContractInstance(address, ERC721Abi)
    const erc20Token = await this.getTokenContractInstance(this.getMarketERC20Address(), ERC20Abi)

    const calls = [
      token.methods.isApprovedForAll(this.walletAddress, this.getMarketAddress()).call,
      token.methods.ownerOf(nftId).call,
      market.methods.askExists(address, nftId).call,
      market.methods.getAskFor(address, nftId).call,
      market.methods.getBidFor(address, nftId, 0).call,
      erc20Token.methods.allowance(this.walletAddress, this.getMarketAddress()).call,
      market.methods.getBidAmountFor(address, nftId, this.walletAddress).call,
      market.methods.nftokens(address).call

    ]

    const batch = await this.getBatchRequests()
    const returnArr = []
    await new Promise(function (resolve, reject) {
      let counter = 0
      const total = calls.length

      for (let i = 0; i < total; ++i) {
        batch.add(calls[i].request({}, (err, data) => {
          if (err) return reject([])
          returnArr.push(data)
          counter++
          if (counter === total) resolve()
        }))
      }
      batch.execute()
    })
    const bidAmount = (new BigNumber(returnArr[4]).dividedBy(this.decimals)).toFixed(4)
    const myBidAmount = (new BigNumber(returnArr[6]).dividedBy(this.decimals)).toFixed(4)

    const returnData = {
      isApproved: returnArr[0],
      isOwner: returnArr[1].toLowerCase() === this.walletAddress.toLowerCase(),
      askExists: returnArr[2],
      askAmount: (new BigNumber(returnArr[3]).dividedBy(this.decimals)).toFixed(4),
      askAmountWei: returnArr[3],
      bidExists: returnArr[4] !== '0',
      bidAmountWei: returnArr[4],
      bidAmount,
      approvedBuyAmount: (new BigNumber(returnArr[5]).dividedBy(this.decimals)).toFixed(4),
      exists: true,
      myBidExists: returnArr[6] !== '0',
      myBidAmount,
      fees: returnArr[7]
    }
    console.log(returnData)
    return returnData
  }

  // --------------------------------------------------------------------------
  // Wrapped Currency
  // --------------------------------------------------------------------------

  async getUnWrappedBalance () {
    this.web3 = new Web3(window.ethereum)
    if (await this.isConnectedAndLoggedIn()) {
      console.log('getting ETH wallet address balance: ' + this.walletAddress)

      return new BigNumber(await this.web3.eth.getBalance(this.walletAddress)).dividedBy(this.decimals).toFixed(4)
    } else {
      throw Error('Connected to the wrong network')
    }
  }

  async getWrappedBalance () {
    const currencyToken = await this.getTokenContractInstance(Constants.marketERC20[this.chain], WrappedCurrencyAbi)
    console.log('getting wallet address balance: ' + this.walletAddress)
    return new BigNumber(await currencyToken.methods.balanceOf(this.walletAddress).call()).dividedBy(this.decimals).toFixed(4)
  }

  async depositWrappedToken (amount) {
    const currencyToken = await this.getTokenContractInstance(Constants.marketERC20[this.chain], WrappedCurrencyAbi)
    const amountInWei = new BigNumber(amount).times(this.decimals)

    return await currencyToken.methods.deposit().send({
      from: this.walletAddress,
      value: amountInWei
    })
  }

  // --------------------------------------------------------------------------
  // Bunks Wrapper Calls
  // --------------------------------------------------------------------------

  async getOwnedBunks () {
    const response = await window.fetch('https://bscmasks.com/bunks/owners', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const owners = await response.json()
    const returnArr = []
    for (const index in owners) {
      if (this.walletAddress.toLowerCase() === owners[index].toLowerCase()) {
        returnArr.push(index)
      }
    }
    return returnArr
  }

  async approveBunkToBeWrapped (nftId) {
    try {
      const token = await this.getTokenContractInstance(BunksAddress, BunksAbi)
      await token.methods.offerPunkForSaleToAddress(nftId, 0, WrappedBunksAddress).send({ from: this.walletAddress })
    } catch (e) {
      throw new Error('Approve Bunk to Be Wrapped Failed')
    }
  }

  async wrapBunk (nftId) {
    try {
      const token = await this.getTokenContractInstance(WrappedBunksAddress, WrappedBunksAbi)
      await token.methods.wrap(nftId).send({ from: this.walletAddress })
    } catch (e) {
      throw new Error('Wrap Bunk Failed')
    }
  }

  async unwrapBunk (nftId) {
    try {
      const token = await this.getTokenContractInstance(WrappedBunksAddress, WrappedBunksAbi)
      await token.methods.unwrap(nftId).send({ from: this.walletAddress })
    } catch (e) {
      throw new Error('Wrap Bunk Failed')
    }
  }
}