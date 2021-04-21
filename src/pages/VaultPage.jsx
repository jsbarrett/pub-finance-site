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
      <h2 className='font-bold text-7xl'>Lock your PINT. Maximize returns</h2>

      <div
        className='rounded-3xl py-4 px-12 shadow-xl mt-12'
        style={{ background: 'rgb(12,12,97)' }}>
        <div className='text-3xl font-bold text-center'>Fixed Lock - One sided staking</div>
        <div>
          <table className='w-full mt-8 mb-24'>
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
      <h2 className='font-bold text-7xl mt-24'>Add Liquidity</h2>

      <div
        className='mt-12 rounded-3xl py-4 px-12 shadow-xl'
        style={{ background: 'rgb(12,12,97)' }}>
        <div className='mt-8'>
          <table className='w-full mt-8 mb-24'>
            <tbody>
              <tr className='text-3xl text-left'>
                <th className='align-top'>Assets</th>
                <th className='align-top text-center'>APY%</th>
                <th className='align-top text-center'>
                  <div>Duration</div>
                  <div className='mt-2 font-normal text-lg'>choose lockup period</div>
                </th>
                <th className='align-top text-center'>Interest</th>
                <th className='align-top'>{/* Add Liquidity */}</th>
              </tr>
              <tr className='text-3xl'>
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
        </div>
      </div>
    </div>
  )
}

export const VaultPage = () => {
  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='text-white'>
      <header className='relative pt-48 pb-60 text-center flex flex-col items-center'>
        <div
          className='w-full h-full absolute opacity-50 top-0'
          style={{ background: 'linear-gradient(0deg, rgba(11,19,43,1) 0%, rgba(68,255,1,1) 100%)' }}>
        </div>
        <h1
          className='relative z-10 font-bold text-9xl leading-none'>
          Vault
        </h1>
        <p className='relative z-10 text-5xl mt-16'>
          Flexible Deposits, Higher Profits.
        </p>
      </header>


      <section className='max-w-screen-2xl mx-auto px-12 mb-48'>
        <GrabPint />
        <AddLiquidity />
      </section>

      <PageFooter />
    </div>
  )
}

