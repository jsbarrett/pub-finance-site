import React from 'react'
import { NavLink } from 'react-router-dom'
import pintGearLogoUrl from '../pint-gear-logo.svg'
import { GRADIENT_DARK_BLUE, GRADIENT_DARKER_BLUE } from '../styles'

export const SideNav = () => {
  const activeStyle = {
    background: 'linear-gradient(90deg, #FFFFFF22 0%, #FFFFFF00 100%)',
    borderColor: '#37FF8B'
  }

  const navItems = [
    {
      path: '/',
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' className='xl:ml-4 xl:ml-0 h-4 w-4 xl:h-8 xl:w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
        </svg>
      ),
      text: 'Home'
    },
    {
      path: '/about',
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' className='xl:ml-4 xl:ml-0 h-4 w-4 xl:h-8 xl:w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' />
        </svg>
      ),
      text: 'About'
    },
    {
      path: '/vaults',
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' className='xl:ml-4 xl:ml-0 h-4 w-4 xl:h-8 xl:w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
        </svg>
      ),
      text: 'Vaults'
    },
    {
      path: '/dashboard',
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' className='xl:ml-4 xl:ml-0 h-4 w-4 xl:h-8 xl:w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
        </svg>
      ),
      text: 'Dashboard'
    },
    {
      path: '/community',
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' className='xl:ml-4 xl:ml-0 h-4 w-4 xl:h-8 xl:w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' />
        </svg>
      ),
      text: 'Community'
    },
  ]

  return (
    <nav
      className='h-20 w-full xl:h-auto xl:min-h-screen xl:w-16 xl:hover:w-64 text-white flex xl:flex-col items-center shadow-lg fixed z-30 top-0 left-0 overflow-hidden transition-width duration-200'
      style={{ background: `linear-gradient(0deg, ${GRADIENT_DARK_BLUE} 0%, ${GRADIENT_DARKER_BLUE} 100%)` }}>

      <div className='h-20 w-full xl:h-auto xl:min-h-screen xl:w-64 text-white flex xl:flex-col items-center absolute left-0'>
        <img
          alt='Pints logo of a gear'
          className='hidden xl:ml-1 xl:block h-12 w-16 absolute left-0 top-6'
          style={{ filter: 'invert()' }}
          src={pintGearLogoUrl} />
        <div className='xl:mt-24 flex flex-grow xl:flex-col xl:max-h-screen justify-around xl:justify-start w-full h-full xl:h-auto'>
          {navItems.map(x => (
          <NavLink
            to={x.path}
            key={x.path}
            activeStyle={activeStyle}
            exact={true}
            className='h-full flex-grow xl:flex-grow-0 xl:py-4 border-t-4 xl:h-auto xl:border-t-0 xl:border-l-4 border-solid border-gradient-darker-blue'>
            <div className='h-full flex items-center flex-col xl:flex-row justify-center xl:justify-start'>
              {x.icon}
              <div className='xl:ml-4 text-xs xl:text-2xl'>{x.text}</div>
            </div>
          </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

