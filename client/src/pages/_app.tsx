// Core
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// Components
import { Navbar } from "@/components/navbar";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-full h-screen">
        <header className="flex-0 ">
          <Navbar />
        </header>
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
