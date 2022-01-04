import React from 'react'
import { Dashboard } from './Dashboard'
import { chainImplementations } from '../../chains/index'
import { NullDashboard } from './NullDashboard'

export const DashboardPage = () => {
  const chainId = window.ethereum.chainId

  if (!chainImplementations[chainId]) return <Dashboard getData={NullDashboard} />

  return <Dashboard getData={chainImplementations[chainId].dashboard} />
}

