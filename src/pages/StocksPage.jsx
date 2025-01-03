import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
  })

  const fetchStocks = async (pageNumber) => {
    try {
      const response = await axios.get(
        `https://stock-backend-u4kd.onrender.com/api/fetchStocks?pageNumber=${pageNumber}`
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
  ]

  if (error)
    return <div className="text-center text-red-500 mt-8">Error: {error}</div>

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
                  <tr key={index} className="border-b hover:bg-gray-100">
                    {columns.map(
                      (col) =>
                        visibleFields[col.key] && (
                          <td
                            key={col.key}
                            className="border border-gray-300 px-4 py-2 text-center"
                          >
                            {col.key === 'name' ? (
                              <a
                                href={stock.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600"
                              >
                                {stock.name}
                              </a>
                            ) : (
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
                      Object.keys(visibleFields).filter(
                        (key) => visibleFields[key]
                      ).length
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

        <div className="text-center mt-8">
          <Link
            to="/stockRatingAlgorithm"
            className="text-blue-600 hover:underline"
          >
            Learn About Our Rating Algorithm
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StocksPage
