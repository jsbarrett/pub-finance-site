import React from 'react'
import { FaqSection } from '../components/FaqSection'
import { PageFooter } from '../components/PageFooter'
import { SectionPadding } from '../components/SectionPadding'
import { HeaderBackground } from '../components/HeaderBackground'

export const AboutPage = () => {
  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='text-white'>
      <header className='relative flex flex-col items-center pb-48 text-center pt-36 xl:pt-48 xl:pb-60'>
        <HeaderBackground />
      </header>

      <div className='relative -mt-36'>
        <SectionPadding>
          <section className='mx-auto mb-48 max-w-screen-2xl'>
            <h2 className='text-4xl font-bold xl:text-7xl'>Grab Yourself a PINT</h2>

            <p className='mt-8 text-xl leading-relaxed opacity-75 xl:mt-20'>
              PINT launched as a standard fair-launch farming coin in September 2020. Through a small unstaking tax on our upwards of $5,000,000 farming TVL, PINT raised a modest Community-Governed Warchest which is being used to fund development of innovative and engaging products for the pub.finance ecosystem.
            </p>

            <p className='mt-8 text-xl leading-relaxed opacity-75'>
              PINT’s flagship product,
              {/* <a className="text-accent-green mx-2" href="https://beta.wenrug.com" target="_blank" rel="noreferrer"> */}
                WenRug,
              {/* </a> */}
              is a re-envisioning of the popular crash game, Moneypot; fleshed out and gamified with hot streaks, achievement badges, defi memes, bonuses, and more. While most crash games pay 50% of revenue to investors in the house pool and keep back 50% for the site owners, with PINT you are the “owners” of WenRug. User fees from the game are paid out to PINT stakers. Stake your PINT to earn a voice in the community’s governance, and direct use of funds in the CGW towards PINT buybacks or additional development–all the while earning revenue from WenRug and more. Own your play.
            </p>
          </section>
        </SectionPadding>
      </div>

      <SectionPadding>
        <section className='mx-auto mb-48 max-w-screen-2xl'>
          <h2 className='text-4xl font-bold text-center xl:text-5xl xl:leading-tight'>
            Check out PINT’s litepaper for more details
          </h2>

          <div className='flex justify-center'>
            <a href='https://pubfinance.medium.com/pint-litepaper-c0cb3525fb6a' target='_blank' rel='noreferrer'>
              <button
                className='flex items-center justify-between px-8 py-5 mt-16 text-xl text-green-900 rounded-full bg-accent-green'>
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

