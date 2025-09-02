import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IQueryProvider {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

export const QueryProvider = ({ children }: IQueryProvider) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
