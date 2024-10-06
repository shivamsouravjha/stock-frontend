import Lottie from "lottie-react";
import stockAnimationData from "../animation/stock.json";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import useUpload from "../hooks/useUpload";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import StockCard from "../components/StockCard";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const { loading, handleUploadFile, error, stockDetails, uploadPercentage } =
    useUpload();

  if (stockDetails.length > 0) {
    return (
      <div className="pt-20 container mx-auto flex flex-col h-screen p-2">
        <div className="py-2 bg-white flex items-center px-2 mb-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            className="px-2 outline-none"
            placeholder="Search..."
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
          />
        </div>
        <div className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-grow overflow-auto">
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
              <span className="text-primary font-semibold">Click here</span>
            </div>
          </div>
          <label
            className="px-3 mt-3 justify-center py-1 bg-primary text-white rounded-md flex gap-2 items-center"
            htmlFor="file-upload"
          >
            {loading ? "" + uploadPercentage + "%" : "Upload"}
            <CloudArrowUpIcon width={24} height={24} />
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
