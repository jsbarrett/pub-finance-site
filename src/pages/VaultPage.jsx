import React, { useState } from 'react'
import { PageFooter } from '../components/PageFooter'
import { SectionPadding } from '../components/SectionPadding'
import { HeaderBackground } from '../components/HeaderBackground'
import { EthereumLogoSvg } from '../components/EthereumLogoSvg'
import pintGearLogoUrl from '../pint-gear-logo.svg'

// const GrabPint = () => {
//   return (
//     <div>
//       <h2 className='font-bold text-4xl xl:text-7xl'>Lock your PINT. Maximize returns</h2>

//       <div
//         className='rounded-3xl py-4 px-4 xl:px-12 shadow-xl mt-12'
//         style={{ background: 'rgb(12,12,97)' }}>
//         <div className='text-xl xl:text-3xl font-bold text-center'>Fixed Lock - One sided staking</div>

//         <div className='h-36 text-center flex justify-center items-center text-3xl'>
//           Coming soon ...
//         </div>
//       </div>
//     </div>
//   )
// }

// const Table = ({ assets, apy, interest, durations, selectedDuration, setSelectedDuration, action, actionLabel }) => {
//   return (
//     <div>
//       <table className='hidden xl:block w-full mt-8 mb-24'>
//         <tbody>
//           <tr className='text-xl xl:text-3xl text-left'>
//             <th className='align-top'>Assets</th>
//             <th className='align-top text-center'>APY%</th>
//             <th className='w-4/12 align-top text-center'>
//               <div>Duration</div>
//               <div className='mt-2 font-normal text-lg'>choose lockup period</div>
//             </th>
//             <th className='align-top text-center'>Interest</th>
//             <th className='align-top'>{/* Add Liquidity */}</th>
//           </tr>
//           <tr className='text-xl xl:text-3xl'>
//             <td className='py-8 w-1/6'>
//               { assets }
//             </td>
//             <td className='py-8 w-1/6 text-center'>
//               { apy }
//             </td>
//             <td className='py-8 w-2/6'>
//               <div className='text-sm flex justify-center'>
//                 {durations.map((duration, index) => (
//                 <div
//                   key={duration}
//                   className='flex items-center justify-center flex-col'>
//                   <div className='flex items-center'>
//                     <div className={index !== 0 ? 'w-6 h-1 bg-accent-green' : 'w-6 h-1'}></div>
//                     <div
//                       onClick={() => setSelectedDuration(duration)}
//                       className={selectedDuration !== duration ? 'border-accent-green cursor-pointer h-6 w-6 rounded-full border-4 border-solid bg-accent-green' : 'border-accent-green cursor-pointer h-6 w-6 rounded-full border-4 border-solid'}>
//                     </div>
//                     <div className={index !== (durations.length - 1) ? 'w-6 h-1 bg-accent-green' : 'w-6 h-1'}></div>
//                   </div>
//                   <div className='mt-2'>{ duration }</div>
//                 </div>
//                 ))}
//               </div>
//             </td>
//             <td className='py-8 w-1/6 text-center'>
//               { interest }
//             </td>
//             <td className='text-xl py-8 text-center w-1/6'>
//               <button
//                 onClick={() => action()}
//                 className='text-gray-900 rounded-3xl px-8 py-2 font-bold bg-accent-green'>
//                 { actionLabel }
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       <div className='xl:hidden w-full mt-8 mb-12'>
//         <div className='flex justify-center items-center'>
//           <div className='text-xl w-full text-right'>Assets:</div>
//           <div className='ml-2 text-xl font-bold w-full text-left'>{ assets }</div>
//         </div>
//         <div className='mt-8 flex justify-center items-center'>
//           <div className='text-xl w-full text-right'>APY%:</div>
//           <div className='ml-2 text-xl font-bold w-full text-left'>{ apy }</div>
//         </div>
//         <div className='mt-8 flex justify-center items-center'>
//           <div className='text-xl w-full text-right'>Interest</div>
//           <div className='ml-2 text-xl font-bold w-full text-left'>{ interest }</div>
//         </div>
//         <div className='mt-12 flex justify-center items-center'>
//           <div className='text-xs flex justify-center'>
//             {durations.map((duration, index) => (
//             <div
//               key={duration}
//               className='flex items-center justify-center flex-col'>
//               <div className='flex items-center'>
//                 <div className={index !== 0 ? 'w-4 h-1 bg-accent-green' : 'w-4 h-1'}></div>
//                 <div
//                   onClick={() => setSelectedDuration(duration)}
//                   className={selectedDuration !== duration ? 'border-accent-green cursor-pointer h-6 w-6 rounded-full border-4 border-solid bg-accent-green' : 'border-accent-green cursor-pointer h-6 w-6 rounded-full border-4 border-solid'}>
//                 </div>
//                 <div className={index !== (durations.length - 1) ? 'w-4 h-1 bg-accent-green' : 'w-4 h-1'}></div>
//               </div>
//               <div className='mt-2'>{ duration }</div>
//             </div>
//             ))}
//           </div>
//         </div>
//         <div className='mt-8 flex justify-around items-center'>
//           <button
//             onClick={() => action()}
//             className='text-gray-900 rounded-3xl px-8 py-2 font-bold bg-accent-green'>
//             { actionLabel }
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// const AddLiquidity = () => {
//   const [selectedDuration, setSelectedDuration] = useState('Unlocked')

//   const durations = [ 'Unlocked', '1 week', '1 month', '3 months', '6 months', '1 year' ]

//   const addLiquidity = () => {}

//   return (
//     <div>
//       <h2 className='font-bold text-4xl xl:text-7xl mt-24'>Add Liquidity</h2>

//       <div
//         className='mt-12 rounded-3xl py-4 px-12 shadow-xl'
//         style={{ background: 'rgb(12,12,97)' }}>
//         <Table
//           assets='ETH PINT LP'
//           apy='6.24%'
//           interest='.00456'
//           durations={durations}
//           selectedDuration={selectedDuration}
//           setSelectedDuration={setSelectedDuration}
//           action={addLiquidity}
//           actionLabel='Add Liquidity'
//         />
//       </div>
//     </div>
//   )
// }

export const VaultPage = () => {
  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='text-white'>
      <header className='relative pt-36 xl:pt-48 pb-48 xl:pb-60 text-center flex flex-col items-center'>
        <HeaderBackground />
        <h1
          className='relative z-10 font-bold text-6xl xl:text-9xl leading-none'>
          Vault
        </h1>
        <p className='relative z-10 text-2xl xl:text-5xl mt-10 xl:mt-16'>
          Flexible Deposits, Higher Profits.
        </p>
      </header>

      <SectionPadding>
        <section className='max-w-screen-2xl mx-auto mb-24 xl:mb-48'>
          <div className='flex justify-center mt-4'>
            <a href='https://app.uniswap.org/#/add/ETH/0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462' target='_blank' rel='noreferrer'>
              <button className='text-gray-900 rounded-full px-12 py-6 font-bold bg-accent-green'>
                Add Liquidity
              </button>
            </a>
          </div>
          <div className='flex flex-col xl:flex-row justify-center mt-16 max-w-screen-lg mx-auto items-center'>
            <div
              className='px-8 py-6 m-2 text-center rounded-3xl shadow-xl w-full md:w-3/4 flex flex-col items-center justify-between'
              style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}>

              <div className='h-24 flex justify-center'>
                <img
                  className='w-32 h-24'
                  alt='Pints logo of a gear'
                  style={{ filter: 'invert(52%) sepia(95%) saturate(1036%) hue-rotate(64deg) brightness(123%) contrast(109%)' }}
                  src={pintGearLogoUrl} />
              </div>

              <div className='text-center leading-none text-gray-100 text-3xl mt-6'>PINT</div>

              <div className='mt-12'>
                <p className='text-5xl font-bold text-white'>0.000</p>
                <div className='text-center leading-none text-gray-300 text-xl mt-4'>PINT Earned</div>
              </div>

              <div className='mt-8'>
                <p className='text-5xl font-bold text-white'>0.000</p>
                <div className='text-center leading-none text-gray-300 text-xl mt-4'>Locked PINT Earned</div>
              </div>

              <div className='mt-12'>
                <button className='rounded-full px-12 py-4 font-bold border text-accent-green border-solid border-accent-green'>
                  Harvest
                </button>
              </div>
            </div>

            <div
              className='px-8 py-6 m-2 text-center rounded-3xl shadow-xl w-full md:w-3/4 flex flex-col items-center justify-between'
              style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}>

              <div className='h-24 flex justify-center'>
                <img
                  className='w-32 h-24'
                  alt='Pints logo of a gear'
                  style={{ filter: 'invert(52%) sepia(95%) saturate(1036%) hue-rotate(64deg) brightness(123%) contrast(109%)' }}
                  src={pintGearLogoUrl} />
                <div className='w-3/12'>
                  <EthereumLogoSvg />
                </div>
              </div>

              <div className='text-center leading-none text-gray-100 text-3xl mt-6'>ETH_PINT UNI-V2 LP</div>

              <div className='mt-12'>
                <p className='text-5xl font-bold text-white'>0.000</p>
                <div className='text-center leading-none text-gray-300 text-xl mt-4'>Tokens Staked</div>
              </div>

              <div className='mt-8'>
                <p className='text-5xl font-bold text-white'>0.000</p>
                <div className='text-center leading-none text-gray-300 text-xl mt-4'>Locked Tokens Staked</div>
              </div>

              <div className='mt-12'>
                <button className='rounded-full px-12 py-4 font-bold border text-accent-green border-solid border-accent-green'>
                  Approve
                </button>
              </div>
            </div>
          </div>
          <p className='mt-8 text-center'>
            Every time you stake and unstake LP tokens, the contract will automatically harvest PINT rewards for you
          </p>
        </section>
      </SectionPadding>

      <PageFooter />
    </div>
  )
}

