import PropTypes from 'prop-types';

// Assuming the prop name passed from Result is still 'stockData'
const OverlapMutualFundCard = ({ stockData }) => {
  // stockData is now an object representing a single item from the NEW CommonStocks array.
  // It contains fields like: isin, name, industry, quantity, marketValue, percentage

  return (
    <div className="bg-white p-4 rounded-md mb-4 shadow-md">
      <div className="grid gap-2">
         {/* NOTE: Summary data like Fund1Percentage is not specific to one stock, */}
         {/* it's an overall metric and is displayed in the parent Result component. */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">

           {/* Display Name */}
           <div className="col-span-1 md:col-span-2"> {/* Make name span full width */}
            <p className="text-xs font-medium text-gray-500">Stock Name</p>
            <p className="text-sm font-semibold text-gray-900">
              {stockData.name || 'N/A'} {/* Use 'name' from the new structure */}
            </p>
          </div>

           {/* Display ISIN */}
          <div>
            <p className="text-xs font-medium text-gray-500">ISIN</p>
            <p className="text-sm font-semibold text-gray-900">{stockData.isin || 'N/A'}</p>
          </div>

           {/* Display Industry */}
           <div>
            <p className="text-xs font-medium text-gray-500">Industry</p>
            <p className="text-sm font-semibold text-gray-900">
              {stockData.industry || 'N/A'} {/* Use 'industry' from the new structure */}
            </p>
          </div>

          {/* Display Quantity */}
          <div>
            <p className="text-xs font-medium text-gray-500">Quantity</p>
            <p className="text-sm font-semibold text-gray-900">
              {stockData.quantity || 'N/A'} {/* Use 'quantity' from the new structure */}
            </p>
          </div>

           {/* Display Market Value */}
           <div>
            <p className="text-xs font-medium text-gray-500">Market Value</p>
            <p className="text-sm font-semibold text-gray-900">
              {stockData.marketValue || 'N/A'} {/* Use 'marketValue' from the new structure */}
            </p>
          </div>

          {/* Display Percentage */}
          <div>
            <p className="text-xs font-medium text-gray-500">
              Percentage
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {stockData.percentage || 'N/A'} {/* Use 'percentage' from the new structure */}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

// Update propTypes to match the structure of an item in the NEW CommonStocks array
OverlapMutualFundCard.propTypes = {
  stockData: PropTypes.shape({
    isin: PropTypes.string,
    name: PropTypes.string.isRequired, // Use 'name'
    industry: PropTypes.string,
    quantity: PropTypes.string,
    marketValue: PropTypes.string,
    percentage: PropTypes.string, // Use 'percentage'
    // Add other expected fields for a single common stock here if needed
  }).isRequired, // stockData prop itself is required
};

export default OverlapMutualFundCard;