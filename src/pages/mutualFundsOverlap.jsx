import { useState, useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import Lottie from 'lottie-react'
import stockAnimationData from '../animation/stock.json'
import multipleUpload from '../hooks/multipleUpload'
import { UploadCloud, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react'
import Button from '../components/Button'
import ReactGA from 'react-ga'
import OverlapResult from '../components/OverlapResult'
import * as xlsx from 'xlsx'

const ROWS_PER_PAGE = 25

const CompareMutualFundOverlap = () => {
  const [search, setSearch] = useState('')
  const {
    loading,
    handleFileUpload: handleSingleFileUpload, // Renamed for clarity
    handleUploadFile,
    error,
    stockDetails,
    setStockDetails,
    selectedFile, // Will hold the last selected file for single upload
    file1,
    file2,
    previewData,
    setFile1,
    setFile2
  } = multipleUpload()
  // const [file1, setFile1] = useState(null)
  const [file1PreviewData, setFile1PreviewData] = useState(null)
  // const [file2, setFile2] = useState(null)
  const [file2PreviewData, setFile2PreviewData] = useState(null)
  const [shortBy, setShortBy] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isUploading, setIsUploading] = useState(false)
  const [showSamplePreview, setShowSamplePreview] = useState(false)
  const [samplePreviewData, setSamplePreviewData] = useState(null)
  const [showFile1Preview, setShowFile1Preview] = useState(false)
  const [showFile2Preview, setShowFile2Preview] = useState(false)
  const [isGridView, setIsGridView] = useState(true)
  const [canSend, setCanSend] = useState(false)

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/homepage' })
    // Update canSend whenever both files are selected
    setCanSend(file1 !== null && file2 !== null)
  }, [file1, file2])


  const handleFile1Selection = async (files) => {
    if (files && files[0]) {
      const selected = files[0]
      setFile1(selected)
      const reader = new FileReader()
      reader.onload = (e) => {
        const workbook = xlsx.read(e.target.result, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 })
        const headers = jsonData[0]
        const rows = jsonData.slice(1)
        setFile1PreviewData({ headers, rows })
        // setShowFile1Preview(true); // Removed automatic preview
      }
      reader.readAsBinaryString(selected)
    } else {
      setFile1(null)
      setFile1PreviewData(null)
    }
  }

  const handleFile2Selection = async (files) => {
    if (files && files[0]) {
      const selected = files[0]
      setFile2(selected)
      const reader = new FileReader()
      reader.onload = (e) => {
        const workbook = xlsx.read(e.target.result, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 })
        const headers = jsonData[0]
        const rows = jsonData.slice(1)
        setFile2PreviewData({ headers, rows })
        // setShowFile2Preview(true); // Removed automatic preview
      }
      reader.readAsBinaryString(selected)
    } else {
      setFile2(null)
      setFile2PreviewData(null)
    }
  }

  const handlePreview1Click = () => {
    setShowFile1Preview(true)
  }

  const handlePreview2Click = () => {
    setShowFile2Preview(true)
  }

  const loadSampleFile = async () => {
    try {
      const response = await fetch('/sample.xlsx')
      const arrayBuffer = await response.arrayBuffer()
      const data = new Uint8Array(arrayBuffer)
      const workbook = xlsx.read(data, { type: 'array' })

      if (workbook && workbook.SheetNames.length > 0) {
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 })
        const headers = jsonData[0]
        const rows = jsonData.slice(1)
        setSamplePreviewData({ headers, rows })
        setShowSamplePreview(true)
      } else {
        console.error('Unable to parse the sample file.')
      }
    } catch (error) {
      console.error('Error loading sample file:', error)
    }
  }


  const totalPages = (data) =>
    data ? Math.ceil(data.rows.length / ROWS_PER_PAGE) : 0

  const renderFilePreview = (data, fileName, onClose) => {
    if (!data) return null

    const startIndex = (currentPage - 1) * ROWS_PER_PAGE
    const endIndex = startIndex + ROWS_PER_PAGE
    const currentRows = data.rows.slice(startIndex, endIndex)

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8 max-w-3xl w-full">
          <div className="p-4 bg-gray-100 border-b flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">File Preview: {fileName}</h2>
              <p className="text-sm text-gray-600">
                Page {currentPage} of {totalPages(data)}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={onClose}
                title="Close Preview"
                className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded-md cursor-pointer flex items-center"
              >
                Close Preview
                <X className="ml-2" size={16} />
              </Button>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  {data.headers.map((header, index) => (
                    <th
                      key={index}
                      className="p-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap border border-gray-300"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="p-2 text-sm whitespace-nowrap border border-gray-300"
                      >
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
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-blue-500 text-white rounded-full disabled:bg-gray-300"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages(data)}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages(data)))
              }
              disabled={currentPage === totalPages(data)}
              className="p-2 bg-blue-500 text-white rounded-full disabled:bg-gray-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  }
  if (stockDetails.length > 0) {
    return <OverlapResult {...{ search, setSearch, shortBy, setShortBy, isGridView, setIsGridView, stockDetailsData:stockDetails }} />
  }

  return (
    <div
      className="w-full min-h-[50%] p-6"
      style={{ backgroundColor: 'rgba(15, 134, 115, 0.4)' }}
    >
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
          <div className="flex flex-col gap-6">
            {/* File 1 Upload */}
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Upload your First Stock XLSX file
              </h2>
              <div className="flex items-center justify-between">
                <label
                  className="px-3 py-1 bg-primaryColor text-white rounded-md flex gap-2 items-center cursor-pointer"
                  htmlFor="file-upload-1"
                >
                  {file1 ? file1.name : 'Upload File 1'}
                  <UploadCloud width={20} height={20} />
                </label>
                <input
                  onChange={(ev) => handleFile1Selection(ev.currentTarget.files)}
                  accept=".xlsx"
                  className="hidden"
                  id="file-upload-1"
                  type="file"
                />
                {file1PreviewData && (
                  <Button
                    onClick={handlePreview1Click}
                    title="Preview File 1"
                    className="bg-gray-300 text-black px-3 py-1 rounded-md cursor-pointer flex items-center"
                  >
                    <Eye className="mr-2" size={16} /> Preview
                  </Button>
                )}
              </div>
            </div>

            {/* File 2 Upload */}
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Upload your Second Stock XLSX file
              </h2>
              <div className="flex items-center justify-between">
                <label
                  className="px-3 py-1 bg-primaryColor text-white rounded-md flex gap-2 items-center cursor-pointer"
                  htmlFor="file-upload-2"
                >
                  {file2 ? file2.name : 'Upload File 2'}
                  <UploadCloud width={20} height={20} />
                </label>
                <input
                  onChange={(ev) => handleFile2Selection(ev.currentTarget.files)}
                  accept=".xlsx"
                  className="hidden"
                  id="file-upload-2"
                  type="file"
                />
                {file2PreviewData && (
                  <Button
                    onClick={handlePreview2Click}
                    title="Preview File 2"
                    className="bg-gray-300 text-black px-3 py-1 rounded-md cursor-pointer flex items-center"
                  >
                    <Eye className="mr-2" size={16} /> Preview
                  </Button>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <Button
                onClick={handleUploadFile}
                title={isUploading ? 'Sending Files...' : 'Send Files'}
                className={`px-4 py-2 text-white rounded-md flex gap-2 items-center ${
                  canSend && !isUploading
                    ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!canSend || isUploading}
              >
                {isUploading ? 'Sending Files...' : 'Send Files'}
                {!isUploading && <UploadCloud className="ml-2" size={16} />}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                To view a supported format,{' '}
                <button
                  onClick={loadSampleFile}
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Click here
                </button>
              </p>
            </div>
          </div>
        </div>

        {showFile1Preview &&
          renderFilePreview(file1PreviewData, file1.name, () =>
            setShowFile1Preview(false)
          )}
        {showFile2Preview &&
          renderFilePreview(file2PreviewData, file2.name, () =>
            setShowFile2Preview(false)
          )}
        {showSamplePreview &&
          renderFilePreview(samplePreviewData, 'sample.xlsx', () =>
            setShowSamplePreview(false)
          )}
      </div>
    </div>
  )
}

export default CompareMutualFundOverlap