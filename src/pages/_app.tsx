import { Navbar } from "@/components/navbar/navbar";
import { theme } from "@/theme/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
