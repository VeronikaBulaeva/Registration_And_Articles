import { ScopedCssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline></ScopedCssBaseline>
    </ThemeProvider>
  );
}

export default App;
