import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'
import './App.css'

import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { VaultPage } from './pages/VaultPage'
import { DashboardPage } from './pages/DashboardPage'
import { CommunityPage } from './pages/CommunityPage'
import { SideNav } from './components/SideNav'

// web3 or ether.js
// rinkeby
// hardhat
// web3/truffle
// ether.js/waffle
// infura (swap out web3)
//
// have two instances of web3
// -- gets use infura
// -- sets use metamask/ethereum


const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// const Wallet = ({ onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       style={{ background: 'rgb(12,12,97)' }}
//       className='cursor-pointer text-lg absolute right-4 top-24 xl:top-8 z-30 text-white py-2 rounded-xl px-8 font-bold'>
//       Wallet
//     </div>
//   )
// }

// const WalletModal = ({ isOpen }) => {
//   if (!isOpen) return null

//   return (
//     <div className='fixed inset-0 z-50 w-full pointer-events-none'>
//       <div
//         className='text-white rounded-2xl shadow-2xl bg-blue-500 p-8 my-36 w-8/12 xl:w-4/12 mx-auto pointer-events-auto flex justify-center flex-col text-center'
//         style={{ background: 'rgb(12,12,97)' }}>
//         <div>My Account</div>
//         <div>PINT Balance</div>
//         <div>
//           <a href='https://etherscan.io/token/0xFECBa472B2540C5a2d3700b2C9E06F0aa7dC6462' target='_blank' rel='noreferrer'>
//             View on Etherscan
//           </a>
//         </div>
//         <div>
//           <button>Sign out</button>
//         </div>
//         <div>
//           <button>Cancel</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// getUserInfo estimate gas error?

export const App = () => {
  // const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <Router>
      <ScrollToTop />

      <div className='flex flex-col xl:flex-row'>
        {/* <Wallet onClick={() => setModalIsOpen(!modalIsOpen) }/> */}

        <SideNav />

        {/* <WalletModal isOpen={modalIsOpen} /> */}

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
