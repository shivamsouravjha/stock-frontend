import { Box, Button, ChakraProvider, Container } from "@chakra-ui/react";
import Axios from "axios";
import Upload from "./components/Upload";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";

Axios.defaults.baseURL = "https://stock-backend-hz83.onrender.com/";

function App() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    // 👇️ navigate to /home
    Analytics.track('navigate-home');
    navigate('/');
  };

  const navigateAgreement = () => {
    // 👇️ navigate to /agreement
    Analytics.track('navigate-agreement');
    navigate('/agreement');
  };

  return (
    <ChakraProvider>
      <div>
        <br />
        &nbsp;&nbsp;
        <Button onClick={navigateToHome} colorScheme="blue" size="md">
          Home
        </Button>
        &nbsp;&nbsp;
        <Button onClick={navigateAgreement} colorScheme="blue" size="md">
          Agreement
        </Button>
      </div>
      <br />
      <Box
        minH="100vh"
        w="100%"
        bg="gray.200"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxWidth="container.xl">
          <Routes>
            <Route path="/" element={<Upload />} />
          </Routes>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
