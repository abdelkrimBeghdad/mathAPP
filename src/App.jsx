import React from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Router from './components/Router';

function App() {
  return (
    <AppProvider>
      <Layout>
        <Router />
      </Layout>
    </AppProvider>
  );
}

export default App;