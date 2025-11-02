import React, { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import { setupWebVitals } from "./lib/analytics";
import "./styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});

function AxeInitializer() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      void import("@axe-core/react").then(({ default: axe }) => {
        axe(React, ReactDOM, 1000);
      });
    }
  }, []);

  return null;
}

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(container);

setupWebVitals();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AxeInitializer />
      <App />
      {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  </StrictMode>,
);
