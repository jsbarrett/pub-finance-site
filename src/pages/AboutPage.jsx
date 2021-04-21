import React from 'react'
import { FaqSection } from '../components/FaqSection'
import { PageFooter } from '../components/PageFooter'

export const AboutPage = () => {
  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='text-white'>
      <header className='relative pt-48 pb-96 text-center flex flex-col items-center'>
        <div
          className='w-full h-full absolute opacity-50 top-0'
          style={{ background: 'linear-gradient(0deg, rgba(11,19,43,1) 0%, rgba(68,255,1,1) 100%)' }}>
        </div>
        <h1
          className='relative z-10 font-bold text-9xl leading-none'>
          About
        </h1>
        <p className='relative z-10 text-5xl mt-16'>
          What we know about PINT
        </p>
      </header>

      <section className='max-w-screen-2xl mx-auto px-12 mb-48'>
        <h2 className='font-bold text-7xl'>Grab Yourself a PINT</h2>

        <p className='mt-20 text-3xl leading-relaxed'>
          PINT launched as a standard fair-launch farming coin in September 2020. Through a small unstaking tax on our upwards of $5,000,000 farming TVL, PINT raised a modest Community-Governed Warchest (CGW) which is being used to fund development of innovative and engaging products for the pub.finance ecosystem.
        </p>

        <p className='mt-10 text-3xl leading-relaxed'>
          PINT’s flagship product, “When Rug” is a re-envisioning of the popular crash game, Moneypot; fleshed out and gamified with hot streaks, achievement badges, defi memes, bonuses, and more.
        </p>
      </section>

      <section className='max-w-screen-2xl mx-auto px-12 mb-48'>
        <h2 className='font-bold text-7xl text-center'>
          PINT Litepaper
        </h2>

        <div className='flex flex-wrap justify-center mt-12'>
          <p className='text-3xl text-center'>
            While most crash games pay 50% of revenue to investors in the house pool and keep back 50% for the site owners, with PINT you are the “owners” of When Rug. User fees from the game are paid out to PINT stakers. Stake your PINT to earn a voice in the community’s governance, and direct use of funds in the CGW towards PINT buybacks or additional development–all the while earning revenue from When Rug and more. Own your play.
          </p>
        </div>

        <div className='flex justify-center'>
          <a href='https://pubfinance.medium.com/pint-litepaper-c0cb3525fb6a' target='_blank'>
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

