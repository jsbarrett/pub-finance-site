import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'
import './App.css'

import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { VaultPage } from './pages/VaultPage'
import { DashboardPage } from './pages/DashboardPage'
import { CommunityPage } from './pages/CommunityPage'
import { SideNav } from './components/SideNav'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const Wallet = () => {
  return (
    <div
      style={{ background: 'rgb(12,12,97)' }}
      className='cursor-pointer text-lg absolute right-4 top-24 xl:top-8 z-30 text-white py-2 rounded-xl px-8 font-bold'>
      Wallet
    </div>
  )
}

export const App = () => {
  return (
    <Router>
      <ScrollToTop />

      <div className='flex flex-col xl:flex-row'>
        <Wallet />

        <SideNav />

        <main className='flex-grow mt-20 xl:mt-0 xl:ml-16 relative'>
          <Switch>
            <Route path='/about'><AboutPage /></Route>
            <Route path='/vaults'><VaultPage /></Route>
            <Route path='/dashboard'><DashboardPage /></Route>
            <Route path='/community'><CommunityPage /></Route>
            <Route path='/'><HomePage /></Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
