import { useState, useEffect } from 'react'
import { HeaderBackground } from '../../../components/HeaderBackground'
import { PageFooter } from '../../../components/PageFooter'
import { SectionPadding } from '../../../components/SectionPadding'

export const GoerliVaultFactory = ({ backend }) => {
  const [amountStaked, setAmountStaked] = useState('0')
  const [unclaimedRewards, setUnclaimedRewards] = useState('0')
  const [addStakeAmount, setAddStakeAmount] = useState('0')
  const [pintBalance, setPintBalance] = useState('0')
  const [unstakeAmount, setUnstakeAmount] = useState('0')

  // TODO: error handling
  useEffect(() => {
    backend.getAmountStaked().then(setAmountStaked)
    backend.getUnclaimedRewards().then(setUnclaimedRewards)
    backend.getPINTBalance().then(setPintBalance)
  }, [backend])

  // TODO: error handling
  const stakePint = async () => {
    try {
      await backend.stakePINT(addStakeAmount) 
      await backend.getAmountStaked().then(setAmountStaked)
    } catch (err) {
      console.error(err)
    }
  }

  const unstakePint = async () => {
    try {
      await backend.unstakePINT(unstakeAmount)
      setUnstakeAmount('0')

      backend.getAmountStaked().then(setAmountStaked)
    } catch (err) {
      console.error(err)
      alert('Sorry there was a problem unstaking your PINT')
    }
  }

  const unstakeAll = async () => {
    try {
      await backend.unstakePINT(amountStaked)
      setUnstakeAmount('0')

      backend.getAmountStaked().then(setAmountStaked)
    } catch (err) {
      console.error(err)
      alert('Sorry there was a problem unstaking your PINT')
    }
  }

  const maxStakeAmount = () => setAddStakeAmount(pintBalance)

  return (
    <GoerliVaultView
      amountStaked={amountStaked}
      unclaimedRewards={unclaimedRewards}
      stakePint={stakePint}
      unstakePint={unstakePint}
      claimRewards={backend.claimRewards}
      addStakeAmount={addStakeAmount}
      setAddStakeAmount={setAddStakeAmount}
      mintPINT={backend.mintPINT}
      pintBalance={pintBalance}
      unstakeAmount={unstakeAmount}
      setUnstakeAmount={setUnstakeAmount}
      maxStakeAmount={maxStakeAmount}
      unstakeAll={unstakeAll}
    />
  )
}

export const GoerliVaultView = ({
  stakePint,
  unstakePint,
  amountStaked,
  unclaimedRewards,
  claimRewards,
  addStakeAmount,
  setAddStakeAmount,
  mintPINT,
  pintBalance,
  unstakeAmount,
  setUnstakeAmount,
  maxStakeAmount,
  unstakeAll,
}) => {
  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='relative text-white'>
      <header className='relative flex flex-col items-center pb-48 text-center pt-36 xl:pt-48 xl:pb-60'>
        <HeaderBackground />
        <h1
          className='relative z-10 text-6xl font-bold leading-none xl:text-8xl'>
          Vaults (Goerli)
        </h1>
        <p className='relative z-10 mt-10 text-2xl xl:text-4xl xl:mt-16'>
          Flexible Deposits, Higher Profits.
        </p>
      </header>

      <SectionPadding>
        <section className='mx-auto mb-24 max-w-screen-2xl xl:mb-48'>
          <div className='flex justify-center'>
            <div
              className='px-16 py-16 rounded-lg'
              style={{ background: 'linear-gradient(180deg, #0C0C61 0%, #05052D 200%)' }}>

              <div className='text-3xl font-bold text-center'>Stake PINT</div>

              <div className='mt-16'>
                <div className='opacity-80'>balance:</div>
                <div className='flex justify-between'>
                  <div onClick={maxStakeAmount} className='text-4xl'>{pintBalance} PINT</div>
                </div>
              </div>

              <div className='flex justify-between mt-8'>
                <div className='flex'>
                  <input
                    placeholder={'Add Stake'}
                    className='px-2 py-2 text-xl bg-transparent border border-gray-300 border-solid rounded'
                    value={addStakeAmount}
                    onChange={evt => setAddStakeAmount(evt.target.value) }
                  />
                  <button
                    onClick={maxStakeAmount}
                    className='px-4 ml-4 font-bold border rounded text-white border-white'>
                    max
                  </button>
                </div>
                <button
                  onClick={stakePint}
                  className='w-24 px-2 ml-4 font-bold border rounded text-accent-green border-accent-green'>
                  stake
                </button>

              </div>
              <button
                onClick={mintPINT}
                className='mt-2 text-gray-400'>
                (click here if you need to mint some goerli PINT)
              </button>


              <div className='mt-8'>
                <div className='opacity-80'>amount staked:</div>
                <div className='flex justify-between'>
                  <div onClick={unstakeAll} className='text-4xl'>{amountStaked} PINT</div>
                </div>
              </div>

              <div className='flex justify-between mt-4'>
                <div className='flex'>
                  <input
                    placeholder={'Add Stake'}
                    className='px-2 py-2 text-xl bg-transparent border border-gray-300 border-solid rounded'
                    value={unstakeAmount}
                    onChange={evt => setUnstakeAmount(evt.target.value) }
                  />

                  <button
                    onClick={unstakeAll}
                    className='px-4 ml-4 font-bold border rounded text-gray-300 border-gray-300'>
                    all
                  </button>
                </div>

                <button
                  onClick={unstakePint}
                  className='w-24 px-2 ml-4 text-gray-300 border border-gray-300 rounded'>
                  unstake
                </button>
              </div>

              <hr className='my-16 border' />

              <div className='opacity-80'>unclaimed rewards:</div>
              <div className='flex justify-between'>
                (not available to show from this page yet ... coming soon)
                {/* <div className='text-4xl text-accent-green'>{unclaimedRewards} PINT</div> */}
                {/* <button */}
                {/*   onClick={claimRewards} */}
                {/*   className='w-24 px-2 ml-4 font-bold border rounded text-accent-green border-accent-green'> */}
                {/*   claim */}
                {/* </button> */}
              </div>

            </div>
          </div>
        </section>
      </SectionPadding>

      <PageFooter />
    </div>
  )
}

