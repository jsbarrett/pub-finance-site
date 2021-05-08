import React from 'react'

export const SectionPadding = ({ children }) => {
  return (
    <div className='px-2 mx-auto md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg'>
      { children }
    </div>
  )
}
