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
      <header className='relative pt-32 text-center flex flex-col items-center pb-96'>
        <HeaderBackground />
        <PintLogoSvg />
        <p className='text-3xl xl:text-5xl mt-12 relative z-10'>
          Own Your Play
        </p>
      </header>

      <SectionPadding>
        <section className='-mt-60 relative space-y-16 xl:space-y-0 xl:space-x-16 flex flex-col xl:flex-row justify-between max-w-screen-2xl mx-auto'>
          <Link to='/vaults' className='w-full'>
            <div
              className='px-8 py-6 rounded-3xl shadow-xl w-full h-full flex flex-col justify-between'
              style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}>
              <div>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke={ACCENT_GREEN}>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' />
                </svg>
              </div>

              <h3 className='text-center leading-none text-xl xl:text-3xl font-bold mt-4'>Stake PINT. Earn Yield.</h3>

              <p className='mt-2 text-xl'></p>

              <div className='mt-4 text-lg flex justify-end items-center text-accent-green'>
                <div>Stake PINT</div>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 ml-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14 5l7 7m0 0l-7 7m7-7H3' />
                </svg>
              </div>
            </div>
          </Link>

          {/* <a href='http://wenrug.com' target='_blank' rel='noreferrer' className='w-full'> */}
          <div className='w-full'>
            <div
              className='px-8 py-6 rounded-3xl shadow-xl w-full h-full flex flex-col justify-between'
              style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}>
              <div>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke={ACCENT_GREEN}>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
              </div>

              <h3 className='text-center leading-none text-xl xl:text-3xl font-bold mt-4'>WenRug (soon)</h3>

              <p className='mt-2 text-xl'></p>

                <div className='opacity-0 pointer-events-none mt-4 text-lg flex justify-end items-center text-accent-green'>
                  <div>wenrug.com</div>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 ml-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14 5l7 7m0 0l-7 7m7-7H3' />
                  </svg>
                </div>
            </div>
          </div>
          {/* </a> */}

          <Link to='/community' className='w-full'>
            <div
              className='px-8 py-6 rounded-3xl shadow-xl w-full h-full flex flex-col justify-between'
              style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}>
              <div>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke={ACCENT_GREEN}>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' />
                </svg>
              </div>

              <h3 className='text-center leading-none text-xl xl:text-3xl font-bold mt-4'>Check out the Community</h3>

              <p className='mt-2 text-xl'></p>

              <div className='mt-4 text-lg flex justify-end items-center text-accent-green'>
                <div>Join</div>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 ml-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14 5l7 7m0 0l-7 7m7-7H3' />
                </svg>
              </div>
            </div>
          </Link>
        </section>
      </SectionPadding>

      <SectionPadding>
        <section className='text-center max-w-screen-2xl mx-auto my-36'>
          <h2 className='font-bold text-4xl xl:text-7xl'>Tired of Losing to the House?</h2>
          <p className='mt-8 text-xl xl:text-xl leading-relaxed opacity-75'>
            Tired of losing to the house? With PINT you are the house. Stake PINT tokens to receive user fees from WenRug and future pub.finance ecosystem products. Use your staking weight to govern the future of the project and direct the use of the Community Governed Warchest. Fair launch, fair ownership, fair play--Grab a pint.
          </p>
        </section>
      </SectionPadding>

      <SectionPadding>
        <section className='max-w-screen-2xl mx-auto my-36'>
          <div className='flex flex-col-reverse xl:flex-row'>
            <div className='flex-grow mt-24 xl:mt-0'>
              <h2 className='font-bold text-4xl xl:text-7xl'>About PINT</h2>
              <p className='mt-8 text-xl xl:text-xl leading-relaxed opacity-75'>
                PINT launched as a standard fair-launch farming coin in September 2020. Through a small unstaking tax on our upwards of $5,000,000 farming TVL, PINT raised a modest Community-Governed Warchest which is being used to fund development of innovative and engaging products for the pub.finance ecosystem.
              </p>

              <div className='flex flex-col items-center xl:flex-row space-y-2 xl:space-y-0 xl:space-x-8'>
                <Link to='/about'>
                  <button
                    className='bg-accent-green mt-8 xl:mt-16 rounded-full text-green-900 text-xl px-8 py-5 flex justify-between items-center'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <span className='ml-4 font-semibold'>Learn More</span>
                  </button>
                </Link>

                <Link to='/community'>
                  <button
                    className='mt-8 xl:mt-16 rounded-full border-4 border-accent-green border-solid text-xl px-8 py-5 flex justify-between items-center'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke={ACCENT_GREEN}>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                    </svg>
                    <span className='ml-4 font-semibold'>Community</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className='mx-auto xl:ml-24'>
              <div
                className='w-64 h-64 xl:w-96 xl:h-96 flex items-center justify-center pt-4'>
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

