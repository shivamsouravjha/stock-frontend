import React from "react";
import { Box, Text, Heading, Link } from "@chakra-ui/react";

// Define color mapping for market cap categories
const getMarketCapColor = (marketCap) => {
  switch (marketCap) {
    case "Small Cap":
      return "purple.400"; // Purple for Small Cap (High Risk, High Reward)
    case "Mid Cap":
      return "orange.400"; // Orange for Mid Cap (Medium Risk, Medium Reward)
    case "Large Cap":
      return "green.400"; // Green for Large Cap (Stable and Smooth)
    default:
      return "gray.200"; // Default color if no category matches
  }
};

const StockCard = ({ stock }) => {
  const bgColor = getMarketCapColor(stock.marketCap); // Determine background color

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      width="300px"
      margin="10px"
      bg={bgColor} // Apply background color
      color="white" // Ensure text is readable on colored background
    >
      <Link href={stock.url} isExternal _hover={{ textDecoration: "underline" }}>
        <Heading fontSize="xl">{stock["Name of the Instrument"]}</Heading>
      </Link>
      <Text mt={4}>
        <strong>ISIN:</strong> {stock.ISIN}
      </Text>
      <Text>
        <strong>Industry/Rating:</strong> {stock["Industry/Rating"]}
      </Text>
      <Text>
        <strong>Market/Fair Value:</strong> ₹{stock["Market/Fair Value"]}
      </Text>
      <Text>
        <strong>Percentage of AUM:</strong> {stock["Percentage of AUM"]}
      </Text>
      <Text>
        <strong>Quantity:</strong> {stock.Quantity}
      </Text>
      <Text>
        <strong>Market Cap:</strong> {stock.marketCap}
      </Text>
      <Text>
        <strong>Market Cap Value:</strong> ₹{stock.marketCapValue}
      </Text>
      <Text>
        <strong>Rating:</strong> {stock.stockRate}
      </Text>
      <Text>
        <strong>FScore:</strong> {stock.fScore}
      </Text>
    </Box>
  );
};

export default StockCard;
