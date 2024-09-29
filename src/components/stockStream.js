import React, { useEffect, useState } from "react";
import { VStack, Spinner, Text } from "@chakra-ui/react";
import StockCard from "./stockCard"; // Import StockCard component

const StockDataStream = () => {
  const [stockDetails, setStockDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockStream = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/stockStream");

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let done = false;
        let receivedChunks = [];

        // Process each chunk as it arrives
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          const chunk = decoder.decode(value, { stream: true });
          receivedChunks.push(chunk);

          // Split the chunk by newline to process multiple stocks
          const lines = chunk.split("\n").filter(Boolean);
          lines.forEach((line) => {
            try {
              // Parse each line as JSON and add to stockDetails
              const stockDetail = JSON.parse(line.split(": ")[1]); // Extract JSON part
              setStockDetails((prevDetails) => [...prevDetails, stockDetail]);
            } catch (error) {
              console.error("Failed to parse stock data:", error);
            }
          });
        }

        setLoading(false); // Streaming complete
      } catch (error) {
        console.error("Error fetching stock stream:", error);
        setLoading(false);
      }
    };

    fetchStockStream();
  }, []);

  if (loading && stockDetails.length === 0) {
    return (
      <VStack>
        <Spinner size="xl" />
        <Text>Loading stock data...</Text>
      </VStack>
    );
  }

  return (
    <VStack spacing={4}>
      {stockDetails.length === 0 && !loading ? (
        <Text>No stock data available</Text>
      ) : (
        stockDetails.map((stock, index) => (
          <StockCard key={index} stock={stock} />
        ))
      )}
    </VStack>
  );
};

export default StockDataStream;
