import { useState } from 'react'
import * as xlsx from 'xlsx'

const useUpload = () => {
  const [loading, setLoading] = useState(false)
  const [stockDetails, setStockDetails] = useState([])
  const [error, setError] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewData, setPreviewData] = useState(null)

  const handleFileSelection = (files) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0])
      generatePreview(files[0])
    }
  }

  const generatePreview = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = xlsx.read(data, { type: 'array' })

        if (workbook && workbook.SheetNames.length > 0) {
          const sheet = workbook.Sheets[workbook.SheetNames[0]]
          const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 })
          const headers = jsonData[0]
          const rows = jsonData.slice(1)
          setPreviewData({ headers, rows })
        } else {
          setError(
            "Unable to parse the file. Please ensure it's a valid XLSX file."
          )
        }
      } catch (error) {
        console.error('Error parsing XLSX file:', error)
        setError(
          "Unable to parse the file. Please ensure it's a valid XLSX file."
        )
      }
    }
    reader.readAsArrayBuffer(file)
  }

  const handleUploadFile = async () => {
    setError('')
    if (selectedFile) {
      setLoading(true)
      try {
        const formData = new FormData()
        formData.append('files', selectedFile)

        const response = await fetch(
          'https://stock-backend-hz83.onrender.com/api/uploadXlsx',
          {
            method: 'POST',
            body: formData,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to upload the file')
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let jsonBuffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          jsonBuffer += decoder.decode(value, { stream: true })
          const lines = jsonBuffer.split('\n')

          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim()
            if (line) {
              try {
                const jsonObject = JSON.parse(line)
                setStockDetails((prev) => [...prev, jsonObject])
              } catch {
                console.error('Invalid JSON:', line)
              }
            }
          }
          jsonBuffer = lines[lines.length - 1]
        }

        setLoading(false)
      } catch (err) {
        console.error('Error uploading the file:', err)
        setError('The file could not be uploaded. Please try again later')
        setLoading(false)
      }
    }
  }

  return {
    loading,
    stockDetails,
    error,
    handleFileSelection,
    handleUploadFile,
    selectedFile,
    previewData,
    setStockDetails,
  }
}

export default useUpload
