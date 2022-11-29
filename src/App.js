import { Box, Button, ChakraProvider, Container } from "@chakra-ui/react";
import Axios from "axios";
import Upload from "./components/Upload";
import SLA from "./components/sla"
import {Routes, Route, useNavigate} from 'react-router-dom';
Axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    // 👇️ navigate to /home
    navigate('/');
  };

  const navigateAgrrement = () => {
    // 👇️ navigate to /agreement
    navigate('/agreement');
  };

  return (
    <ChakraProvider>
      <div>
        <br/>
        &nbsp;
        &nbsp;
        <Button
          onClick={navigateToHome}
          colorScheme="blue"
          size="md"
        >
          Home
        </Button>
        &nbsp;
        &nbsp;
        <Button
          onClick={navigateAgrrement}
          colorScheme="blue"
          size="md"
        >
          Agreement
        </Button>
      </div>
      <br/>
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
            <Route path="/agreement" element={<SLA/>} />
          </Routes>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
