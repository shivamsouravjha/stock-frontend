import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import Axios from "axios";
import Upload from "./components/Upload";

Axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <ChakraProvider>
      <Box
        minH="100vh"
        w="100%"
        bg="gray.200"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxWidth="container.xl">
          <Upload />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
