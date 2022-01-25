import { useState, useEffect, useRef } from 'react'
import { chainImplementations } from '../chains/index'
import BigNumber from 'bignumber.js'

const Web3 = require('web3')

const WalletFns = () => {
  const chainId = window.ethereum.chainId

  if (!chainImplementations[chainId]) return {
    getPubBalance: async () => '---',
    getLPBalance: async () => '---',
    sendTokens: async () => {},
  }

  return chainImplementations[chainId].wallet
}

const getChainDetails = () => {
  const chainId = window.ethereum.chainId

  if (!chainImplementations[chainId]) return {
    chainAbbreviation: async () => '',
    chainLogo: async () => <div />,
  }

  return chainImplementations[chainId].details
}

const requestWalletPermissions = async () => {
  try {
    if (!window.ethereum) return

    await window.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }]
    })
  } catch (err) {
    console.error(err)
  }
}

const formatBalance = balance => {
  try {
    return balance
      .dividedBy(new BigNumber(10).pow(18))
      .toFormat(4)
  } catch (err) {
    return '---'
  }
}

const formatBalanceForInput = balance => {
  return formatBalance(balance).toString().replace(/,/g, '')
}

const amountStringToBigNumber = amount => new BigNumber(amount)
  .times(new BigNumber(10).pow(18))

export const WalletDetails = ({ address, setModalIsOpen }) => {
  const [balance, setBalance] = useState('---')
  const [liquidityPoolBalance, setLiquidityPoolBalance] = useState('---')
  const [tokenAmountToSend, setTokenAmountToSend] = useState('')
  const [sendMax, setSendMax] = useState(false)
  const [chainDetails, setChainDetails] = useState({})
  const sendTokensRef = useRef()

  useEffect(() => {
    if (!address) return

    async function effect () {
      const w3 = new Web3(window.ethereum)

      const { getPubBalance, getLPBalance, sendTokens } = WalletFns()
      setChainDetails(getChainDetails())

      sendTokensRef.current = ({ address, sendMax, tokenAmountToSend, balance  }) => {
        if (sendMax) {
          sendTokens({ address, amount: balance, w3 })
        } else {
          sendTokens({ address, w3, amount: amountStringToBigNumber(tokenAmountToSend) })
        }
      }

      const [pubBalance, lpBalance] = await Promise.all([
        getPubBalance({ address, w3 }),
        getLPBalance({ address, w3 })
      ])
      if (pubBalance) setBalance(pubBalance)
      if (lpBalance) setLiquidityPoolBalance(lpBalance)
    }

    effect()
  }, [address])

  return (
    <div className='fixed inset-0 z-50 w-full pointer-events-none'>
      <div
        onClick={() => setModalIsOpen(false)}
        className='absolute inset-0 bg-gray-900 pointer-events-auto opacity-80'>
      </div>
      <div
        className='max-h-full overflow-y-auto relative flex flex-col justify-center w-11/12 py-8 px-8 mx-auto text-center text-white shadow-2xl pointer-events-auto rounded-2xl mt-0 xl:mt-36 mb-36 lg:w-8/12 xl:w-6/12 2xl:w-4/12'
        style={{ background: 'rgb(12,12,97)' }}>
        <div className='relative flex justify-center'>
          <div className='text-4xl font-bold'>MY ACCOUNT</div>
          <div
            onClick={() => setModalIsOpen(false)}
            className='absolute right-0 px-2 text-4xl cursor-pointer'>
            X
          </div>
        </div>

        <div className='mt-8'>
          <div className='text-4xl font-bold'>
            {formatBalance(balance)}
          </div>
          <div className='opacity-75'>
            PINT Balance
          </div>
        </div>

        <div className='mt-4'>
          <div className='text-4xl font-bold'>
            {liquidityPoolBalance}
          </div>
          <div className='opacity-75'>
            Balance in Liquidity Pool
          </div>
        </div>

        <div className='flex flex-col items-center justify-center mt-8 sm:flex-row'>
          <button
            onClick={() => requestWalletPermissions()}
            className='w-full px-4 py-3 mt-2 text-xl font-bold border border-solid rounded-full sm:ml-2 border-accent-green text-accent-green'>
            Add Wallet
          </button>

          <a
            className='w-full px-4 py-3 mt-2 text-xl font-bold text-green-900 border border-solid rounded-full sm:ml-2 border-accent-green bg-accent-green'
            href={`https://etherscan.io/address/${address}`}
            target='_blank'
            rel='noreferrer'>
            View on Etherscan
          </a>
        </div>

        {/* <div className='mt-8'> */}
        {/*   <button */}
        {/*     onClick={() => { sendTokensRef.current() }} */}
        {/*     className='text-accent-green border px-4 py-2 border-accent-green rounded-full'> */}
        {/*     send token */}
        {/*   </button> */}
        {/* </div> */}

        <hr className='border-blue-800 my-6 lg:my-12' />

        <div>
          {/* MOBILE */}
          <div className='flex md:hidden justify-center'>
            Send tokens to Avax network
          </div>

          {/* DESKTOP */}
          <div className='justify-center items-center hidden md:flex'>
            <div className='flex items-center px-8 py-8 border border-solid border-accent-green rounded-md'>
              <div>
                {chainDetails?.chainLogo}
                <img
                  src={chainDetails?.logo?.src}
                  className='hidden md:block h-12'
                  alt={chainDetails?.logo?.alt}
                />
              </div>

              <div>
                <div className='ml-4 text-left'>
                  <div className='text-gray-400 text-xl'>Send from:</div>
                  <div className='text-2xl font-bold'>{chainDetails?.abbreviation}</div>
                </div>
              </div>
            </div>

            <div className='-ml-4 -mr-4 relative z-10'>
              <div
                style={{ backgroundColor: 'rgb(12, 12, 97)' }}
                className='mx-auto h-12 w-12 flex justify-center items-center rounded-full border-4 border-solid border-accent-green text-accent-green'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            <div className='flex items-center px-8 py-8 border border-solid border-accent-green rounded-md'>
              <div>
                <img
                  src={chainDetails?.sendingTo?.logo?.src}
                  className='hidden md:block h-12'
                  alt={chainDetails?.sendingTo?.logo?.alt}
                />
              </div>

              <div className='ml-4 text-left'>
                <div className='text-gray-400 text-xl'>Send to:</div>
                <div className='text-2xl font-bold'>
                  {chainDetails?.sendingTo?.abbreviation}
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 lg:mt-12 w-full flex flex-col items-center justify-center'>
            <div className='border border-solid border-blue-800 w-full lg:w-3/4 flex rounded-md '>
              <input
                value={!sendMax ? tokenAmountToSend : formatBalanceForInput(balance)}
                onChange={evt => {
                  setTokenAmountToSend(evt.target.value)
                  setSendMax(false)
                }}
                type="number"
                placeholder="1.00"
                className='px-2 py-4 text-4xl w-3/4 bg-transparent'
              />

              <button
                onClick={() => {setSendMax(true)}}
                className='w-1/4'>
                MAX
              </button>
            </div>
          </div>
        </div>

        <div className='mt-12'>
          <button
            onClick={() => sendTokensRef.current({ address, sendMax, tokenAmountToSend, balance })}
            className='bg-accent-green rounded-md text-green-900 text-3xl font-bold px-4 py-6'>
            SEND TOKENS
          </button>
        </div>
      </div>
    </div>
  )
}

