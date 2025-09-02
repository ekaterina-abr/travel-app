import { QueryProvider } from "./api";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Profile } from "./components";
import { theme } from "./theme";
import { GlobalStore } from "./stores";
import { routes } from "./config";

const globalStore = new GlobalStore();

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <ChakraProvider value={theme}>
          <Routes>
            <Route path="/" element={<Home globalStore={globalStore} />} />
            <Route
              path={routes.profile}
              element={<Profile globalStore={globalStore} />}
            />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
