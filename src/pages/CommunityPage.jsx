import React from 'react'
import { PageFooter } from '../components/PageFooter'
import { SectionPadding } from '../components/SectionPadding'
import { HeaderBackground } from '../components/HeaderBackground'

import { ACCENT_GREEN } from '../styles'

const LinkOut = ({ href, children }) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className='w-full text-2xl font-bold md:w-1/3 xl:w-4/12 h-24 xl:h-48 rounded-3xl shadow-xl my-4 mx-2 lg:mx-4 flex justify-center items-center'
      style={{ background: 'rgb(12,12,97)' }}>
      { children }
    </a>
  )
}

export const CommunityPage = () => {
  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='text-white'>
      <header className='relative pt-36 xl:pt-48 pb-48 xl:pb-96 text-center flex flex-col items-center'>
        <HeaderBackground />
        <h1
          className='relative z-10 font-bold text-6xl xl:text-9xl leading-none'>
          Our Community
        </h1>
      </header>

      <section className='max-w-screen-2xl mx-auto px-2 xl:px-12'>
        <h2 className='font-bold text-4xl xl:text-7xl text-center'>
          Join the Community
        </h2>

        <div className='flex flex-wrap justify-center mt-8'>
          <LinkOut href='https://snapshot.org/#/pub-finance.eth'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke={ACCENT_GREEN}>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1' d='M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' />
            </svg>
            <div className='ml-2'>GOVERNANCE</div>
          </LinkOut>

          <LinkOut href='https://t.me/PubFin'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' viewBox='0 0 128 128'>
              <g fill='none' fillRule='evenodd'>
                <circle cx='64' cy='64' r='64' fill='none' fillRule='nonzero'/>
                <path fill={ACCENT_GREEN} fillRule='nonzero' d='M28.9700376,63.3244248 C47.6273373,55.1957357 60.0684594,49.8368063 66.2934036,47.2476366 C84.0668845,39.855031 87.7600616,38.5708563 90.1672227,38.528 C90.6966555,38.5191258 91.8804274,38.6503351 92.6472251,39.2725385 C93.294694,39.7979149 93.4728387,40.5076237 93.5580865,41.0057381 C93.6433345,41.5038525 93.7494885,42.63857 93.6651041,43.5252052 C92.7019529,53.6451182 88.5344133,78.2034783 86.4142057,89.5379542 C85.5170662,94.3339958 83.750571,95.9420841 82.0403991,96.0994568 C78.3237996,96.4414641 75.5015827,93.6432685 71.9018743,91.2836143 C66.2690414,87.5912212 63.0868492,85.2926952 57.6192095,81.6896017 C51.3004058,77.5256038 55.3966232,75.2369981 58.9976911,71.4967761 C59.9401076,70.5179421 76.3155302,55.6232293 76.6324771,54.2720454 C76.6721165,54.1030573 76.7089039,53.4731496 76.3346867,53.1405352 C75.9604695,52.8079208 75.4081573,52.921662 75.0095933,53.0121213 C74.444641,53.1403447 65.4461175,59.0880351 48.0140228,70.8551922 C45.4598218,72.6091037 43.1463059,73.4636682 41.0734751,73.4188859 C38.7883453,73.3695169 34.3926725,72.1268388 31.1249416,71.0646282 C27.1169366,69.7617838 23.931454,69.0729605 24.208838,66.8603276 C24.3533167,65.7078514 25.9403832,64.5292172 28.9700376,63.3244248 Z'/>
              </g>
            </svg>
            <div className='ml-2'>TELEGRAM</div>
          </LinkOut>

          <LinkOut href='https://twitter.com/Pub_Finance'>
            <svg viewBox='0 0 24 24' className='h-8 w-8' fill='none' stroke={ACCENT_GREEN}>
              <g>
                <path d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z'></path>
              </g>
            </svg>
            <div className='ml-2'>TWITTER</div>
          </LinkOut>

          <LinkOut href='https://twitter.com/Pub_Finance'>
            <div className='py-1 px-2 flex justify-center items-center text-accent-green border border-solid border-accent-green rounded-lg'>M</div>
            <div className='ml-4'>MEDIUM</div>
          </LinkOut>
        </div>
      </section>

      <SectionPadding>
        <section className='max-w-screen-2xl mx-auto mb-24 mt-24'>
          <h2 className='font-bold text-4xl xl:text-7xl text-center'>Governance</h2>

          <p className='mt-10 xl:mt-20 text-xl xl:text-3xl leading-relaxed'>
            Take an active role in the community by directing future PINT development and the deployment of PINT’s Community Governed Warchest through our governance portal at Snapshot.org Through this non-custodial decentralized governance system, voting power is derived from held PINT tokens. Publish and vote on proposals to initiate PINT buybacks, hire additional developers, or to build more partnerships for PINT within the defi industry.
          </p>
        </section>
      </SectionPadding>

      <SectionPadding>
        <section className='max-w-screen-2xl mx-auto mb-24 mt-24 xl:mt-48 xl:mb-48'>
          <h2 className='font-bold text-4xl xl:text-7xl text-center'>
            VIP Channel
          </h2>

          <div className='flex flex-wrap justify-center mt-12'>
            <p className='text-xl xl:text-3xl text-center'>
              The Champagne Room is open to PINT’s strongest supporters who wish to engage on a more intimate level with the development team. Get first look at new developments for PINT and Wen Rug! Access is currently limited to individuals who hold a minimum of 5500 PINT tokens.
            </p>
          </div>
        </section>
      </SectionPadding>

      <SectionPadding>
        <section className='max-w-screen-2xl mx-auto mb-24 mt-24 xl:mt-48 xl:mb-48'>
          <h2 className='font-bold text-4xl xl:text-7xl text-center'>
            Resources
          </h2>

          <div className='flex flex-wrap justify-center mt-12'>
            <p className='text-xl xl:text-3xl text-center'>
              <a className='text-accent-green' href='https://app.uniswap.org/#/swap?outputCurrency=0xfecba472b2540c5a2d3700b2c9e06f0aa7dc6462' target='_blank' rel='noreferrer'>Uniswap</a><span className='mx-2'>&bull;</span>
              <a className='text-accent-green' href='https://etherscan.io/token/0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462' target='_blank' rel='noreferrer'>Etherscan</a><span className='mx-2'>&bull;</span>
              <a className='text-accent-green' href='https://www.dextools.io/app/uniswap/pair-explorer/0x8f3869c177090eace770396f9495424780c73537' target='_blank' rel='noreferrer'>Dextools</a><span className='mx-2'>&bull;</span>
              <a className='text-accent-green' href='https://www.coingecko.com/en/coins/pub-finance' target='_blank' rel='noreferrer'>Coingecko</a><span className='mx-2'>&bull;</span>
              <a className='text-accent-green' href='https://coinmarketcap.com/currencies/pub-finance/' target='_blank' rel='noreferrer'>Coinmarketcap</a>
            </p>
          </div>
        </section>
      </SectionPadding>

      <PageFooter />
    </div>
  )
}


