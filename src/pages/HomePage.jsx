import React from 'react'
import { Link } from 'react-router-dom'

import { FaqSection } from '../components/FaqSection'
import { PageFooter } from '../components/PageFooter'
import { SectionPadding } from '../components/SectionPadding'
import { PintLogoSvg } from '../components/PintLogoSvg'
import { HeaderBackground } from '../components/HeaderBackground'
import pintGearLogoUrl from '../pint-gear-logo.svg'
import { ACCENT_GREEN } from '../styles'

export const HomePage = () => {
  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='text-white'>
      <header className='relative flex flex-col items-center pt-32 text-center pb-96'>
        <HeaderBackground />
        <PintLogoSvg />
        <p className='relative z-10 mt-12 text-3xl xl:text-5xl'>
          Own Your Play
        </p>
      </header>

      <SectionPadding>
        <section className='relative flex flex-col justify-between mx-auto -mt-60 space-y-16 xl:space-y-0 xl:space-x-16 xl:flex-row max-w-screen-2xl'>
          <Link to='/vaults' className='w-full'>
            <div
              className='flex flex-col justify-between w-full h-full px-8 py-6 shadow-xl rounded-3xl'
              style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}>
              <div>
                <svg xmlns='http://www.w3.org/2000/svg' className='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke={ACCENT_GREEN}>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' />
                </svg>
              </div>

              <h3 className='mt-4 text-xl font-bold leading-none text-center xl:text-3xl'>Stake PINT. Earn Yield.</h3>

              <p className='mt-2 text-xl'></p>

              <div className='flex items-center justify-end mt-4 text-lg text-accent-green'>
                <div>Stake PINT</div>
                <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 ml-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14 5l7 7m0 0l-7 7m7-7H3' />
                </svg>
              </div>
            </div>
          </Link>

          {/* <a href='https://beta.wenrug.com' target='_blank' rel='noreferrer' className='w-full'> */}
            <div className='w-full'>
              <div
                className='flex flex-col justify-between w-full h-full px-8 py-6 shadow-xl rounded-3xl'
                style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}>
                <div>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke={ACCENT_GREEN}>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                  </svg>
                </div>

                <h3 className='mt-4 text-xl font-bold leading-none text-center xl:text-3xl'>
                  WenRug Beta
                </h3>

                <p className='mt-2 text-xl text-center'>(coming soon)</p>

                  <div className='flex items-center justify-end mt-4 text-lg opacity-0 pointer-events-none text-accent-green'>
                    <div>wenrug.com</div>
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 ml-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14 5l7 7m0 0l-7 7m7-7H3' />
                    </svg>
                  </div>
              </div>
            </div>
          {/* </a> */}

          <Link to='/community' className='w-full'>
            <div
              className='flex flex-col justify-between w-full h-full px-8 py-6 shadow-xl rounded-3xl'
              style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}>
              <div>
                <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke={ACCENT_GREEN}>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' />
                </svg>
              </div>

              <h3 className='mt-4 text-xl font-bold leading-none text-center xl:text-3xl'>Check out the Community</h3>

              <p className='mt-2 text-xl'></p>

              <div className='flex items-center justify-end mt-4 text-lg text-accent-green'>
                <div>Join</div>
                <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 ml-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14 5l7 7m0 0l-7 7m7-7H3' />
                </svg>
              </div>
            </div>
          </Link>
        </section>
      </SectionPadding>

      <SectionPadding>
        <section className='mx-auto text-center max-w-screen-2xl my-36'>
          <h2 className='text-4xl font-bold xl:text-7xl'>Tired of Losing to the House?</h2>
          <p className='mt-8 text-xl leading-relaxed opacity-75 xl:text-xl'>
            Tired of losing to the house?
            With PINT you are the house.
            Stake PINT tokens to receive user fees from
            {/* <a className="text-accent-green mx-2" href="https://beta.wenrug.com" target="_blank" rel="noreferrer"> */}
              &nbsp;WenRug&nbsp;
            {/* </a> */}
            and future pub.finance ecosystem products.
            Use your staking weight to govern the future of the project and direct the use of the Community Governed Warchest.
            Fair launch, fair ownership, fair play--Grab a pint.
          </p>
        </section>
      </SectionPadding>

      <SectionPadding>
        <section className='mx-auto max-w-screen-2xl my-36'>
          <div className='flex flex-col-reverse xl:flex-row'>
            <div className='flex-grow mt-24 xl:mt-0'>
              <h2 className='text-4xl font-bold xl:text-7xl'>About PINT</h2>
              <p className='mt-8 text-xl leading-relaxed opacity-75 xl:text-xl'>
                PINT launched as a standard fair-launch farming coin in September 2020. Through a small unstaking tax on our upwards of $5,000,000 farming TVL, PINT raised a modest Community-Governed Warchest which is being used to fund development of innovative and engaging products for the pub.finance ecosystem.
              </p>

              <div className='flex flex-col items-center xl:flex-row space-y-2 xl:space-y-0 xl:space-x-8'>
                <Link to='/about'>
                  <button
                    className='flex items-center justify-between px-8 py-5 mt-8 text-xl text-green-900 rounded-full bg-accent-green xl:mt-16'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <span className='ml-4 font-semibold'>Learn More</span>
                  </button>
                </Link>

                <Link to='/community'>
                  <button
                    className='flex items-center justify-between px-8 py-5 mt-8 text-xl border-4 border-solid rounded-full xl:mt-16 border-accent-green'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke={ACCENT_GREEN}>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                    </svg>
                    <span className='ml-4 font-semibold'>Community</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className='mx-auto xl:ml-24'>
              <div
                className='flex items-center justify-center w-64 h-64 pt-4 xl:w-96 xl:h-96'>
                <img
                  alt='Pints logo of a gear'
                  style={{ filter: 'invert(52%) sepia(95%) saturate(1036%) hue-rotate(64deg) brightness(123%) contrast(109%)' }}
                  className='w-full' src={pintGearLogoUrl} />
              </div>
            </div>
          </div>
        </section>
      </SectionPadding>

      <SectionPadding>
        <FaqSection />
      </SectionPadding>

      <PageFooter />
    </div>
  )
}

