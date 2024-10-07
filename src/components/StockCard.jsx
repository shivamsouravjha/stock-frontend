import { ArrowUp, StarIcon } from "lucide-react";
import PropTypes from "prop-types";

const StockCard = ({ stockData }) => {
  return (
    <div className="bg-white p-4 rounded-md mb-4">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <StarIcon className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="text-2xl font-bold">{stockData.stockRate}</span>
          </div>
          <a
            href={stockData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:underline"
          >
            View Details
            <ArrowUp className="ml-1 h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Name</p>
            <p className="text-lg font-semibold">
              {stockData["Name of the Instrument"]}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Industry
            </p>
            <p className="text-lg font-semibold">
              {stockData["Industry/Rating"]}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">ISIN</p>
            <p className="text-lg font-semibold">{stockData.ISIN}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Market Value
            </p>
            <p className="text-lg font-semibold">
              ₹{stockData["Market/Fair Value"]}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Market Cap
            </p>
            <p className="text-lg font-semibold">₹{stockData.marketCapValue}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Quantity
            </p>
            <p className="text-lg font-semibold">{stockData.Quantity}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">FScore</p>
            <p className="text-lg font-semibold">{stockData.fScore}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Percentage of AUM
            </p>
            <p className="text-lg font-semibold">
              {stockData["Percentage of AUM"]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

StockCard.propTypes = {
  stockData: PropTypes.object,
};

export default StockCard;
