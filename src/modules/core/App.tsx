import React, { FC, ReactElement } from 'react';
import Layout from './layouts';
import AppRouter from '../../router';
import AppContextProvider from './AppContextProvider';

const App: FC = () => (
  <AppContextProvider>
    <AppRouter>{(content: ReactElement) => <Layout>{content}</Layout>}</AppRouter>
  </AppContextProvider>
);

export default App;
