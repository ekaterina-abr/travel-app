import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components";
import { theme } from "./config";
import { GlobalStore } from "./stores";

const globalStore = new GlobalStore();

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider value={theme}>
        <Routes>
          <Route path="/" element={<Home globalStore={globalStore} />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
