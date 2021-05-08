import React, { useState } from 'react'

// UNUSED ... was being used in VaultPage

export const AddLiquidity = () => {
  const [selectedDuration, setSelectedDuration] = useState('Unlocked')

  const durations = [ 'Unlocked', '1 week', '1 month', '3 months', '6 months', '1 year' ]

  const addLiquidity = () => {}

  return (
    <div>
      <h2 className='font-bold text-4xl xl:text-7xl mt-24'>Add Liquidity</h2>

      <div
        className='mt-12 rounded-3xl py-4 px-12 shadow-xl'
        style={{ background: 'rgb(12,12,97)' }}>
        <Table
          assets='ETH PINT LP'
          apy='6.24%'
          interest='.00456'
          durations={durations}
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
          action={addLiquidity}
          actionLabel='Add Liquidity'
        />
      </div>
    </div>
  )
}


