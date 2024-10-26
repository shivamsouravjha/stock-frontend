import { Link } from 'react-router-dom'

const StockRatingAlgorithm = () => {
  return (
    <div className="container mx-auto mt-20 mb-8 border border-gray-300 rounded-lg shadow-md p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Stock Rating Algorithm Overview
      </h1>
      <p className="mb-4">
        Our stock rating algorithm provides a comprehensive score by analyzing
        individual stock metrics, trends over time, and comparisons with peer
        companies. The algorithm uses multiple factors to evaluate a stock’s
        performance, including financial metrics, trends in quarterly results,
        and comparisons against industry peers.
      </p>
      <h2 className="text-xl font-bold mb-2">
        Here’s how the scoring is computed:
      </h2>
      <h3 className="text-lg font-bold mb-2">Trend Analysis (40% Weight):</h3>
      <ul className="list-disc list-inside mb-4">
        <li>
          The algorithm assesses the stock’s quarterly performance by comparing
          consecutive quarters.
        </li>
        <li>
          Each improvement or decline in key metrics (like sales or profit)
          adjusts the trend score accordingly.
        </li>
        <li>
          This ensures that positive trends over time contribute to a higher
          score.
        </li>
      </ul>
      <h3 className="text-lg font-bold mb-2">Peer Comparison (50% Weight):</h3>
      <ul className="list-disc list-inside mb-4">
        <li>
          The stock is evaluated against peer companies using metrics like P/E
          ratio, market cap, dividend yield, ROCE, sales, and profit.
        </li>
        <li>
          A stock earns points by outperforming peers or staying competitive in
          these metrics.
        </li>
        <li>
          An additional check compares the stock’s metrics with the median of
          the peers, further refining the score.
        </li>
      </ul>
      <h3 className="text-lg font-bold mb-2">Scoring Logic:</h3>
      <ul className="list-disc list-inside mb-4">
        <li>
          The final score is a weighted combination of trend analysis and peer
          comparison results.
        </li>
        <li>
          Each component is normalized to ensure consistency across different
          datasets and company sizes.
        </li>
        <li>The score is rounded to two decimal places for readability.</li>
      </ul>
      <p className="mb-4">
        This data-driven approach helps provide a balanced rating by combining
        historical performance with real-time peer benchmarking, making it a
        valuable tool for investors seeking reliable insights.
      </p>
      <Link to="/" className="text-blue-600 hover:underline">
        Back to Homepage
      </Link>
    </div>
  )
}

export default StockRatingAlgorithm
