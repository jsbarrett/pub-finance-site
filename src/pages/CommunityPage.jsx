import React from 'react'
import { PageFooter } from '../components/PageFooter'

import { ACCENT_GREEN } from '../styles'

export const CommunityPage = () => {
  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='text-white'>
      <header className='relative pt-48 pb-96 text-center flex flex-col items-center'>
        <div
          className='w-full h-full absolute opacity-50 top-0'
          style={{ background: 'linear-gradient(0deg, rgba(11,19,43,1) 0%, rgba(68,255,1,1) 100%)' }}>
        </div>
        <h1
          className='relative z-10 font-bold text-9xl leading-none'>
          Our Community
        </h1>
      </header>

      <section className='max-w-screen-2xl mx-auto px-12 mb-48'>
        <h2 className='font-bold text-7xl'>Decentralized</h2>

        <p className='mt-20 text-3xl leading-relaxed'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        </p>
      </section>

      <section className='max-w-screen-2xl mx-auto px-12 mb-48'>
        <h2 className='font-bold text-7xl text-center'>
          Come Check Us Out
        </h2>

        <div className='flex flex-wrap justify-center mt-8'>
          <a
            href='https://snapshot.org/#/pub-finance.eth'
            target='_blank'
            className='w-full text-2xl font-bold md:w-1/3 lg:w-1/5 h-48 rounded-3xl shadow-xl my-4 mx-2 lg:mx-4 flex justify-center items-center'
            style={{ background: 'rgb(12,12,97)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke={ACCENT_GREEN}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            <div className="ml-2">GOVERNANCE</div>
          </a>
          <a
            href='https://t.me/PubFin'
            target='_blank'
            className='w-full text-2xl font-bold md:w-1/3 lg:w-1/5 h-48 rounded-3xl shadow-xl my-4 mx-2 lg:mx-4 flex justify-center items-center'
            style={{ background: 'rgb(12,12,97)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 128 128">
              <g fill="none" fill-rule="evenodd">
                <circle cx="64" cy="64" r="64" fill="none" fill-rule="nonzero"/>
                <path fill={ACCENT_GREEN} fill-rule="nonzero" d="M28.9700376,63.3244248 C47.6273373,55.1957357 60.0684594,49.8368063 66.2934036,47.2476366 C84.0668845,39.855031 87.7600616,38.5708563 90.1672227,38.528 C90.6966555,38.5191258 91.8804274,38.6503351 92.6472251,39.2725385 C93.294694,39.7979149 93.4728387,40.5076237 93.5580865,41.0057381 C93.6433345,41.5038525 93.7494885,42.63857 93.6651041,43.5252052 C92.7019529,53.6451182 88.5344133,78.2034783 86.4142057,89.5379542 C85.5170662,94.3339958 83.750571,95.9420841 82.0403991,96.0994568 C78.3237996,96.4414641 75.5015827,93.6432685 71.9018743,91.2836143 C66.2690414,87.5912212 63.0868492,85.2926952 57.6192095,81.6896017 C51.3004058,77.5256038 55.3966232,75.2369981 58.9976911,71.4967761 C59.9401076,70.5179421 76.3155302,55.6232293 76.6324771,54.2720454 C76.6721165,54.1030573 76.7089039,53.4731496 76.3346867,53.1405352 C75.9604695,52.8079208 75.4081573,52.921662 75.0095933,53.0121213 C74.444641,53.1403447 65.4461175,59.0880351 48.0140228,70.8551922 C45.4598218,72.6091037 43.1463059,73.4636682 41.0734751,73.4188859 C38.7883453,73.3695169 34.3926725,72.1268388 31.1249416,71.0646282 C27.1169366,69.7617838 23.931454,69.0729605 24.208838,66.8603276 C24.3533167,65.7078514 25.9403832,64.5292172 28.9700376,63.3244248 Z"/>
              </g>
            </svg>
            <div className="ml-2">TELEGRAM</div>
          </a>
          <a
            href='https://twitter.com/Pub_Finance'
            target='_blank'
            className='w-full text-2xl font-bold md:w-1/3 lg:w-1/5 h-48 rounded-3xl shadow-xl my-4 mx-2 lg:mx-4 flex justify-center items-center'
            style={{ background: 'rgb(12,12,97)' }}>
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke={ACCENT_GREEN}>
              <g>
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </g>
            </svg>
            <div className="ml-2">TWITTER</div>
          </a>
        </div>
      </section>

      <section className='max-w-screen-2xl mx-auto px-12 mb-48'>
        <h2 className='font-bold text-7xl text-center'>
          VIP
        </h2>

        <div className='flex flex-wrap justify-center mt-12'>
          <p className='text-3xl text-center'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </p>
        </div>
      </section>

      <PageFooter />
    </div>
  )
}

