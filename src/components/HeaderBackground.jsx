import React from 'react'

export const HeaderBackground = () => {
  return (
    <>
      <div
        className='w-full h-full absolute opacity-50 top-0'
        style={{ background: 'linear-gradient(0deg, rgba(11,19,43,1) 0%, rgba(68,255,1,1) 100%)' }}>
      </div>
      <div className='bottom-0 absolute w-full'>
        <svg viewBox='0 0 900 200' xmlns='http://www.w3.org/2000/svg' version='1.1'>
          <rect x='0' y='0' width='900' height='200' fill='none'></rect>
          <path d='M0 160L16.7 139.8C33.3 119.7 66.7 79.3 100 75.2C133.3 71 166.7 103 200 111.7C233.3 120.3 266.7 105.7 300 104.8C333.3 104 366.7 117 400 111.3C433.3 105.7 466.7 81.3 500 67.2C533.3 53 566.7 49 600 65C633.3 81 666.7 117 700 121.7C733.3 126.3 766.7 99.7 800 88.7C833.3 77.7 866.7 82.3 883.3 84.7L900 87L900 201L883.3 201C866.7 201 833.3 201 800 201C766.7 201 733.3 201 700 201C666.7 201 633.3 201 600 201C566.7 201 533.3 201 500 201C466.7 201 433.3 201 400 201C366.7 201 333.3 201 300 201C266.7 201 233.3 201 200 201C166.7 201 133.3 201 100 201C66.7 201 33.3 201 16.7 201L0 201Z' fill='rgb(11, 19, 43)' strokeLinecap='round' strokeLinejoin='miter'></path>
        </svg>
      </div>
    </>
  )
}
