import { Button, Heading, VStack, HStack, Text, Stack, Spinner } from "@chakra-ui/react";
import React, { useRef } from "react";
import useUpload from "../hooks/useUpload";
import StockCard from "./stockCard"; // Import StockCard component

function Upload() {
  const fileRef = useRef(null);

  const {
    files,
    uploadedFiles,
    stockDetails, // Get streamed stockDetails
    loading,
    handleChangeFiles,
    handleUploadFiles,
  } = useUpload();

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
          onClick={() => fileRef.current.click()}
          colorScheme="blue"
          size="lg"
        >
          Select XLSX Files
        </Button>
      </VStack>

      {/* Show selected XLSX files and upload button */}
      {files && files.length > 0 && (
        <VStack my={4} spacing={2}>
          <Text fontWeight="bold">Selected Files:</Text>
          {files.map((file, index) => (
            <Text key={index}>{file.name}</Text>
          ))}
          <Button
            onClick={handleUploadFiles}
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
