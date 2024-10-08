import Lottie from "lottie-react";
import stockAnimationData from "../animation/stock.json";
import useUpload from "../hooks/useUpload";
import { useState } from "react";
import StockCard from "../components/StockCard";
import { DeleteIcon, Search, UploadCloud } from "lucide-react";
import Button from "../components/Button";
import { toNumber } from "../utils/common";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const { loading, handleUploadFile, error, stockDetails } = useUpload();
  const [shortBy, setShortBy] = useState("");

  if (stockDetails.length > 0) {
    return (
      <div className="pt-20 container mx-auto flex flex-col h-screen p-2">
        <div className="py-2 rounded-md flex-col gap-y-2 sm:gap-y-0 sm:flex-row flex justify-between items-center px-3">
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
          <div className="flex gap-3 w-full sm:w-fit  items-center justify-between sm:justify-normal ">
            <select
              onChange={(e) => setShortBy(e.currentTarget.value)}
              className="bg-slate-200 p-2 rounded-md"
            >
              <option value={"none"}>Sort by</option>
              <option value={"rating"}>Rating</option>
              <option value={"market_cap"}>Market Value</option>
              <option value={"quantity"}>Quantity</option>
              <option value={"percentage_of_aum"}>Percentage of AUM</option>
            </select>
            <Button
              onClick={() => {
                setShortBy("");
                setSearch("");
              }}
              title={"Reset"}
              icon={<DeleteIcon width={24} height={24} />}
            />
          </div>
        </div>
        <div className="gap-3 mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-grow overflow-auto">
          {stockDetails
            .filter((item) => {
              if (!search) {
                return true;
              } else {
                let isValid = false;

                Object.values(item).forEach((value) => {
                  if (
                    value &&
                    value
                      .toString()
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    isValid = true;
                  }
                });

                return isValid;
              }
            })
            .sort((a, b) => {
              if (shortBy === "rating") {
                return toNumber(a.stockRate) - toNumber(b.stockRate);
              } else if (shortBy === "market_cap") {
                return (
                  toNumber(a["Market/Fair Value"]) -
                  toNumber(b["Market/Fair Value"])
                );
              } else if (shortBy === "quantity") {
                return toNumber(a.Quantity) - toNumber(b.Quantity);
              } else if (shortBy === "percentage_of_aum") {
                return (
                  toNumber(a["Percentage of AUM"]) -
                  toNumber(b["Percentage of AUM"])
                );
              } else {
                return 0;
              }
            })
            .map((stockData) => (
              <StockCard key={stockData.ISIN} stockData={stockData} />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center p-3">
      <div className="w-[600px] p-4 border-[0.5px] border-slate-200 rounded-md bg-white">
        <div className="flex justify-center">
          <div className="w-[300px] h-[300px]">
            <Lottie animationData={stockAnimationData} />
          </div>
        </div>
        {error && (
          <div className="bg-red-100 text-red-500 p-3 rounded-md mb-3 text-xs">
            {error}
          </div>
        )}
        <div className="md:flex justify-between items-center bg-slate-50 p-3 rounded-md">
          <div>
            <h2 className="text-xl">
              Upload your stock xlsx file to get started.
            </h2>
            <div className="text-xs">
              To download supported format.{" "}
              <a
                download={true}
                href="/sample.xlsx"
                className="text-primary font-semibold"
              >
                Click here
              </a>
            </div>
          </div>
          <label
            className="px-3 mt-3 justify-center py-1 bg-primary text-white rounded-md flex gap-2 items-center"
            htmlFor="file-upload"
          >
            {loading ? "Uploading ..." : "Upload"}
            <UploadCloud width={24} height={24} />
          </label>
          <input
            onChange={(ev) => handleUploadFile(ev.currentTarget.files)}
            accept=".xlsx"
            className="hidden"
            id="file-upload"
            type="file"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
