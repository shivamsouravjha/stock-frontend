import React, { useState } from "react";
import Lottie from "lottie-react";
import stockAnimationData from "../animation/stock.json";
import useUpload from "../hooks/useUpload";
import StockCard from "../components/StockCard";
import { DeleteIcon, Search, UploadCloud, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../components/Button";
import { toNumber } from "../utils/common";

const ROWS_PER_PAGE = 25;

const Homepage = () => {
  const [search, setSearch] = useState("");
  const { 
    loading, 
    handleFileSelection, 
    handleUploadFile, 
    error, 
    stockDetails, 
    selectedFile, 
    previewData 
  } = useUpload();
  const [shortBy, setShortBy] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleConfirmUpload = () => {
    handleUploadFile();
    setShowConfirmation(false);
  };

  const totalPages = previewData ? Math.ceil(previewData.rows.length / ROWS_PER_PAGE) : 0;

  const renderPDFPreview = () => {
    if (!previewData) return null;

    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const currentRows = previewData.rows.slice(startIndex, endIndex);

    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-100 border-b">
          <h2 className="text-lg font-semibold">File Preview: {selectedFile.name}</h2>
          <p className="text-sm text-gray-600">Page {currentPage} of {totalPages}</p>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {previewData.headers.map((header, index) => (
                  <th key={index} className="p-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap border border-gray-300">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="p-2 text-sm whitespace-nowrap border border-gray-300">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-100 border-t flex justify-between items-center">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-blue-500 text-white rounded-full disabled:bg-gray-300"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm">Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 bg-blue-500 text-white rounded-full disabled:bg-gray-300"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  if (stockDetails.length > 0) {
    return (
      <div className="pt-20 container mx-auto flex flex-col h-screen p-2">
        <div className="py-2 rounded-md flex justify-between items-center px-3">
          <div className="flex bg-white py-2 border-[0.5px] rounded-md items-center gap-2 px-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              className="px-2 outline-none"
              placeholder="Search..."
              value={search}
              onChange={(ev) => setSearch(ev.target.value)}
            />
          </div>
          <div className="flex gap-3 items-center">
            <select
              onChange={(e) => setShortBy(e.currentTarget.value)}
              className="bg-slate-200 p-2 rounded-md"
              value={shortBy}
            >
              <option value={"none"}>Sort by</option>
              <option value={"rating"}>Rating</option>
              <option value={"market_cap"}>Market Value</option>
              <option value={"quantity"}>Quantity</option>
              <option value={"percentage_of_aum"}>Percentage of AUM</option>
            </select>
            <Button
              onClick={() => {
                setShortBy("none");
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
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="mb-[80px] text-center"></div>
        
        {error && (
          <div className="bg-red-100 text-red-500 p-4 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="w-[300px] h-[300px] mx-auto">
            <Lottie animationData={stockAnimationData} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Upload your Stock XLSX file to get started</h2>
              <p className="text-sm text-gray-600">
                To download a supported format, {" "}
                <a href="/sample.xlsx" download className="text-blue-700 font-semibold hover:underline">
                  Click here
                </a>
              </p>
            </div>
            <label
              className="px-4 py-2 bg-blue-700 text-white rounded-md flex items-center gap-2 cursor-pointer hover:bg-blue-600 transition"
              htmlFor="file-upload"
            >
              {loading ? "Uploading..." : "Select File"}
              <UploadCloud size={20} />
            </label>
            <input
              onChange={(ev) => handleFileSelection(ev.currentTarget.files)}
              accept=".xlsx"
              className="hidden"
              id="file-upload"
              type="file"
            />
          </div>
        </div>
        
        {selectedFile && (
          <div className="mb-8">
            {renderPDFPreview()}
            <button
              onClick={() => setShowConfirmation(true)}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Upload File
            </button>
          </div>
        )}
        
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4">Confirm Upload</h3>
              <p>Are you sure you want to upload this file?</p>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmUpload}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
