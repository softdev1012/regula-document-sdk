import React from 'react'
import './App.css'
import {
  QueryClient,
  QueryErrorResetBoundary,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import FirstPage from './pages/FirstPage';
import { ThemeProvider } from 'styled-components';
import { createTheme, PaletteMode} from '@mui/material';

function App() {
  const queryClient = new QueryClient();
  const mode:PaletteMode = 'light';
  const defaultTheme = createTheme({ palette: {mode} });
  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <QueryClientProvider client={queryClient}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary }) => (
                  <div>
                    There was an error!
                    <button
                      onClick={() => {
                        resetErrorBoundary();
                      }}
                    >
                      Try again
                    </button>
                  </div>
                )}
              >
                <div className='container'>
                  <FirstPage />
                </div>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </QueryClientProvider>
      </ThemeProvider>
      
    </React.Fragment>
  )
}

export default App
