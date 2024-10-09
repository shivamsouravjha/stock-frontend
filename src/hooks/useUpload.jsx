import { useState } from "react";
import xlsx from 'node-xlsx';

const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [stockDetails, setStockDetails] = useState([]);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  const handleFileSelection = (files) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      generatePreview(files[0]);
    }
  };

  const generatePreview = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = xlsx.parse(data);
        
        if (workbook && workbook.length > 0) {
          const sheet = workbook[0];
          const headers = sheet.data[0];
          const rows = sheet.data.slice(1);
          setPreviewData({ headers, rows });
        } else {
          setError("Unable to parse the file. Please ensure it's a valid XLSX file.");
        }
      } catch (error) {
        console.error("Error parsing XLSX file:", error);
        setError("Unable to parse the file. Please ensure it's a valid XLSX file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleUploadFile = async () => {
    setError("");
    if (selectedFile) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("files", selectedFile);

        const response = await fetch(
          "https://stock-backend-hz83.onrender.com/api/uploadXlsx",
          {
            method: "POST",
            body: formData,
          }
        );

        setLoading(false);

        if (!response.ok) {
          throw new Error("Failed to upload the file");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let result;

        let jsonBuffer = "";

        while (!(result = await reader.read()).done) {
          jsonBuffer += decoder.decode(result.value, { stream: true });
          const lines = jsonBuffer.split("\n");
          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();
            if (line) {
              try {
                const jsonObject = JSON.parse(line);
                setStockDetails((prev) => [...prev, jsonObject]);
              } catch (e) {
                console.error("Invalid JSON:", line);
              }
            }
          }
          jsonBuffer = lines[lines.length - 1];
        }
      } catch (err) {
        console.error("Error uploading the file:", err);
        setError("The file could not be uploaded. Please try again later");
      }
    }
  };

  return {
    loading,
    stockDetails,
    error,
    handleFileSelection,
    handleUploadFile,
    selectedFile,
    previewData,
  };
};

export default useUpload;