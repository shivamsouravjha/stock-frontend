import {
  DeleteIcon,
  Search,
  LayoutGrid,
  List,
  ArrowUpDown,
} from 'lucide-react';
import PropTypes from 'prop-types';
import Button from './Button';
import { toNumber } from '../utils/common'; // Assuming toNumber is correct
import OverlapMutualFundCard from './OverlapMutualFundCard'; // Using the new card component name
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { useState, useEffect } from 'react';

const OverlapResult = ({
  stockDetailsData, // This will now be the object containing CommonStocks, Fund1Percentage, etc.
  search,
  setSearch,
  shortBy,
  setShortBy,
  isGridView,
  setIsGridView,
}) => {
  const [sortDirection, setSortDirection] = useState('asc');
console.log('stockDetailsData:', stockDetailsData[0]);
  // --- Debugging Logs (Optional) ---
  useEffect(() => {
    console.log('Result Component Mounted/Updated');
    console.log('stockDetails prop (new structure):', stockDetailsData[0]);
    console.log('search prop:', search);
    console.log('isGridView prop:', isGridView);
  }, [stockDetailsData, search, isGridView]);
  // --- END Debugging Logs ---

  // --- FIX: Access data based on the NEW JSON structure ---
  // stockDetails is now the object directly
  let stockDataAsObject = null;

  try {
    // Only parse if it's a string
    if (typeof stockDetailsData[0] === 'string') {
      stockDataAsObject = JSON.parse(stockDetailsData[0]);
    } else {
      stockDataAsObject = stockDetailsData[0]; // already an object
    }
  } catch (error) {
    console.error('Failed to parse stockDetailsData[0]:', error.message);
    console.log('Raw stockDetailsData[0]:', stockDetailsData[0]);
  }
    let stockDetails = (stockDataAsObject);
console.log('stockDetails:', stockDetails);
  // Access CommonStocks array (renamed from commonHoldings)
  const commonStocks = stockDetails?.CommonStocks || [];

  // Access summary data from the top level
  const fund1Percentage = stockDetails?.Fund1Percentage;
  const fund2Percentage = stockDetails?.Fund2Percentage;
  const fund1PercentageWeight = stockDetails?.Fund1PercentageWeight;
  const fund2PercentageWeight = stockDetails?.Fund2PercentageWeight;


  // --- Debugging Logs (Optional) ---
  useEffect(() => {
    console.log('commonStocks derived from stockDetails:', commonStocks);
    console.log('Number of common stocks:', commonStocks.length);
    console.log('Summary data:', {
      fund1Percentage,
      fund2Percentage,
      fund1PercentageWeight,
      fund2PercentageWeight,
    });
  }, [commonStocks, fund1Percentage, fund2Percentage, fund1PercentageWeight, fund2PercentageWeight]);
  // --- END Debugging Logs ---


  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const sortFunction = (a, b) => {
    let comparison = 0;

    // Sort based on the single 'percentage' field available in the new structure
    if (shortBy === 'percentage_of_aum') {
      // The percentage field in the new data has a '%' sign, remove it before converting to number
      const percentageA = toNumber(a.percentage?.replace('%', '') || '0');
      const percentageB = toNumber(b.percentage?.replace('%', '') || '0');
      comparison = percentageA - percentageB;
    }
    // If shortBy is 'none', comparison remains 0

    return sortDirection === 'asc' ? comparison : -comparison;
  };

  // Filter logic adapted to the new fields
  const filteredAndSortedHoldings = commonStocks
    .filter((item) => {
      if (!search) {
        return true;
      } else {
        const lowerCaseSearch = search.toLowerCase();
        // Check against relevant string/searchable fields in the NEW structure
        return (
          (item.isin && item.isin.toLowerCase().includes(lowerCaseSearch)) ||
          (item.name && item.name.toLowerCase().includes(lowerCaseSearch)) || // Use 'name' instead of 'nameMF1'/'nameMF2'
          (item.industry && item.industry.toLowerCase().includes(lowerCaseSearch)) ||
          (item.percentage && item.percentage.toLowerCase().includes(lowerCaseSearch)) || // Search percentages as strings
          (item.marketValue && item.marketValue.toLowerCase().includes(lowerCaseSearch)) ||
          (item.quantity && item.quantity.toLowerCase().includes(lowerCaseSearch))
        );
      }
    })
    .sort(sortFunction);

  // --- Debugging Logs (Optional) ---
  useEffect(() => {
    console.log('Filtered and sorted holdings:', filteredAndSortedHoldings);
    console.log('Number of filtered and sorted holdings:', filteredAndSortedHoldings.length);
    if (filteredAndSortedHoldings.length === 0 && commonStocks.length > 0 && search) {
        console.log("Info: Holdings were filtered out by the current search term.");
    } else if (filteredAndSortedHoldings.length === 0 && commonStocks.length === 0) {
         console.log("Info: commonStocks array is empty.");
    }
  }, [filteredAndSortedHoldings, commonStocks.length, search]);
   // --- END Debugging Logs ---


  return (
    <div className="pt-20 container mx-auto flex flex-col h-screen p-2">
      <div className="py-2 rounded-md flex-col gap-y-2 sm:gap-y-0 sm:flex-row flex justify-between items-center px-3">
        <div className="flex items-center gap-5 w-full sm:w-fit">
          <div className="flex bg-white w-full sm:w-fit py-2 border-[0.5px] rounded-md items-center gap-2 px-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              className="px-2 outline-none w-full"
              placeholder="Search..."
              value={search}
              onChange={(ev) => setSearch(ev.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setIsGridView(!isGridView);
            }}
          >
            {isGridView ? <LayoutGrid /> : <List />}
          </button>
        </div>
        <div className="flex gap-3 w-full sm:w-fit items-center justify-between sm:justify-normal">
          <select
            onChange={(e) => setShortBy(e.currentTarget.value)}
            className="bg-slate-200 p-2 rounded-md"
            value={shortBy}
          >
            <option value={'none'}>Sort by</option>
            {/* Sorting is now based on the single 'percentage' field */}
            <option value={'percentage_of_aum'}>Percentage</option>
          </select>

          {/* Only show sort direction button if sorting is active */}
          {shortBy !== 'none' && (
            <button onClick={toggleSortDirection} className="ml-2">
              <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
            </button>
          )}


          <Button
            onClick={() => {
              setShortBy('none');
              setSearch('');
              setSortDirection('asc'); // Reset sort direction
            }}
            title={'Reset'}
            icon={<DeleteIcon width={24} height={24} />}
          />
        </div>
      </div>

      {/* --- Display Summary Data (adapted to new fields) --- */}
      {(fund1Percentage || fund2Percentage || fund1PercentageWeight || fund2PercentageWeight) && (
        <div className="mt-4 p-3 bg-blue-100 rounded-md text-blue-800">
          <p className="text-lg font-semibold">Common Holdings Summary:</p>
          <p className="text-sm">Percentage in Fund 1: {fund1Percentage || 'N/A'}%</p>
          <p className="text-sm">Percentage in Fund 2: {fund2Percentage || 'N/A'}%</p>
          <p className="text-sm">Weight in Fund 1 Portfolio: {fund1PercentageWeight || 'N/A'}%</p>
          <p className="text-sm">Weight in Fund 2 Portfolio: {fund2PercentageWeight || 'N/A'}%</p>
           {/* You can choose which of these fields you want to display */}
        </div>
      )}
      {/* --- End Summary Data --- */}


      {/* --- Conditional Rendering for Grid/Table View --- */}
      {isGridView ? (
        // --- Grid View ---
        <div className="gap-3 mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-grow overflow-auto">
          {filteredAndSortedHoldings.length > 0 ? (
            // Pass the stockData object with the NEW structure to the card
            filteredAndSortedHoldings.map((stockData) => (
              <OverlapMutualFundCard key={stockData.isin || stockData.name} stockData={stockData} /> // Use ISIN or name as key
            ))
          ) : (
             <div className="text-center py-10 col-span-full text-gray-500">
                {search ? 'No common stocks found matching your search criteria.' : 'No common stocks available.'}
             </div>
          )}
        </div>
      ) : (
        // --- Table View ---
        <div className="overflow-auto flex-grow mt-3">
          <Table>
            <TableHeader className="sticky top-0 bg-slate-100 hover:bg-slate-100">
              <TableRow>
                {/* Table headers adapted to the NEW fields */}
                <TableHead className="text-black">ISIN</TableHead>
                <TableHead className="text-black">Name</TableHead>
                <TableHead className="text-black">Industry</TableHead>
                <TableHead className="text-black">Quantity</TableHead>
                <TableHead className="text-black">Market Value</TableHead>
                <TableHead className="text-black">Percentage</TableHead> {/* Use single Percentage field */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedHoldings.length > 0 ? (
                 // Map and display data using the NEW field names
                filteredAndSortedHoldings.map((stockData) => (
                  <TableRow key={stockData.isin || stockData.name}> {/* Use ISIN or name as key */}
                    <TableCell>{stockData.isin || 'N/A'}</TableCell>
                    <TableCell>{stockData.name || 'N/A'}</TableCell>
                    <TableCell>{stockData.industry || 'N/A'}</TableCell>
                    <TableCell>{stockData.quantity || 'N/A'}</TableCell>
                    <TableCell>{stockData.marketValue || 'N/A'}</TableCell>
                    <TableCell>{stockData.percentage || 'N/A'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500"> {/* Adjusted colSpan */}
                        {search ? 'No common stocks found matching your search criteria.' : 'No common stocks available.'}
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
       {/* --- End Conditional Rendering --- */}
    </div>
  );
};

OverlapResult.propTypes = {
  // FIX: Update PropTypes to match the NEW expected object structure
  stockDetails: PropTypes.shape({
    CommonStocks: PropTypes.arrayOf( // Renamed from commonHoldings
      PropTypes.shape({
        isin: PropTypes.string, // ISIN might not always be required if name is sufficient as key
        name: PropTypes.string.isRequired, // Use 'name'
        industry: PropTypes.string,
        quantity: PropTypes.string,
        marketValue: PropTypes.string,
        percentage: PropTypes.string, // Use 'percentage' (assuming it includes '%')
        // Add other expected fields for each common stock here
      })
    ),
    // Add the new summary fields at the top level
    Fund1Percentage: PropTypes.string,
    Fund2Percentage: PropTypes.string,
    Fund1PercentageWeight: PropTypes.string,
    Fund2PercentageWeight: PropTypes.string,
    // Add other top-level fields if stockDetails has them
  }), // Make stockDetails optional in case data is loading or empty
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  // Sorting is now based on the single 'percentage' field
  shortBy: PropTypes.oneOf(['none', 'percentage_of_aum']).isRequired,
  setShortBy: PropTypes.func.isRequired,
  isGridView: PropTypes.bool.isRequired,
  setIsGridView: PropTypes.func.isRequired,
};

export default OverlapResult;