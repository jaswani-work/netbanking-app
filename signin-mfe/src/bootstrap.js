import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from 'sharedState/theme';
import App from './App';

// Only runs when this app is opened standalone.
const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
