import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'
import './App.css'

import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { VaultPage } from './pages/VaultPage'
import { DashboardPage } from './pages/DashboardPage'
import { SideNav } from './components/SideNav'

// const CONTRACT_ADDRESS = '0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462'
// const API_KEY = '8M6AXBKTI1VRXK7SNY9FGIYWX868CVNR6S'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export const App = () => {
  return (
    <Router>
      {/* <ScrollToTop /> */}

      <div className='flex flex-col xl:flex-row'>
        <SideNav />

        <main className='flex-grow mt-20 xl:mt-0 xl:ml-24'>
          <Switch>
            <Route path='/about'><AboutPage /></Route>
            <Route path='/vault'><VaultPage /></Route>
            <Route path='/dashboard'><DashboardPage /></Route>
            <Route path='/'><HomePage /></Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
