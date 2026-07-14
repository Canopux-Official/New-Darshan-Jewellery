import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import muiTheme from './theme/muiTheme';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import './styles/globals.css';

export default function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            {/* Future routes: /about, /collections, /rates, /gallery, /contact */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
