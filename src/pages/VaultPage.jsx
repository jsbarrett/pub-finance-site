import React, { useState, useEffect } from 'react'
import { PageFooter } from '../components/PageFooter'

const GrabPint = () => {
  const [selectedDuration, setSelectedDuration] = useState('1 week')

  const durations = [
    '1 week',
    '1 month',
    '3 months',
    '6 months',
    '1 year',
  ]

  useEffect(() => {
    // TODO
    switch (selectedDuration) {
      case '1 week': {
        break
      }
      case '1 month': {
        break
      }
      case '3 months': {
        break
      }
      case '6 months': {
        break
      }
      case '1 year': {
        break
      }
    }
  }, [selectedDuration])

  // TODO
  const transfer = () => {}

  return (
    <div>
      <h2 className='font-bold texl-4xl xl:text-7xl'>Lock your PINT. Maximize returns</h2>

      <div
        className='rounded-3xl py-4 px-4 xl:px-12 shadow-xl mt-12'
        style={{ background: 'rgb(12,12,97)' }}>
        <div className='text-xl xl:text-3xl font-bold text-center'>Fixed Lock - One sided staking</div>
        <div>
          <table className='hidden xl:block w-full mt-8 mb-24'>
            <tbody>
              <tr className='text-3xl text-left'>
                <th className='align-top'>Assets</th>
                <th className='align-top text-center'>APY%</th>
                <th className='align-top text-center'>
                  <div>Duration</div>
                  <div className='mt-2 font-normal text-lg'>choose lockup period</div>
                </th>
                <th className='align-top text-center'>Interest</th>
                <th className='align-top'>{/* Transfer */}</th>
              </tr>
              <tr className='text-3xl'>
                <td className='py-8 w-1/6'>
                  PINT
                </td>
                <td className='py-8 w-1/6 text-center'>
                  6.24%
                </td>
                <td className='py-8 w-2/6'>
                  <div className='text-sm flex justify-center'>
                    {durations.map((duration, index) => (
                    <div
                      key={duration}
                      className='flex items-center justify-center flex-col'>
                      <div className='flex items-center'>
                        <div className={index !== 0 ? 'w-6 h-1 bg-accent-green' : 'w-6 h-1'}></div>
                        <div
                          onClick={() => setSelectedDuration(duration)}
                          className={selectedDuration !== duration ? 'border-accent-green cursor-pointer h-6 w-6 rounded-full border-4 border-solid bg-accent-green' : 'border-accent-green cursor-pointer h-6 w-6 rounded-full border-4 border-solid'}>
                        </div>
                        <div className={index !== (durations.length - 1) ? 'w-6 h-1 bg-accent-green' : 'w-6 h-1'}></div>
                      </div>
                      <div className='mt-2'>{ duration }</div>
                    </div>
                    ))}
                  </div>
                </td>
                <td className='py-8 w-1/6 text-center'>
                  .00456
                </td>
                <td className='text-xl py-8 text-center w-1/6'>
                  <button
                    onClick={() => transfer()}
                    className='text-gray-900 rounded-3xl px-8 py-2 font-bold bg-accent-green'>
                    Transfer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className='xl:hidden w-full mt-8 mb-12'>
            <div className='flex justify-around items-center'>
              <div className='text-lg w-full text-center'>Assets:</div>
              <div className='text-3xl font-bold w-full text-center'>PINT</div>
            </div>
            <div className='mt-8 flex justify-around items-center'>
              <div className='text-lg w-full text-center'>APY%:</div>
              <div className='text-3xl font-bold w-full text-center'>6.24%</div>
            </div>
            <div className='mt-8 flex justify-around items-center'>
              <div className='text-lg w-full text-center'>Interest</div>
              <div className='text-3xl font-bold w-full text-center'>.00456</div>
            </div>
            <div className='mt-12 flex justify-around items-center'>
              <div className='text-xs flex justify-center'>
                {durations.map((duration, index) => (
                <div
                  key={duration}
                  className='flex items-center justify-center flex-col'>
                  <div className='flex items-center'>
                    <div className={index !== 0 ? 'w-4 h-1 bg-accent-green' : 'w-4 h-1'}></div>
                    <div
                      onClick={() => setSelectedDuration(duration)}
                      className={selectedDuration !== duration ? 'border-accent-green cursor-pointer h-6 w-6 rounded-full border-4 border-solid bg-accent-green' : 'border-accent-green cursor-pointer h-6 w-6 rounded-full border-4 border-solid'}>
                    </div>
                    <div className={index !== (durations.length - 1) ? 'w-4 h-1 bg-accent-green' : 'w-4 h-1'}></div>
                  </div>
                  <div className='mt-2'>{ duration }</div>
                </div>
                ))}
              </div>
            </div>
            <div className='mt-8 flex justify-around items-center'>
              <button
                onClick={() => transfer()}
                className='text-gray-900 rounded-3xl px-8 py-2 font-bold bg-accent-green'>
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AddLiquidity = () => {
  const [selectedDuration, setSelectedDuration] = useState('Unlocked')

  const durations = [
    'Unlocked',
    '1 week',
    '1 month',
    '3 months',
    '6 months',
    '1 year',
  ]

  useEffect(() => {
    // TODO
    switch (selectedDuration) {
      case '1 week': {
        break
      }
      case '1 month': {
        break
      }
      case '3 months': {
        break
      }
      case '6 months': {
        break
      }
      case '1 year': {
        break
      }
    }
  }, [selectedDuration])

  // TODO
  const addLiquidity = () => {}

  return (
    <div>
      <h2 className='font-bold text-4xl xl:text-7xl mt-24'>Add Liquidity</h2>

      <div
        className='mt-12 rounded-3xl py-4 px-12 shadow-xl'
        style={{ background: 'rgb(12,12,97)' }}>
        <div className='mt-8'>
          <table className='hidden xl:block w-full mt-8 mb-24'>
            <tbody>
              <tr className='text-xl xl:text-3xl text-left'>
                <th className='align-top'>Assets</th>
                <th className='align-top text-center'>APY%</th>
                <th className='align-top text-center'>
                  <div>Duration</div>
                  <div className='mt-2 font-normal text-lg'>choose lockup period</div>
                </th>
                <th className='align-top text-center'>Interest</th>
                <th className='align-top'>{/* Add Liquidity */}</th>
              </tr>
              <tr className='text-xl xl:text-3xl'>
                <td className='py-8 w-1/6'>
                  ETH PINT LP
                </td>
                <td className='py-8 w-1/6 text-center'>
                  6.24%
                </td>
                <td className='py-8 w-2/6'>
                  <div className='text-sm flex justify-center'>
                    {durations.map((duration, index) => (
                    <div
                      key={duration}
                      className='flex items-center justify-center flex-col'>
                      <div className='flex items-center'>
                        <div className={index !== 0 ? 'w-6 h-1 bg-accent-green' : 'w-6 h-1'}></div>
                        <div
                          onClick={() => setSelectedDuration(duration)}
                          className={selectedDuration !== duration ? 'border-accent-green cursor-pointer h-6 w-6 rounded-full border-4 border-solid bg-accent-green' : 'border-accent-green cursor-pointer h-6 w-6 rounded-full border-4 border-solid'}>
                        </div>
                        <div className={index !== (durations.length - 1) ? 'w-6 h-1 bg-accent-green' : 'w-6 h-1'}></div>
                      </div>
                      <div className='mt-2'>{ duration }</div>
                    </div>
                    ))}
                  </div>
                </td>
                <td className='py-8 w-1/6 text-center'>
                  .00456
                </td>
                <td className='text-xl py-8 text-center w-1/6'>
                  <button
                    onClick={() => addLiquidity()}
                    className='text-gray-900 rounded-3xl px-8 py-2 font-bold bg-accent-green'>
                    Add Liquidity
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className='xl:hidden w-full mt-8 mb-12'>
            <div className='flex justify-around items-center'>
              <div className='text-lg w-full text-center'>Assets:</div>
              <div className='text-3xl font-bold w-full text-center'>ETH PINT LP</div>
            </div>
            <div className='mt-8 flex justify-around items-center'>
              <div className='text-lg w-full text-center'>APY%:</div>
              <div className='text-3xl font-bold w-full text-center'>6.24%</div>
            </div>
            <div className='mt-8 flex justify-around items-center'>
              <div className='text-lg w-full text-center'>Interest</div>
              <div className='text-3xl font-bold w-full text-center'>.00456</div>
            </div>
            <div className='mt-12 flex justify-around items-center'>
              <div className='text-xs flex justify-center'>
                {durations.map((duration, index) => (
                <div
                  key={duration}
                  className='flex items-center justify-center flex-col'>
                  <div className='flex items-center'>
                    <div className={index !== 0 ? 'w-4 h-1 bg-accent-green' : 'w-4 h-1'}></div>
                    <div
                      onClick={() => setSelectedDuration(duration)}
                      className={selectedDuration !== duration ? 'border-accent-green cursor-pointer h-6 w-6 rounded-full border-4 border-solid bg-accent-green' : 'border-accent-green cursor-pointer h-6 w-6 rounded-full border-4 border-solid'}>
                    </div>
                    <div className={index !== (durations.length - 1) ? 'w-4 h-1 bg-accent-green' : 'w-4 h-1'}></div>
                  </div>
                  <div className='mt-2'>{ duration }</div>
                </div>
                ))}
              </div>
            </div>
            <div className='mt-8 flex justify-around items-center'>
              <button
                onClick={() => addLiquidity()}
                className='text-gray-900 rounded-3xl px-8 py-2 font-bold bg-accent-green'>
                Add Liquidity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const VaultPage = () => {
  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='text-white'>
      <header className='relative pt-36 xl:pt-48 pb-48 xl:pb-60 text-center flex flex-col items-center'>
        <div
          className='w-full h-full absolute opacity-50 top-0'
          style={{ background: 'linear-gradient(0deg, rgba(11,19,43,1) 0%, rgba(68,255,1,1) 100%)' }}>
        </div>
        <div className='bottom-0 absolute w-full'>
          <svg viewBox="0 0 900 200" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <rect x="0" y="0" width="900" height="200" fill="none"></rect>
            <path d="M0 160L16.7 139.8C33.3 119.7 66.7 79.3 100 75.2C133.3 71 166.7 103 200 111.7C233.3 120.3 266.7 105.7 300 104.8C333.3 104 366.7 117 400 111.3C433.3 105.7 466.7 81.3 500 67.2C533.3 53 566.7 49 600 65C633.3 81 666.7 117 700 121.7C733.3 126.3 766.7 99.7 800 88.7C833.3 77.7 866.7 82.3 883.3 84.7L900 87L900 201L883.3 201C866.7 201 833.3 201 800 201C766.7 201 733.3 201 700 201C666.7 201 633.3 201 600 201C566.7 201 533.3 201 500 201C466.7 201 433.3 201 400 201C366.7 201 333.3 201 300 201C266.7 201 233.3 201 200 201C166.7 201 133.3 201 100 201C66.7 201 33.3 201 16.7 201L0 201Z" fill="rgb(11, 19, 43)" strokeLinecap="round" strokeLinejoin="miter"></path>
          </svg>
        </div>
        <h1
          className='relative z-10 font-bold text-6xl xl:text-9xl leading-none'>
          Vault
        </h1>
        <p className='relative z-10 text-2xl xl:text-5xl mt-10 xl:mt-16'>
          Flexible Deposits, Higher Profits.
        </p>
      </header>

      <section className='max-w-screen-2xl mx-auto px-2 xl:px-12 mb-24 xl:mb-48'>
        <GrabPint />
        <AddLiquidity />
      </section>

      <PageFooter />
    </div>
  )
}

