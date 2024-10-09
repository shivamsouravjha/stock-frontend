import { useState } from "react";

const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [stockDetails, setStockDetails] = useState([]);
  const [error, setError] = useState("");

  /**
   * Handles the file upload
   * @param {Array<File>} files - The files to be uploaded
   */
  const handleUploadFile = async (files) => {
    setError("");
    console.log(files);
    if (files.length > 0) {
      setLoading(true);
      try {
        const formData = new FormData();

        for (const file of files) {
          formData.append("files", file);
        }

        // let's do it with fetch
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
                try {
                  setStockDetails((prev) => [...prev, jsonObject]);
                } catch (error) {
                  console.error(error);
                  console.error("Invalid JSON:", line);
                }
              } catch (e) {
                console.error(e);
                console.error("Invalid JSON:", line);
              }
            }
          }
          jsonBuffer = lines[lines.length - 1];
        }
      } catch (err) {
        console.error("Error uploading the file");
        console.error(err);
        setError("The file could not be uploaded. Please try again later");
      }
    }
  };

  return {
    loading,
    stockDetails,
    error,
    handleUploadFile,
    stockDetails,
    setStockDetails,
  };
};

export default useUpload;
