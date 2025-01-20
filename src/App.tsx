import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Profile } from "./components";
import { theme } from "./theme";
import { GlobalStore } from "./stores";

const globalStore = new GlobalStore();

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider value={theme}>
        <Routes>
          <Route path="/" element={<Home globalStore={globalStore} />} />
          <Route
            path="/profile"
            element={<Profile globalStore={globalStore} />}
          />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
