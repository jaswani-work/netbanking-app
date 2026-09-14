import { createTheme } from '@mui/material/styles';

// Shared MUI theme, federated like authStore so every remote renders
// with the same palette/typography.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0b3d63' },
    secondary: { main: '#00897b' },
    background: { default: '#f4f6f8' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: ['"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
});

export default theme;
