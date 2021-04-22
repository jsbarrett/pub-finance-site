import React from 'react'
import { FaqSection } from '../components/FaqSection'
import { PageFooter } from '../components/PageFooter'

export const AboutPage = () => {
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
          About
        </h1>
        <p className='relative z-10 text-2xl xl:text-5xl mt-10 xl:mt-16'>
          What we know about PINT
        </p>
      </header>

      <section className='max-w-screen-2xl mx-auto px-2 md:px-24 lg:px-64 xl:px-12 mb-48'>
        <h2 className='font-bold text-4xl xl:text-7xl'>Grab Yourself a PINT</h2>

        <p className='mt-10 xl:mt-20 text-xl xl:text-3xl leading-relaxed'>
          PINT launched as a standard fair-launch farming coin in September 2020. Through a small unstaking tax on our upwards of $5,000,000 farming TVL, PINT raised a modest Community-Governed Warchest (CGW) which is being used to fund development of innovative and engaging products for the pub.finance ecosystem.
        </p>

        <p className='mt-10 text-xl xl:text-3xl leading-relaxed'>
          PINT’s flagship product, “When Rug” is a re-envisioning of the popular crash game, Moneypot; fleshed out and gamified with hot streaks, achievement badges, defi memes, bonuses, and more.
        </p>
      </section>

      <section className='max-w-screen-2xl mx-auto px-2 md:px-24 lg:px-64 xl:px-12 mb-48'>
        <h2 className='font-bold text-4xl xl:text-7xl text-center'>
          PINT Litepaper
        </h2>

        <div className='flex flex-wrap justify-center mt-12'>
          <p className='text-xl xl:text-3xl text-center'>
            While most crash games pay 50% of revenue to investors in the house pool and keep back 50% for the site owners, with PINT you are the “owners” of When Rug. User fees from the game are paid out to PINT stakers. Stake your PINT to earn a voice in the community’s governance, and direct use of funds in the CGW towards PINT buybacks or additional development–all the while earning revenue from When Rug and more. Own your play.
          </p>
        </div>

        <div className='flex justify-center'>
          <a href='https://pubfinance.medium.com/pint-litepaper-c0cb3525fb6a' target='_blank' rel='noreferrer'>
            <button
              className='bg-accent-green mt-16 rounded-full text-xl px-8 py-5 text-gray-900 flex justify-between items-center bg-accent-green'>
              <span className='font-semibold'>READ PAPER</span>
            </button>
          </a>
        </div>
      </section>

      <FaqSection />

      <PageFooter />
    </div>
  )
}

