import React from 'react'

// UNUSED ... was being used in VaultPage

export const Table = ({ assets, apy, interest, durations, selectedDuration, setSelectedDuration, action, actionLabel }) => {
  return (
    <div>
      <table className='hidden xl:block w-full mt-8 mb-24'>
        <tbody>
          <tr className='text-xl xl:text-3xl text-left'>
            <th className='align-top'>Assets</th>
            <th className='align-top text-center'>APY%</th>
            <th className='w-4/12 align-top text-center'>
              <div>Duration</div>
              <div className='mt-2 font-normal text-lg'>choose lockup period</div>
            </th>
            <th className='align-top text-center'>Interest</th>
            <th className='align-top'>{/* Add Liquidity */}</th>
          </tr>
          <tr className='text-xl xl:text-3xl'>
            <td className='py-8 w-1/6'>
              { assets }
            </td>
            <td className='py-8 w-1/6 text-center'>
              { apy }
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
              { interest }
            </td>
            <td className='text-xl py-8 text-center w-1/6'>
              <button
                onClick={() => action()}
                className='text-gray-900 rounded-3xl px-8 py-2 font-bold bg-accent-green'>
                { actionLabel }
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className='xl:hidden w-full mt-8 mb-12'>
        <div className='flex justify-center items-center'>
          <div className='text-xl w-full text-right'>Assets:</div>
          <div className='ml-2 text-xl font-bold w-full text-left'>{ assets }</div>
        </div>
        <div className='mt-8 flex justify-center items-center'>
          <div className='text-xl w-full text-right'>APY%:</div>
          <div className='ml-2 text-xl font-bold w-full text-left'>{ apy }</div>
        </div>
        <div className='mt-8 flex justify-center items-center'>
          <div className='text-xl w-full text-right'>Interest</div>
          <div className='ml-2 text-xl font-bold w-full text-left'>{ interest }</div>
        </div>
        <div className='mt-12 flex justify-center items-center'>
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
            onClick={() => action()}
            className='text-gray-900 rounded-3xl px-8 py-2 font-bold bg-accent-green'>
            { actionLabel }
          </button>
        </div>
      </div>
    </div>
  )
}

