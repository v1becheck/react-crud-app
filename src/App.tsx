import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import DetailsPage from './pages/DetailsPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#9d6556',
    },
    background: {
      default: '#d2c0b2',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/create' element={<CreatePage />} />
            <Route path='/details/:id' element={<DetailsPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
