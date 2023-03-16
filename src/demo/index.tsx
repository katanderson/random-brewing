import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import ReactDOM from 'react-dom/client';

import App from './app';

const theme = extendTheme({
  fontFamily: {
    body: 'Inter, sans-serif',
    display: 'Inter, sans-serif',
  },
  colorSchemes: {
    light: {
      palette: {
        neutral: {
          50: '#eceff1',
          100: '#cfd8dc',
          200: '#b0bec5',
          300: '#90a4ae',
          400: '#78909c',
          500: '#607d8b',
          600: '#546e7a',
          700: '#455a64',
          800: '#37474f',
          900: '#263238',
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <App />
  </CssVarsProvider>,
);
