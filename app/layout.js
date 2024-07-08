'use client';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import './globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Box from '@mui/material/Box';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/src/redux/store';

import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './theme';
import { AOSInit } from '@/src/components/aosint';

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <Head>
        <Link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AOSInit />
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <AppRouterCacheProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline />
                  <Box>{children}</Box>
                </ThemeProvider>
              </AppRouterCacheProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
