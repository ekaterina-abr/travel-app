import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { graphqlClient, QueryProvider } from "./api";
import { Header, Home, Login, Profile, Signup } from "./components";
import { theme } from "./theme";
import { GlobalStore } from "./stores";
import { routes } from "./config";

const globalStore = new GlobalStore();

function App() {
  return (
    <ApolloProvider client={graphqlClient}>
      <QueryProvider>
        <BrowserRouter>
          <ChakraProvider value={theme}>
            <Header globalStore={globalStore} />
            <Routes>
              <Route path="/" element={<Home globalStore={globalStore} />} />
              <Route
                path={routes.profile}
                element={<Profile globalStore={globalStore} />}
              />
              <Route path={routes.signup} element={<Signup />} />
              <Route path={routes.login} element={<Login />} />
            </Routes>
          </ChakraProvider>
        </BrowserRouter>
      </QueryProvider>
    </ApolloProvider>
  );
}

export default App;
