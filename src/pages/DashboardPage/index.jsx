import React from 'react'
import { Dashboard } from './Dashboard'
import { EthereumDashboard } from './EthereumDashboard'
import { FujiDashboard } from './FujiDashboard'
import { BinanceTestDashboard } from './BinanceTestDashboard'
import { NullDashboard } from './NullDashboard'
import { chainIds } from '../../chainConfig'

export const DashboardPage = () => {
  switch (window.ethereum.chainId) {
    case chainIds.ethereum: return (
      <Dashboard getData={EthereumDashboard} />
    )
    case chainIds.fuji: return (
      <Dashboard getData={FujiDashboard} />
    )
    case chainIds.binancetest: return (
      <Dashboard getData={BinanceTestDashboard} />
    )
    default: return (
      <Dashboard getData={NullDashboard} />
    )
  }
}


