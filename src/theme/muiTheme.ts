import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    background: {
      default: '#F8F6F2',
      paper: '#EFEAE3',
    },
    primary: {
      main: '#C7A15A',
      dark: '#8B7355',
      contrastText: '#F8F6F2',
    },
    text: {
      primary: '#2E2E2E',
      secondary: '#6E6A64',
    },
    divider: '#DDD7CF',
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h1: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 },
    h2: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 },
    h3: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 },
    h4: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 },
    h5: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 },
    h6: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 },
  },
  spacing: 8,
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F8F6F2',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          textTransform: 'none',
          letterSpacing: '0.15em',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
  },
});

export default muiTheme;
