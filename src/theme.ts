import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    shadow: Shadow;
  }

  interface PaletteOptions {
    shadow?: Shadow;
  }

  interface Shadow {
    shadow: string;
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 990,
      lg: 1440,
      xl: 1920,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#2196F3',
      light: '#2196F30A',
    },
    secondary: {
      main: '#2196F3',
      light: '#0000003B',
      dark: '#000000',
    },
    background: {
      default: '#FFFFFF',
      paper: '#BDBDBD',
    },
    text: {
      primary: '#000000DE',
      secondary: '#00000099',
    },
    info: {
      main: '#2196F3',
      dark: '#1E88E5',
      light: '#0000001F',
      contrastText: '#0000003B',
    },
    error: {
      main: '#D32F2F',
    },
    shadow: {
      shadow: 'inset 0 3px 1px -2px #00000033, 0 2px 2px 0px #00000024, 0 1px 5px 0px #0000001F',
    },
  },
  typography: {
    h1: {
      fontSize: 16,
      lineHeight: 2.8,
      letterSpacing: 0.15,
      fontWeight: 400,
    },
    h2: {
      fontSize: 14,
      lineHeight: 1.4,
      letterSpacing: '0em',
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: 13,
      lineHeight: 1.4,
      letterSpacing: '0em',
      fontWeight: 400,
    },
    button: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1,
      letterSpacing: '0.03em',
    },
  },
});

export default theme;
