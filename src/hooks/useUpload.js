import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const useUpload = () => {
  const [files, setFiles] = useState([]); // Array of selected files
  const [loading, setLoading] = useState(false); // Loading state
  const [uploadedFiles, setUploadedFiles] = useState([]); // Array of uploaded files
  const [stockDetails, setStockDetails] = useState([]); // Array of stock details (streamed)

  const toast = useToast();

  // Handle selecting multiple XLSX files
  const handleChangeFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) =>
      file.name.endsWith(".xlsx")
    );

    if (validFiles.length > 0) {
      setFiles(validFiles);
    } else {
      toast({
        title: "Invalid file type",
        description: "Only .xlsx files are allowed.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // Handle uploading all selected files and start streaming data
  const handleUploadFiles = async () => {
    if (files.length === 0) return;

    setLoading(true);

    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append("files", file);
      }

      // Start streaming data after uploading the file
      const response = await fetch("https://stock-backend-hz83.onrender.com/api/uploadXlsx", {
        method: "POST",
        body: formData,
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;
      let accumulatedData = ''; // To accumulate partial chunks

      // Reading the stream chunks
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        accumulatedData += decoder.decode(value, { stream: true });

        // Split the accumulated data by newlines to get individual JSON objects
        const jsonObjects = accumulatedData.split("\n").filter(Boolean);

        jsonObjects.forEach((jsonString) => {
          try {
            const stockDetail = JSON.parse(jsonString); // Parse the JSON data
            setStockDetails((prevDetails) => [...prevDetails, stockDetail]); // Add to stock details state
          } catch (error) {
            console.error("Failed to parse stock data:", error, jsonString);
          }
        });

        // Reset the accumulated data after processing
        accumulatedData = '';
      }

      setUploadedFiles(files); // Store the uploaded files
      toast({
        title: "Files Uploaded",
        description: "The XLSX file has been uploaded successfully.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error fetching stock stream:", error);
      toast({
        title: "Error",
        description: "Failed to upload the files.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    files,
    uploadedFiles,
    stockDetails, // Return stock details for rendering
    setStockDetails, // Destructure the set function for stockDetails
    loading,
    handleChangeFiles,
    handleUploadFiles,
  };
};

export default useUpload;
