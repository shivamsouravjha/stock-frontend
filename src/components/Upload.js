import { Button, Heading, VStack, HStack, Text, Stack, Spinner } from "@chakra-ui/react";
import React, { useRef } from "react";
import useUpload from "../hooks/useUpload";
import StockCard from "./stockCard"; 
import { track } from "@vercel/analytics"; 
import ReactGA from 'react-ga4';
import { useGoogleLogin } from '@react-oauth/google';


const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;

function Upload() {
  const fileRef = useRef(null);

  const {
    files,
    uploadedFiles,
    stockDetails, 
    setStockDetails, 
    loading,
    handleChangeFiles,
    handleUploadFiles,
  } = useUpload();

  ReactGA.initialize(GA_TRACKING_ID); 

  const handleSelectFiles = () => {
    fileRef.current.click();
    track('file_select', {
      category: 'Upload',
      label: 'User selected XLSX files',
    });
    ReactGA.event({
      category: 'Upload',
      action: 'Select Files',
      label: 'User selected XLSX files',
    });

  };

  const handleUpload = async () => {
    await handleUploadFiles();
    track('file_upload', {
      category: 'Upload',
      label: 'User uploaded XLSX files',
    });
    ReactGA.event({
      category: 'Upload',
      action: 'Upload Files',
      label: 'User uploaded XLSX files',
    });
  };


  const googleLogin = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/gmail.readonly", 
  
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;
      
      try {    
        const response = await fetch('https://stock-backend-hz83.onrender.com/api/fetchGmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({ token: access_token })
        });
        
    
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
    
        let done = false;
        let accumulatedData = '';
    
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          accumulatedData += decoder.decode(value, { stream: true });
        
          const jsonObjects = accumulatedData.split("\n").filter(Boolean);
    
          jsonObjects.forEach((jsonString) => {
            try {
              const stockDetail = JSON.parse(jsonString);
              setStockDetails((prevDetails) => [...prevDetails, stockDetail]); 
    
            } catch (error) {
              console.error("Failed to parse stock data:", error, jsonString); 
            }
          });
    
          accumulatedData = '';
        }    
      } catch (error) {
        console.error("Error sending token to backend or reading stream:", error);
      }
    },    
    onError: (errorResponse) => {
      console.error("Google login error:", errorResponse);
    },
  });
  
  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        accept=".xlsx"
        ref={fileRef}
        onChange={handleChangeFiles}
        multiple
      />
      <VStack spacing={4}>
        <Heading>Upload Your XLSX Files</Heading>
        <Button
          onClick={handleSelectFiles}
          colorScheme="blue"
          size="lg"
        >
          Select XLSX Files
        </Button>
        <Button onClick={() => googleLogin()} colorScheme="red" size="md">
          Login with Google
        </Button>

      </VStack>

      {files && files.length > 0 && (
        <VStack my={4} spacing={2}>
          <Text fontWeight="bold">Selected Files:</Text>
          {files.map((file, index) => (
            <Text key={index}>{file.name}</Text>
          ))}
          <Button
            onClick={handleUpload}
            variant="outline"
            colorScheme="green"
            isLoading={loading}
          >
            Upload
          </Button>
        </VStack>
      )}

      {/* Show a spinner while loading */}
      {loading && <Spinner size="xl" />}

      {/* Render stock details as cards */}
      {stockDetails.length > 0 && (
        <Stack direction="row" flexWrap="wrap" mt={6} spacing={4}>
          {stockDetails.map((stock, index) => (
            <StockCard key={index} stock={stock} />
          ))}
        </Stack>
      )}
    </>
  );
}

export default Upload;
