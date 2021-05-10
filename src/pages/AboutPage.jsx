import React from 'react'
import { FaqSection } from '../components/FaqSection'
import { PageFooter } from '../components/PageFooter'
import { SectionPadding } from '../components/SectionPadding'
import { HeaderBackground } from '../components/HeaderBackground'

export const AboutPage = () => {
  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='text-white'>
      <header className='relative pt-36 xl:pt-48 pb-48 xl:pb-60 text-center flex flex-col items-center'>
        <HeaderBackground />
        <h1
          className='relative z-10 font-bold text-6xl xl:text-9xl leading-none'>
          About
        </h1>
        <p className='relative z-10 text-2xl xl:text-5xl mt-10 xl:mt-16'>
          What we know about PINT
        </p>
      </header>

      <SectionPadding>
        <section className='max-w-screen-2xl mx-auto mb-48'>
          <h2 className='font-bold text-4xl xl:text-7xl'>Grab Yourself a PINT</h2>

          <p className='mt-8 xl:mt-20 text-xl leading-relaxed opacity-75'>
            PINT launched as a standard fair-launch farming coin in September 2020. Through a small unstaking tax on our upwards of $5,000,000 farming TVL, PINT raised a modest Community-Governed Warchest which is being used to fund development of innovative and engaging products for the pub.finance ecosystem.
          </p>

          <p className='mt-8 text-xl leading-relaxed opacity-75'>
            PINT’s flagship product, “Wen Rug” is a re-envisioning of the popular crash game, Moneypot; fleshed out and gamified with hot streaks, achievement badges, defi memes, bonuses, and more. While most crash games pay 50% of revenue to investors in the house pool and keep back 50% for the site owners, with PINT you are the “owners” of Wen Rug. User fees from the game are paid out to PINT stakers. Stake your PINT to earn a voice in the community’s governance, and direct use of funds in the CGW towards PINT buybacks or additional development–all the while earning revenue from Wen Rug and more. Own your play.
          </p>
        </section>
      </SectionPadding>

      <SectionPadding>
        <section className='max-w-screen-2xl mx-auto mb-48'>
          <h2 className='font-bold text-4xl xl:text-5xl xl:leading-tight text-center'>
            Check out PINT’s litepaper for more details
          </h2>

          <div className='flex justify-center'>
            <a href='https://pubfinance.medium.com/pint-litepaper-c0cb3525fb6a' target='_blank' rel='noreferrer'>
              <button
                className='bg-accent-green mt-16 rounded-full text-xl px-8 py-5 text-green-900 flex justify-between items-center bg-accent-green'>
                <span className='font-semibold'>READ PAPER</span>
              </button>
            </a>
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

