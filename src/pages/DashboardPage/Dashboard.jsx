import React, { useState, useEffect, useCallback } from 'react'
import Chart from 'chart.js/auto'
import { PageFooter } from '../../components/PageFooter'
import { HeaderBackground } from '../../components/HeaderBackground'
import { PintLogoSvg } from '../../components/PintLogoSvg'
import { useBalance } from '../../hooks/useBalance'
import { useCurrentPrice } from '../../hooks/useCurrentPrice'
import { useTotalValueLocked } from '../../hooks/useTotalValueLocked'
import { useTotalSupply } from '../../hooks/useTotalSupply'
import { useHistoricalData } from '../../hooks/useHistoricalData'
import { useMarketCap } from '../../hooks/useMarketCap'

import { ACCENT_GREEN_RGBA } from '../../styles'

const generateChartData = (chartType, historicalData) => {
  const labels = historicalData.map(x => x.date.toLocaleDateString())
  const datapoints = historicalData.map(x => x[chartType])
  return {
    labels,
    datasets: [generateChartDataset(datapoints)]
  }
}

const generateConfig = (data) => {
  return {
    type: 'line',
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false, },
      },
      interaction: { intersect: false, },
      scales: {
        x: { display: false, },
        y: { display: false, suggestedMin: 0, suggestedMax: 1 }
      },
    },
  }
}

const LineChart = ({ chartType, historicalData }) => {
  const [chart, setChart] = useState()

  const setupChart = () => {
    const container = document.getElementById('chart-container')

    // this is for development hot reloading
    container.innerHTML = ''

    const canvasElement = document.createElement('canvas')
    container.appendChild(canvasElement)

    const ctx = canvasElement.getContext('2d')

    setChart(new Chart(ctx, generateConfig(generateChartData(chartType, historicalData))))
  }

  useEffect(() => {
    if (chart) {
      chart.data = generateChartData(chartType, historicalData)
      chart.update()
    }
  }, [chartType, chart, historicalData])

  // eslint-disable-next-line
  useEffect(() => { return setupChart() }, [])

  return (
    <div id='chart-container' className='w-full relative h-64'></div>
  )
}

const generateChartDataset = data => ({
  data,
  borderColor: 'blue',
  fill: true,
  backgroundColor: ACCENT_GREEN_RGBA,
  tension: 0.4
})

const PriceChart = ({ historicalData, currentPrice }) => {
  const [chart, setChart] = useState()

  const setupChart = () => {
    const container = document.getElementById('chart-container')

    // this is for development hot reloading
    container.innerHTML = ''

    const canvasElement = document.createElement('canvas')
    container.appendChild(canvasElement)

    const ctx = canvasElement.getContext('2d')

    const labels = historicalData.map(x => x.date.toLocaleDateString())
    let datapoints = historicalData.map(x => x['Price'])
    if (currentPrice) {
      labels.push((new Date()).toLocaleDateString())
      datapoints.push(currentPrice)
    }
    const chartData = {
      labels,
      datasets: [generateChartDataset(datapoints)]
    }
    setChart(new Chart(ctx, generateConfig(chartData)))
  }

  useEffect(() => {
    if (chart) {
      const labels = historicalData.map(x => x.date.toLocaleDateString())
      const datapoints = historicalData.map(x => x['Price'])

      if (currentPrice) {
        labels.push((new Date()).toLocaleDateString())
        datapoints.push(currentPrice)
      }

      chart.data = {
        labels,
        datasets: [generateChartDataset(datapoints)]
      }
      chart.update()
    }
  }, [chart, historicalData, currentPrice])

  // eslint-disable-next-line
  useEffect(() => { return setupChart() }, [])

  return (
    <div id='chart-container' className='w-full relative h-64'></div>
  )
}

const Loading = ({ isLoading, children, loadingView }) => {
  if (!isLoading) return children

  return loadingView
}

const CardLoading = () => (
  <div className='px-10 font-bold text-xl xl:text-4xl text-center xl:text-left py-8'>
    Loading ...
  </div>
)

const HistoricalLoading = () => (
  <section
    className='shadow-lg rounded-3xl w-9/12 mx-auto px-8 mt-10 xl:mt-32 flex flex-wrap justify-center mb-10 xl:mb-32'
    style={{ background: 'rgb(12,12,97)' }}>
    <div className='w-full ml-16 py-16'>
      Loading historical data ...
    </div>
  </section>
)

export const Dashboard = () => {
  const [totalSupply] = useTotalSupply()
  const [marketCap] = useMarketCap()
  const [selectedChart, setSelectedChart] = useState('Liquidity')
  // const [historicalData, setHistoricalData] = useState([])
  const [historicalData] = useHistoricalData()
  const [loadingCardData] = useState(false)
  const [loadingHistoricalData, setLoadingHistoricalData] = useState(true)
  const [recentChartValue, setRecentChartValue] = useState('')
  const [yourPINTBalance] = useBalance()
  const [currentPrice] = useCurrentPrice()
  const [totalValueLocked] = useTotalValueLocked()
  // const ref = useRef(true)

  const chartTypes = [ 'Liquidity', 'Volume', 'Price' ]

  // LOAD CARDS
  // useEffect(() => {
  //   getMarketCap()
  //     .then(x => {
  //       if (!ref.current) return
  //       setMarketCap(x)
  //       setLoadingCardData(false)
  //     })
  //     .catch(err => {
  //       console.error(err)

  //       if (!ref.current) return
  //       setLoadingCardData(false)
  //     })

  //   return () => { ref.current = false }
  // }, [getMarketCap])

  const updateChartType = useCallback((chartType, historicalData) => {
    if (historicalData && historicalData.length > 0) {
      switch (chartType) {
        case 'Price': {
          const recentValue = currentPrice
          setRecentChartValue(recentValue)
          break
        }

        default: {
          const recentValue = Math.round(historicalData[historicalData.length - 1][chartType] * 1000) / 1000
          if (Number.isNaN(recentValue)) {
            setRecentChartValue('Unknown')
          } else {
            setRecentChartValue(recentValue.toLocaleString())
          }
        }
      }
    }
    setSelectedChart(chartType)
  }, [currentPrice])

  // LOAD HISTORICAL DATA
  useEffect(() => {
    if (historicalData.length <= 0) return

    updateChartType('Liquidity', historicalData)
    setLoadingHistoricalData(false)
  }, [historicalData, updateChartType])

  return (
    <div style={{ backgroundColor: 'rgb(11, 19, 43)' }} className='text-white'>
      <header className='relative pt-36 xl:pt-48 pb-48 xl:pb-72 text-center flex flex-col items-center'>
        <HeaderBackground />
        <PintLogoSvg />
      </header>

      <section className='relative flex flex-wrap justify-between -mt-36 px-2 md:px-24 xl:px-0 xl:w-9/12 mx-auto'>
        <div
          className='my-8 w-full lg:w-5/12 rounded-3xl bg-gray-300 shadow-xl'
          style={{ background: 'rgb(12,12,97)' }}>
          <div className='px-10 flex items-center py-2 border-b border-gray-600'>
            <div className='w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-gray-900 flex items-center justify-center'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-8 xl:h-12 w-8 xl:w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' />
              </svg>
            </div>
            <div className='text-xl xl:text-2xl ml-6'>PRICE</div>
          </div>
          <Loading isLoading={loadingCardData} loadingView={<CardLoading />}>
            <div className='px-10 font-bold text-xl xl:text-4xl text-center xl:text-left py-8'>
              ${ currentPrice } <span className='text-xl'>USD</span>
            </div>
          </Loading>
        </div>

        <div
          className='my-8 w-full lg:w-5/12 rounded-3xl bg-gray-300 shadow-xl'
          style={{ background: 'rgb(12,12,97)' }}>
          <div className='px-10 flex items-center py-2 border-b border-gray-600'>
            <div className='w-16 h-16 xl:w-20 xl:h-20 bg-gray-900 rounded-full flex items-center justify-center'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-8 xl:h-12 w-8 xl:w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' />
              </svg>
            </div>
            <div className='text-xl xl:text-2xl ml-6'>TOTAL PINT SUPPLY</div>
          </div>
          <Loading isLoading={loadingCardData} loadingView={<CardLoading />}>
            <div className='px-10 font-bold text-xl xl:text-4xl text-center xl:text-left py-8'>
              { totalSupply } <span className='text-xl'>PINT</span>
            </div>
          </Loading>
        </div>

        <div
          className='my-8 w-full lg:w-5/12 rounded-3xl bg-gray-300 shadow-xl'
          style={{ background: 'rgb(12,12,97)' }}>
          <div className='px-10 flex items-center py-2 border-b border-gray-600'>
            <div className='w-16 h-16 xl:w-20 xl:h-20 bg-gray-900 rounded-full flex items-center justify-center'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-8 xl:h-12 w-8 xl:w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
              </svg>
            </div>
            <div className='text-xl xl:text-2xl ml-6'>TOTAL VALUE LOCKED</div>
          </div>
          <Loading isLoading={loadingCardData} loadingView={<CardLoading />}>
            <div className='px-10 font-bold text-xl xl:text-4xl text-center xl:text-left py-8'>
              ${ totalValueLocked } <span className='text-xl'>USD</span>
            </div>
          </Loading>
        </div>

        <div
          className='my-8 w-full lg:w-5/12 rounded-3xl bg-gray-300 shadow-xl'
          style={{ background: 'rgb(12,12,97)' }}>
          <div className='px-10 flex items-center py-2 border-b border-gray-600'>
            <div className='w-16 h-16 xl:w-20 xl:h-20 bg-gray-900 rounded-full flex justify-center items-center'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-8 xl:h-12 w-8 xl:w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' />
              </svg>
            </div>
            <div className='text-xl xl:text-2xl ml-6'>MARKET CAP</div>
          </div>
          <Loading isLoading={loadingCardData} loadingView={<CardLoading />}>
            <div className='px-10 font-bold text-xl xl:text-4xl text-center xl:text-left py-8'>
              { marketCap } <span className='text-xl'>USD</span>
            </div>
          </Loading>
        </div>

        <div
          className='my-8 w-full lg:w-5/12 rounded-3xl bg-gray-300 shadow-xl'
          style={{ background: 'rgb(12,12,97)' }}>
          <div className='px-10 flex items-center py-2 border-b border-gray-600'>
            <div className='w-16 h-16 xl:w-20 xl:h-20 bg-gray-900 rounded-full flex justify-center items-center'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-8 xl:h-12 w-8 xl:w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' />
              </svg>
            </div>
            <div className='text-xl xl:text-2xl ml-6'>YOUR TOTAL PINT BALANCE</div>
          </div>
          <div className='px-10 font-bold text-xl xl:text-4xl text-center xl:text-left py-8'>
            {(yourPINTBalance || '0') + ' PINT'}
          </div>
        </div>
      </section>

      <div className='px-2 mx-auto md:w-10/12'>
        <section
          className='shadow-lg rounded-3xl px-4 xl:px-8 mt-10 xl:mt-32 flex flex-wrap justify-center mb-10 xl:mb-32'
          style={{ background: 'rgb(12,12,97)' }}>
          <div
            className='py-8 w-full rounded-3xl bg-gray-300 shadow-xl'
            style={{ background: 'rgb(12,12,97)' }}>
            <div className='px-10 flex items-center py-2 border-b border-gray-600'>
              <div className='w-16 h-16 xl:w-20 xl:h-20 bg-gray-900 rounded-full flex justify-center items-center'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-8 xl:h-12 w-8 xl:w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                </svg>
              </div>
              <div className='text-xl xl:text-2xl ml-6'>WEN RUG USER METRICS</div>
            </div>
            <div className='px-10 font-bold text-xl xl:text-4xl text-center xl:text-left py-8'>
              Coming Soon
            </div>
          </div>
        </section>
      </div>

      <div className='px-2 mx-auto md:w-10/12'>
        <Loading isLoading={loadingHistoricalData} loadingView={<HistoricalLoading />}>
          <section
            className='shadow-lg rounded-3xl px-4 xl:px-8 mt-10 xl:mt-32 flex flex-wrap justify-center mb-10 xl:mb-32'
            style={{ background: 'rgb(12,12,97)' }}>
            <div className='xl:ml-16 w-full xl:mt-16'>
              <div>
                { chartTypes.map(chartType => (
                <button
                  key={chartType}
                  onClick={() => updateChartType(chartType, historicalData)}
                  className={(chartType === selectedChart)
                    ? 'mr-4 px-3 xl:px-10 py-2 rounded mt-4 font-bold text-sm xl:text-lg bg-accent-green text-green-900'
                    : 'mr-4 px-3 xl:px-10 py-2 rounded mt-4 font-bold text-sm xl:text-lg bg-gray-700 text-white'}>
                  { chartType }
                </button>
                )) }
              </div>
              <div className='mt-6 xl:mt-12 text-3xl xl:text-6xl font-bold'>
                ${ recentChartValue }
              </div>
            </div>

            { selectedChart !== 'Price' && <LineChart chartType={selectedChart} historicalData={historicalData} /> }
            { selectedChart === 'Price' && <PriceChart chartType={selectedChart} historicalData={historicalData} currentPrice={currentPrice} /> }
          </section>
        </Loading>
      </div>

      <PageFooter />
    </div>
  )
}



