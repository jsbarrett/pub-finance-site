import React from 'react'

export const PageFooter = () => {
  return (
    <footer className='relative space-y-4 text-center text-xl h-96 flex flex-col items-center justify-center px-12'>
      <div
        className='w-full h-full absolute opacity-50 top-0'
        style={{ background: 'linear-gradient(0deg, rgba(68,255,1,1) 0%, rgba(11,19,43,1) 100%)' }}>
      </div>
      <div className='flex space-x-4 relative z-10'>
        <div style={{ borderWidth: '3px' }} className='border-solid border-white p-1 rounded-full'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
          </svg>
        </div>
        <div style={{ borderWidth: '3px' }} className='border-solid border-white p-1 rounded-full'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' />
          </svg>
        </div>
        <div style={{ borderWidth: '3px' }} className='border-solid border-white p-1 rounded-full'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
          </svg>
        </div>
        <div style={{ borderWidth: '3px' }} className='border-solid border-white p-1 rounded-full'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' />
          </svg>
        </div>
      </div>
      <div className='relative z-10'>
        Terms | Privacy
      </div>
      <div className='relative z-10'>
        &#169; 2021 Pub Finance. All rights reserved.
      </div>
    </footer>
  )
}

