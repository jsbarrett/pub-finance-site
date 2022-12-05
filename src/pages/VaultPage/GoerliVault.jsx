import { HeaderBackground } from '../../components/HeaderBackground'
import { PageFooter } from '../../components/PageFooter'
import { SectionPadding } from '../../components/SectionPadding'

export const GoerliVault = () => {
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
          <div className='flex justify-center'>
            <div
              className='px-16 py-32 rounded'
              style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}>

              <div className='text-3xl font-bold text-center'>Stake PINT</div>

              <div className='mt-16'>
                <div className='opacity-80'>amount staked:</div>
                <div className='flex justify-between'>
                  <div className='text-4xl'>5000 PINT</div>
                  <button className='w-24 px-2 ml-4 text-gray-300 border border-gray-300 rounded'>unstake</button>
                </div>
              </div>

              <div className='flex justify-between mt-8'>
                <input placeholder={'Add Stake'} className='px-2 py-2 text-xl bg-transparent border border-gray-300 border-solid rounded' />
                <button className='w-24 px-2 ml-4 font-bold border rounded text-accent-green border-accent-green'>stake</button>
              </div>

              <hr className='my-16 border' />

              <div className='opacity-80'>unclaimed rewards:</div>
              <div className='flex justify-between'>
                <div className='text-4xl text-accent-green'>5000 PINT</div>
                <button className='w-24 px-2 ml-4 font-bold border rounded text-accent-green border-accent-green'>claim</button>
              </div>

              <p className='mt-32'>(note: these numbers are placeholders until smart contracts are wired up)</p>

            </div>
          </div>
        </section>
      </SectionPadding>

      <PageFooter />
    </div>
  )
}

