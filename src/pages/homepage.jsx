import React, { useState, useEffect } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import Lottie from "lottie-react";
import stockAnimationData from "../animation/stock.json";
import useUpload from "../hooks/useUpload";
import { DeleteIcon, Search, UploadCloud, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../components/Button";
import ReactGA from "react-ga";
import Result from '../components/Result';

const ROWS_PER_PAGE = 25;

const Homepage = () => {
  const [search, setSearch] = useState("");
  const {
    loading,
    handleFileSelection,
    handleUploadFile,
    error,
    stockDetails,
    setStockDetails,
    selectedFile,
    previewData
  } = useUpload();
  const [shortBy, setShortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/homepage' });
  }, []);

  const googleLogin = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;

      try {
        const response = await fetch(
          'https://stock-backend-hz83.onrender.com/api/fetchGmail',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ token: access_token }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        let done = false;
        let accumulatedData = '';

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          accumulatedData += decoder.decode(value, { stream: true });

          const jsonObjects = accumulatedData.split('\n').filter(Boolean);

          jsonObjects.forEach((jsonString) => {
            try {
              const stockDetail = JSON.parse(jsonString);
              setStockDetails((prevDetails) => [...prevDetails, stockDetail]);
              ReactGA.event({
                category: 'Stock',
                action: 'Added stock detail',
                label: stockDetail.ISIN,
              });
            } catch (error) {
              console.error('Failed to parse stock data:', error, jsonString);
            }
          });

          accumulatedData = '';
        }
      } catch (error) {
        console.error(
          'Error sending token to backend or reading stream:',
          error
        );
      }
    },
    onError: () => console.log('Login Failed'),
  });

  const handleConfirmUpload = async () => {
    setIsUploading(true);
    await handleUploadFile();
    setIsUploading(false);
    setShowConfirmation(false);
  };

  const totalPages = previewData ? Math.ceil(previewData.rows.length / ROWS_PER_PAGE) : 0;

  const renderPDFPreview = () => {
    if (!previewData) return null;

    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const currentRows = previewData.rows.slice(startIndex, endIndex);

    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8">
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
      <Result
        search={search}
        setSearch={setSearch}
        shortBy={shortBy}
        setShortBy={setShortBy}
        stockDetails={stockDetails}
      />
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
          <div className="flex justify-around ">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h2 className="text-xl font-semibold mb-2">Upload your Stock XLSX file to get started</h2>
                <p className="text-sm text-gray-600">
                  To download a supported format, {" "}
                  <a href="/sample.xlsx" download className="text-blue-700 font-semibold hover:underline">
                    Click here
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <label
                className="px-3 mt-3 justify-center py-1 bg-primary text-white rounded-md flex gap-2 items-center cursor-pointer"
                htmlFor="file-upload"
              >
                {loading ? "Uploading ..." : "Upload"}
                <UploadCloud width={24} height={24} />
              </label>
              <input
                onChange={(ev) => handleFileSelection(ev.currentTarget.files)}
                accept=".xlsx"
                className="hidden"
                id="file-upload"
                type="file"
              />
              <button
                className="px-3 py-1 bg-red-500 text-white rounded-md flex gap-2 items-center cursor-pointer"
                onClick={googleLogin}
              >
                Sign with Google
              </button>
            </div>
          </div>
        </div>

        {renderPDFPreview()}

        {selectedFile && (
          <div className="mt-4 flex justify-center">
            <Button
            className="px-3 mt-3 justify-center py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex gap-2 items-center cursor-pointer"
              onClick={() => setShowConfirmation(true)}
              title="Upload File"
            />
          </div>
        )}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Upload</h3>
            <p>Are you sure you want to upload this file?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                onClick={() => setShowConfirmation(false)}
                title="Cancel"
                className="bg-gray-300 text-black px-3 py-1 rounded-md cursor-pointer"
              />
              <Button
                onClick={handleConfirmUpload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md cursor-pointer"
                title={isUploading ? "Uploading..." : "Confirm"}
                disabled={isUploading}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;