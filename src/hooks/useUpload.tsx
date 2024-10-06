import axios from "axios";
import { useEffect, useState } from "react";

const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
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

        const response = await axios.post(
          "https://stock-backend-hz83.onrender.com/api/uploadXlsx",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentage = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 1),
              );
              setUploadPercentage(percentage);
            },
          },
        );

        const response_data = response.data;

        if (response_data) {
          try {
            const lines = response_data.split("\n");

            for (let i = 0; i < lines.length; i++) {
              try {
                const lineJSON = JSON.parse(lines[i]);
                setStockDetails((prev) => {
                  return [...prev, lineJSON];
                });
              } catch (err) {
                console.error("Error parsing the line");
                console.error(err);
              }
            }
          } catch (err) {
            console.error("Error parsing the response data");
            console.error(err);
            setError(
              "There was some issue in the response. Please try again later",
            );
          }
        } else {
          console.error("Got no response from the server");
          setError(
            "There was no response from the backend server. Please try again later",
          );
        }
      } catch (err) {
        console.error("Error uploading the file");
        console.error(err);
        setError("The file could not be uploaded. Please try again later");
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    uploadPercentage,
    stockDetails,
    error,
    handleUploadFile,
  };
};

export default useUpload;
