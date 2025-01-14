import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components";
import { theme } from "./config";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider value={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
