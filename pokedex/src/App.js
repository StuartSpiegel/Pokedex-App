// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';
import PokemonDetail from './PokemonDetail';
import SearchApp from './SearchApp';
import Home from './Home';
import ErrorBoundary from './components/ErrorBoundary';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ComparisonProvider } from './contexts/ComparisonContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ComparisonProvider>
          <FavoritesProvider>
            <ErrorBoundary>
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<SearchApp />} />
                  <Route path="/pokemon/:id" element={<PokemonDetail />} />
                </Routes>
              </Router>
            </ErrorBoundary>
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
          </FavoritesProvider>
        </ComparisonProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
