import { ScopedCssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/theme';
import AppRouterProvider from '@/components/router-provider';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '@/components/Header/Header.tsx';
import { persistor, store } from '@/app/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <ScopedCssBaseline>
            <Router>
              <Header />
              <AppRouterProvider />
            </Router>
          </ScopedCssBaseline>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
