import { useEffect, useState } from 'react'
import axios from 'axios'

const StocksPage = () => {
  const [stocks, setStocks] = useState([])
  const [page, setPage] = useState(1)
  const [error, setError] = useState(null)
  const [visibleFields, setVisibleFields] = useState({
    name: true,
    marketCap: true,
    marketCapValue: true,
    stockRate: true,
    fScore: true,
    recommendation: true,
    currentPrice: true,
    targetPrice: true,
  })
  const [selectedStock, setSelectedStock] = useState(null)
  const [infoType, setInfoType] = useState(null) // 'target' | 'rating' | 'fscore'

  const fetchStocks = async (pageNumber) => {
    try {
      const response = await axios.get(
        `https://stock-backend-u4kd.onrender.com/api/fetchStocksWithRecommendations?pageNumber=${pageNumber}`
      )
      const stockData = response.data
        .trim()
        .split('\n')
        .map((line) => {
          try {
            return JSON.parse(line)
          } catch (error) {
            console.error('Error loading json:', error)
          }
        })
        .filter((stock) => stock && stock.name && stock.stockRate)
      setStocks(stockData)
    } catch (err) {
      console.error('Error fetching stocks:', err.message)
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchStocks(page)
  }, [page])

  const toggleFieldVisibility = (field) => {
    setVisibleFields((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'marketCap', label: 'Category' },
    { key: 'marketCapValue', label: 'Market Cap Value' },
    { key: 'stockRate', label: 'Rating' },
    { key: 'fScore', label: 'F Score' },
    { key: 'recommendation', label: 'Recommendation' },
    { key: 'currentPrice', label: 'Current Price' },
    { key: 'targetPrice', label: 'Target Price' },
  ]

  if (error)
    return <div className="text-center text-red-500 mt-8">Error: {error}</div>

  const formatNumber = (v) => {
    if (v === null || v === undefined) return '-'
    // accept numbers or numeric strings with commas, currency symbols, etc.
    const str = String(v).replace(/,/g, '').replace(/[^0-9.\-]/g, '').trim()
    const n = Number(str)
    return Number.isFinite(n) ? n.toFixed(2) : '-'
  }

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden mt-8">
      <div className="container mx-auto mt-20 mb-8 border border-gray-300 rounded-lg shadow-md p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Stock Ranking</h1>

        <div className="flex flex-wrap justify-center mb-4 p-4 border border-gray-300 rounded-lg bg-gray-100 shadow-md">
          {columns.map((col) => (
            <label key={col.key} className="flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                checked={visibleFields[col.key]}
                onChange={() => toggleFieldVisibility(col.key)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded"
              />
              <span className="ml-2 text-gray-700">{col.label}</span>
            </label>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                {columns.map(
                  (col) =>
                    visibleFields[col.key] && (
                      <th
                        key={col.key}
                        className="border border-gray-300 px-4 py-2 text-center"
                      >
                        {col.label}
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody>
              {stocks.length > 0 ? (
                stocks.map((stock, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => window.open(stock.url, '_blank')}
                  >
                    {columns.map(
                      (col) =>
                        visibleFields[col.key] && (
                          <td
                            key={col.key}
                            className={`border border-gray-300 px-4 py-2 text-center ${
                              col.key === 'recommendation'
                                ? stock[col.key] === 'SELL'
                                  ? 'text-red-500'
                                  : stock[col.key] === 'HOLD'
                                  ? 'text-yellow-500'
                                  : stock[col.key] === 'BUY'
                                  ? 'text-green-500'
                                  : ''
                                : ''
                            }`}
                          >
                            {col.key === 'targetPrice' ? (
                              <div className="flex items-center justify-center">
                                <span>{formatNumber(stock[col.key])}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedStock(stock)
                                    setInfoType('target')
                                  }}
                                  title="How target price was calculated"
                                  className="ml-2 text-white bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                >
                                  i
                                </button>
                              </div>
                            ) : col.key === 'currentPrice' ? (
                              <span>{formatNumber(stock.currentPrice)}</span>
                            ) : col.key === 'stockRate' ? (
                              <div className="flex items-center justify-center">
                                <span>{formatNumber(stock.stockRate)}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedStock(stock)
                                    setInfoType('rating')
                                  }}
                                  title="How rating was derived"
                                  className="ml-2 text-white bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                >
                                  i
                                </button>
                              </div>
                            ) : col.key === 'fScore' ? (
                              <div className="flex items-center justify-center">
                                <span>{stock.fScore ?? '-'}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedStock(stock)
                                    setInfoType('fscore')
                                  }}
                                  title="How F-Score was calculated"
                                  className="ml-2 text-white bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                >
                                  i
                                </button>
                              </div>
                            ) : col.key === 'name' ? (
                              <span className="text-blue-600">{stock.name}</span>
                            ) : (
                              // default render for other fields
                              stock[col.key]
                            )}
                          </td>
                        )
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={
                      Object.keys(visibleFields).filter((key) => visibleFields[key]).length
                    }
                    className="text-center p-4"
                  >
                    No stocks available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedStock && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-lg w-11/12">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold">
                  {infoType === 'target'
                    ? 'Target Price Breakdown'
                    : infoType === 'rating'
                    ? 'Rating Breakdown'
                    : infoType === 'fscore'
                    ? 'F-Score Breakdown'
                    : 'Info'}
                </h2>
                <button
                  onClick={() => {
                    setSelectedStock(null)
                    setInfoType(null)
                  }}
                  className="text-gray-500 hover:text-gray-800"
                >
                  Close
                </button>
              </div>

              <div className="mt-4">
                <p className="font-semibold">{selectedStock.name}</p>

                {infoType === 'target' && (
                  <>
                    <p>Current Price: {formatNumber(selectedStock.currentPrice)}</p>
                    <p>Target Price: {formatNumber(selectedStock.targetPrice)}</p>
                    <p className="mt-2 font-semibold">Components</p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>DCF: {formatNumber(selectedStock.dcfValue)}</li>
                      <li>Relative Value: {formatNumber(selectedStock.relativeValue)}</li>
                      <li>Scenario Value: {formatNumber(selectedStock.scenarioValue)}</li>
                      <li>Upside/Downside (%): {formatNumber(selectedStock.upsideDownside)}</li>
                    </ul>

                    <div className="mt-4">
                      <p className="font-semibold">Approximate contribution</p>
                      {(() => {
                        const d = Number(selectedStock.dcfValue) || 0
                        const r = Number(selectedStock.relativeValue) || 0
                        const s = Number(selectedStock.scenarioValue) || 0
                        const sum = d + r + s
                        if (sum === 0) return <p className="text-sm text-gray-600">No component values available to show breakdown.</p>
                        const t = Number(selectedStock.targetPrice) || 0
                        const contrib = (v) => ({ pct: ((v / sum) * 100).toFixed(1), value: ((v / sum) * t).toFixed(2) })
                        const dc = contrib(d)
                        const rc = contrib(r)
                        const sc = contrib(s)
                        return (
                          <ul className="list-inside mt-2 text-sm">
                            <li>DCF: {dc.pct}% → contribution ≈ {dc.value}</li>
                            <li>Relative: {rc.pct}% → contribution ≈ {rc.value}</li>
                            <li>Scenario: {sc.pct}% → contribution ≈ {sc.value}</li>
                            <li className="mt-2 text-xs text-gray-600">Formula (approx): target ≈ α×DCF + β×Relative + γ×Scenario (then risk overlay)</li>
                          </ul>
                        )
                      })()}
                    </div>
                  </>
                )}

                {infoType === 'rating' && (
                  <>
                    <p className="mt-2 font-semibold">RateStock algorithm</p>
                    <p className="text-sm mt-2">RateStock evaluates a stock by peer comparison (50%) and trend analysis (40%), then rounds the result to two decimals.</p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>Peer comparison score: {formatNumber(selectedStock.peerComparisonScore ?? selectedStock.peerScore ?? '-')}</li>
                      <li>Trend analysis score: {formatNumber(selectedStock.trendScore ?? selectedStock.trendAnalysisScore ?? '-')}</li>
                      <li>Final rating (reported): {formatNumber(selectedStock.stockRate)}</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-600">Approx formula: rating ≈ 0.5×peer + 0.4×trend (+ 0.1×other adjustments)</p>
                  </>
                )}

                {infoType === 'fscore' && (
                  <>
                    <p className="mt-2 font-semibold">GenerateFScore</p>
                    <p className="text-sm mt-2">F-Score sums profitability, leverage and operating efficiency. If any category fails, result may be -1.</p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>Profitability score: {formatNumber(selectedStock.profitabilityScore ?? selectedStock.profitScore ?? '-')}</li>
                      <li>Leverage score: {formatNumber(selectedStock.leverageScore ?? selectedStock.leverage ?? '-')}</li>
                      <li>Operating efficiency: {formatNumber(selectedStock.operatingEfficiencyScore ?? selectedStock.operatingEfficiency ?? '-')}</li>
                      <li>Final F-Score (reported): {selectedStock.fScore ?? '-'}</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-600">If you want exact component weights shown, backend must send the component values; currently we show available fields and a summary of the method.</p>
                  </>
                )}

                <div className="mt-4 flex justify-end">
                  <a
                    href={selectedStock.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline mr-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open source
                  </a>
                  <button
                    onClick={() => {
                      setSelectedStock(null)
                      setInfoType(null)
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-4 mb-8">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default StocksPage
