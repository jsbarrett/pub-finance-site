import React from 'react'
import { HeaderBackground } from '../../components/HeaderBackground'
import { PageFooter } from '../../components/PageFooter'
import { SectionPadding } from '../../components/SectionPadding'

export const NoVault = () => {
  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='relative text-white'>
      <header className='relative flex flex-col items-center pb-48 text-center pt-36 xl:pt-48 xl:pb-60'>
        <HeaderBackground />
        <h1
          className='relative z-10 text-6xl font-bold leading-none xl:text-9xl'>
          Vaults
        </h1>
        <p className='relative z-10 mt-10 text-2xl xl:text-5xl xl:mt-16'>
          Flexible Deposits, Higher Profits.
        </p>
      </header>

      <SectionPadding>
        <section className='mx-auto mb-24 max-w-screen-2xl xl:mb-48'>
          <h2 className='mt-8 text-3xl leading-relaxed text-center'>
            Sorry, there's no vault for this chain yet!<br />
            If you would like us to consider adding<br />
            a specific chain to the PINT ecosystem,<br />
            let us know!
          </h2>
        </section>
      </SectionPadding>

      <PageFooter />
    </div>
  )
}
